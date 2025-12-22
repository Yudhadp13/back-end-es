import mongoose, { Model } from "mongoose";
import * as Yup from "yup";

export const SPECIFICATION_MODEL_NAME = "Specification";

const Schema = mongoose.Schema;

export const specificationDAO = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
});

export type Specification = Yup.InferType<typeof specificationDAO>;

interface SpecificationModelType extends Model<Specification> {
    findByName(name: string): Promise<Specification | null>;
}

const specificationSchema = new Schema<Specification, SpecificationModelType>(
    {
        name: {
            type: Schema.Types.String,
            required: true,
        },
        description: {
            type: Schema.Types.String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

specificationSchema.statics.findByName = function (name: string) {
    return this.aggregate([
        {
            $match: {
                name: { $regex: name, $options: "i" }, // regex search
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
            },
        },
    ]);
};

const SpecificationModel = mongoose.model<
    Specification,
    SpecificationModelType
>(SPECIFICATION_MODEL_NAME, specificationSchema);

export default SpecificationModel;
