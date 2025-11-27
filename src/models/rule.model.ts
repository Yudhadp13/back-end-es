import mongoose, { Schema } from "mongoose";
import * as Yup from "yup";
import { MATERIAL_MODEL_NAME } from "./material.model";
import { SPECIFICATION_MODEL_NAME } from "./specification.model";

export const RULE_MODEL_NAME = "Rule";

export const ruleDTO = Yup.object({
  name: Yup.string().required(),
  conditions: Yup.array().of(Yup.string().required()).min(1).required(),
  result: Yup.string().required(),
});

export type TypeRule = Yup.InferType<typeof ruleDTO>;

interface Rule extends Omit<TypeRule, "conditions" | "result"> {
  conditions: Schema.Types.ObjectId[];
  result: Schema.Types.ObjectId;
}

const RuleSchema = new Schema<Rule>({
  name: { type: Schema.Types.String, required: true },
  conditions: [{
    type: Schema.Types.ObjectId,
    ref: SPECIFICATION_MODEL_NAME,
    required: true,
  }],
  result: {
    type: Schema.Types.ObjectId,
    ref: MATERIAL_MODEL_NAME,
    required: true,
  },
}, { timestamps: true });

const RuleModel = mongoose.model(RULE_MODEL_NAME, RuleSchema);
export default RuleModel;
