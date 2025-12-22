import { Types } from "mongoose";
import SessionModel, { SESSION_STATUS } from "../models/session.model";
import QuestionModel from "../models/question.model";
import RuleModel from "../models/rule.model";
import MaterialModel from "../models/material.model";
import PlatformModel from "../models/platform.model";

export default {
  async startSession(userId: string) {
    const firstQuestion = await QuestionModel.findOne({ isFirst: true });

    if (!firstQuestion) throw new Error("No question found");

    const session = await SessionModel.create({
      user: userId,
      answers: [],
      currentQuestion: firstQuestion._id,
      status: SESSION_STATUS.IN_PROGRESS,
      questionHistory: [],
    });

    return {
      sessionId: session._id,
      question: firstQuestion,
    };
  },

  async answerQuestion(sessionId: string, optionValue: string) {
    const session = await SessionModel.findById(sessionId);
    if (!session) throw new Error("Session not found");

    if (session.status === SESSION_STATUS.FINISHED) {
      throw new Error("Session already finished");
    }

    const question = await QuestionModel.findById(session.currentQuestion);
    if (!question) throw new Error("Question not found");

    const selected = question.options.find((opt) => opt.value === optionValue);
    if (!selected) throw new Error("Option not found");

    // simpan spesifikasi sebagai fakta
    if (selected.specification) {
      const specId = selected.specification.toString();
      const exists = session.answers.some(a => a.toString() === specId);
      if (!exists) {
        session.answers.push(specId as any);
      }
    }

    // simpan history jawaban
    session.questionHistory.push({
      question: question._id,
      optionLabel: selected.label,
      optionValue: selected.value,
    });

    // eval rule dengan forward chaining
    const rules = await RuleModel.find();

    let matchedRule = null;

    for (const rule of rules) {
      const ruleConditions = rule.conditions.map(c => c.toString());
      const sessionFacts = session.answers.map(a => a.toString());

      const isMatch = ruleConditions.every(cond => sessionFacts.includes(cond));
      if (isMatch) {
        matchedRule = rule;
        break;
      }
    }

    // kondisi kalo ada rule yang terpenuhi
    if (matchedRule) {
      const material = await MaterialModel.findById(matchedRule.result);
      const platforms = await PlatformModel.find({ materials: material?._id });

      session.result = material?._id ?? null;
      session.status = SESSION_STATUS.FINISHED;
      await session.save();

      return {
        finished: true,
        material,
        platforms,
      };
    }

    // kalo masih ada pertanyaan lanjutan
    if (selected.nextQuestion) {
      session.currentQuestion = selected.nextQuestion as any;
      await session.save();

      const next = await QuestionModel.findById(selected.nextQuestion);

      return {
        finished: false,
        question: next,
      };
    }

    // semisal gaada pertanyaan lagi dan rule blm ada yang match
    session.status = SESSION_STATUS.FINISHED;
    await session.save();

    return {
      finished: true,
      material: null,
      platforms: [],
    };
  },
};
