import mongoose, { Schema } from "mongoose";
import * as Yup from "yup";
import { MATERIAL_MODEL_NAME } from "./material.model";

export const PLATFORM_MODEL_NAME = "Platform";

export const platformDTO = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  url: Yup.string().url().required(),
  materials: Yup.string().required(),
});

export type TypePlatform = Yup.InferType<typeof platformDTO>;

interface Platform extends Omit<TypePlatform, "materials"> {
  materials: Schema.Types.ObjectId;
}

const PlatformSchema = new Schema<Platform>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    url: {
      type: Schema.Types.String,
      required: true,
    },
    materials: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: MATERIAL_MODEL_NAME,
    },
  },
  {
    timestamps: true,
  }
).index({ name: "text" });

const PlatformModel = mongoose.model(PLATFORM_MODEL_NAME, PlatformSchema);
export default PlatformModel;
