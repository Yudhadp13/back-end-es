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

      const query: FilterQuery<TypePlatform> = {};

      if (search) {
        Object.assign(query, {
          ...query,
          $text: {
            $search: search,
          },
        });
      }

      const result = await RuleModel.find()
        .populate("conditions")
        .populate("result")
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();

      const count = await RuleModel.countDocuments();

      response.pagination(
        res,
        result,
        {
          total: count,
          totalPages: Math.ceil(count / limit),
          current: page,
        },
        "success find all rules"
      );
    } catch (error) {
      response.error(res, error, "failed find all rules");
    }
  },

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
