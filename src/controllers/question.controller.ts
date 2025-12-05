import { Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import response from "../utils/response";
import QuestionModel, { questionDTO } from "../models/question.model";
import mongoose, { FilterQuery, isValidObjectId } from "mongoose";
import { TypePlatform } from "../models/platform.model";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      await questionDTO.validate(req.body);
      const result = await QuestionModel.create(req.body);
      response.success(res, result, "success create question");
    } catch (error) {
      response.error(res, error, "failed create question");
    }
  },

  async findAll(req: IReqUser, res: Response) {
    try {
      const { page = 1, limit = 50, search } = req.query as unknown as IPaginationQuery;

      const query: any = {};

      if (search) {
        const regex = new RegExp(search, "i");

        const specMatches = await mongoose.model("Specification")
          .find({ name: regex })
          .select("_id");

        query.$or = [
          { code: { $regex: regex } },
          { questionText: { $regex: regex } },
          { "options.label": { $regex: regex } },
          { "options.value": { $regex: regex } },
          { "options.specification": { $in: specMatches } },
        ];
      }

      const result = await QuestionModel.find(query)
        .populate("options.specification")
        .populate("options.nextQuestion")
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      const count = await QuestionModel.countDocuments(query);

      response.pagination(
        res,
        result,
        {
          total: count,
          totalPages: Math.ceil(count / limit),
          current: page,
        },
        "success find all questions"
      );
    } catch (error) {
      response.error(res, error, "failed find all questions");
    }
  },

  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "question not found");
      }

      const result = await QuestionModel.findById(id)
        .populate("options.specification")
        .populate("options.nextQuestion");

      response.success(res, result, "success find question");
    } catch (error) {
      response.error(res, error, "failed find question");
    }
  },

  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      const result = await QuestionModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      response.success(res, result, "success update question");
    } catch (error) {
      response.error(res, error, "failed update question");
    }
  },

  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await QuestionModel.findByIdAndDelete(id, { new: true });
      response.success(res, result, "success remove question");
    } catch (error) {
      response.error(res, error, "failed remove question");
    }
  },
};
