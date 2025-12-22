import mongoose, { Schema, Types } from "mongoose";
import { USER_MODEL_NAME } from "./user.model";
import { QUESTION_MODEL_NAME } from "./question.model";
import { MATERIAL_MODEL_NAME } from "./material.model";

export const SESSION_MODEL_NAME = "Session";

export enum SESSION_STATUS {
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

interface QuestionHistory {
  question: Types.ObjectId;
  optionLabel: string;
  optionValue: string;
}

interface Session {
  user: Types.ObjectId;
  answers: Types.ObjectId[]; 
  currentQuestion: Types.ObjectId | null;
  result: Types.ObjectId | null;
  status: SESSION_STATUS;
  questionHistory: QuestionHistory[];
}

const SessionSchema = new Schema<Session>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: true,
    },
    answers: [
      {
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
    currentQuestion: {
      type: Schema.Types.ObjectId,
      ref: QUESTION_MODEL_NAME,
      default: null,
    },
    result: {
      type: Schema.Types.ObjectId,
      ref: MATERIAL_MODEL_NAME,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(SESSION_STATUS),
      default: SESSION_STATUS.IN_PROGRESS,
    },
    questionHistory: [
      {
        question: { type: Schema.Types.ObjectId, ref: QUESTION_MODEL_NAME },
        optionLabel: String,
        optionValue: String,
      },
    ],
  },
  { timestamps: true }
);

const SessionModel = mongoose.model(SESSION_MODEL_NAME, SessionSchema);
export default SessionModel;
