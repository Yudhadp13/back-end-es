import { Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import response from "../utils/response";
import RuleModel, { ruleDTO } from "../models/rule.model";
import { FilterQuery, isValidObjectId } from "mongoose";
import { TypePlatform } from "../models/platform.model";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      await ruleDTO.validate(req.body);
      const result = await RuleModel.create(req.body);
      response.success(res, result, "success create rule");
    } catch (error) {
      response.error(res, error, "failed create rule");
    }
  },

async findAll(req: IReqUser, res: Response) {
  try {
    const { page = 1, limit = 50, search } = req.query as unknown as IPaginationQuery;

    const pipeline: any[] = [];

    pipeline.push({
      $lookup: {
        from: "specifications", 
        localField: "conditions",
        foreignField: "_id",
        as: "conditions"
      }
    });

    pipeline.push({
      $lookup: {
        from: "materials",
        localField: "result",
        foreignField: "_id",
        as: "result"
      }
    });

    pipeline.push({
      $unwind: {
        path: "$result",
        preserveNullAndEmptyArrays: true
      }
    });

    if (search) {
      const regex = new RegExp(search, "i");

      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: regex } },
            { "conditions.name": { $regex: regex } },
            { "result.name": { $regex: regex } }
          ]
        }
      });
    }

    const totalPipeline = [...pipeline, { $count: "total" }];
    const totalResult = await RuleModel.aggregate(totalPipeline);
    const total = totalResult[0]?.total || 0;

    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: limit });

    const result = await RuleModel.aggregate(pipeline);

    response.pagination(
      res,
      result,
      {
        total,
        totalPages: Math.ceil(total / limit),
        current: page,
      },
      "success find all rules"
    );

  } catch (error) {
    response.error(res, error, "failed find all rules");
  }
}
,

  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "rule not found");
      }

      const result = await RuleModel.findById(id)
        .populate("conditions")
        .populate("result");

      if (!result) return response.notFound(res, "rule not found");

      response.success(res, result, "success find rule");
    } catch (error) {
      response.error(res, error, "failed find rule");
    }
  },

  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "rule not found");
      }

      const result = await RuleModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      response.success(res, result, "success update rule");
    } catch (error) {
      response.error(res, error, "failed update rule");
    }
  },

  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "rule not found");
      }

      const result = await RuleModel.findByIdAndDelete(id, {
        new: true,
      });

      response.success(res, result, "success remove rule");
    } catch (error) {
      response.error(res, error, "failed remove rule");
    }
  },
};
