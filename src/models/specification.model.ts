import mongoose from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

export const specificationDAO = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
});

export type Specification = Yup.InferType<typeof specificationDAO>;

const specificationSchema = new Schema<Specification>({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
}, {
    timestamps: true,
});

const SpecificationModel = mongoose.model("Specification", specificationSchema);

export default SpecificationModel;