import mongoose, { Schema } from "mongoose";
import * as Yup from "yup";
import { SPECIFICATION_MODEL_NAME } from "./specification.model";

export const QUESTION_MODEL_NAME = "Question";

export const questionDTO = Yup.object({
  code: Yup.string().required(),
  questionText: Yup.string().required(),
  options: Yup.array().of(
    Yup.object({
      label: Yup.string().required(),
      value: Yup.string().required(),
      specification: Yup.string().required(),
      nextQuestion: Yup.string().nullable(),
    })
  ).min(1).required(),
  isFirst: Yup.boolean().default(false),
});

export type TypeQuestion = Yup.InferType<typeof questionDTO>;

interface QuestionOption {
  label: string;
  value: string;
  specification: Schema.Types.ObjectId;
  nextQuestion?: Schema.Types.ObjectId | null;
}

interface Question {
  code: string;
  questionText: string;
  options: QuestionOption[];
  isFirst: boolean;
}

const QuestionSchema = new Schema<Question>(
  {
    code: {
      type: Schema.Types.String,
      required: true,
    },
    questionText: {
      type: Schema.Types.String,
      required: true,
    },
    options: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
        specification: {
          type: Schema.Types.ObjectId,
          ref: SPECIFICATION_MODEL_NAME,
          required: true,
        },
        nextQuestion: {
          type: Schema.Types.ObjectId,
          ref: QUESTION_MODEL_NAME,
          default: null,
        },
      },
    ],
      isFirst: {
          type: Boolean,
          default: false
  }
  },
  {
    timestamps: true,
  }
);

const QuestionModel = mongoose.model(QUESTION_MODEL_NAME, QuestionSchema);
export default QuestionModel;
    