import mongoose, { ObjectId } from "mongoose";
import * as Yup from "yup";

export const MATERIAL_MODEL_NAME = "Material";

const Schema = mongoose.Schema;

export const materialDTO = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  banner: Yup.string().required(),
  isPublish: Yup.boolean(),
  isSuperior: Yup.boolean(),
  category: Yup.string().required(),
  slug: Yup.string(),
  createdBy: Yup.string().required(),
  createdAt: Yup.string(),
  updatedAt: Yup.string(),
  characteristics: Yup.array()
    .of(Yup.string().required())
    .min(1, "Minimum select 1 specification")
    .required(),
});

export type TypeMaterial = Yup.InferType<typeof materialDTO>;

export interface Material 
  extends Omit<TypeMaterial, "category" | "createdBy" | "characteristics"> {
  category: ObjectId;
  createdBy: ObjectId;
  characteristics: ObjectId[]; 
}

const MaterialSchema = new Schema<Material>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    banner: {
      type: Schema.Types.String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    isPublish: {
      type: Schema.Types.Boolean,
      default: false,
    },
    isSuperior: {
      type: Schema.Types.Boolean,
      default: false,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    slug: {
      type: Schema.Types.String,
      unique: true,
    },
    characteristics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Specification",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
).index({ name: "text" });

MaterialSchema.pre("save", function () {
  if (!this.slug) {
    const slug = this.name.split(" ").join("-").toLowerCase();
    this.slug = `${slug}`;
  }
});

const MaterialModel = mongoose.model(MATERIAL_MODEL_NAME, MaterialSchema);

export default MaterialModel;
