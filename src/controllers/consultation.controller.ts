import { Response } from "express";
import expertService from "../services/expert.service";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import response from "../utils/response";

export default {
  async start(req: IReqUser, res: Response) {
    try {
          if (!req.user?.id) {
          throw new Error("User not authenticated");
          }
      const result = await expertService.startSession(req.user.id.toString());
      response.success(res, result, "session started");
    } catch (error) {
      response.error(res, error, "failed to start session");
    }
  },

  async answer(req: IReqUser, res: Response) {
    try {
      const { sessionId, optionValue } = req.body;

      const result = await expertService.answerQuestion(sessionId, optionValue);
      response.success(res, result, "answer processed");
    } catch (error) {
      response.error(res, error, "failed to answer question");
    }
  },

async detail(req: IReqUser, res: Response) {
  try {
    const SessionModel = (await import("../models/session.model")).default;
    const PlatformModel = (await import("../models/platform.model")).default;
    const MaterialModel = (await import("../models/material.model")).default;
    const QuestionModel = (await import("../models/question.model")).default;

    // Ambil session
    const session = await SessionModel.findOne({
      _id: req.params.id,
      user: req.user?.id,
    }).lean();

    if (!session) throw new Error("Session not found");

    // ambil currentQuestion detail kalo ada
    let currentQuestionDetail: any = null;
    if (session.currentQuestion) {
      currentQuestionDetail = await QuestionModel.findById(
        session.currentQuestion
      )
        .populate("options.specification")
        .populate("options.nextQuestion")
        .lean();
    }

    // ambil material result kalo ada
    let materialDetail: any = null;
    if (session.result) {
      // session.result
      const materialId =
        typeof session.result === "string" ? session.result : session.result._id;
      if (materialId) {
        materialDetail = await MaterialModel.findById(materialId).lean();
      }
    }

    // ngambil platform by material kalo ada
    let platforms: any[] = [];
    if (materialDetail && materialDetail._id) {
      platforms = await PlatformModel.find({
        materials: materialDetail._id,
      }).lean();
    }

    // ambil session sebelumnya buat history user
    let populatedQuestionHistory: any[] = [];
    if (Array.isArray(session.questionHistory) && session.questionHistory.length) {
      const ids = session.questionHistory
        .map((h: any) => (h.question ? (typeof h.question === "string" ? h.question : h.question._id) : null))
        .filter(Boolean);

      const questionsMap: Record<string, any> = {};
      if (ids.length) {
        const questions = await QuestionModel.find({ _id: { $in: ids } })
          .lean()
          .select("_id code questionText options");
        questions.forEach((q: any) => {
          questionsMap[String(q._id)] = q;
        });
      }

      populatedQuestionHistory = session.questionHistory.map((h: any) => ({
        question: h.question ? questionsMap[String(h.question)] ?? h.question : null,
        optionLabel: h.optionLabel,
        optionValue: h.optionValue,
      }));
    }

    // ambik payload buat fe
    const payload = {
      ...session,
      currentQuestion: currentQuestionDetail,
      result: materialDetail ?? null,
      platforms,
      questionHistory: populatedQuestionHistory,
    };

    response.success(res, payload, "session detail");
  } catch (error) {
    response.error(res, error, "failed get session detail");
  }
},

  async history(req: IReqUser, res: Response) {
  try {
    const { page = 1, limit = 10 } = req.query as unknown as IPaginationQuery;

    const SessionModel = (await import("../models/session.model")).default;

    const result = await SessionModel.find({
      user: req.user?.id,
    })
      .populate("result")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const count = await SessionModel.countDocuments({
      user: req.user?.id,
    });

    response.pagination(
      res,
      result,
      {
        total: count,
        totalPages: Math.ceil(count / Number(limit)),
        current: Number(page),
      },
      "consultation history"
    );
  } catch (error) {
    response.error(res, error, "failed get history");
  }}
};
