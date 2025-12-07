import { Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import response from "../utils/response";
import PlatformModel, { platformDTO, TypePlatform } from "../models/platform.model";
import { FilterQuery, isValidObjectId } from "mongoose";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      await platformDTO.validate(req.body);
      const result = await PlatformModel.create(req.body);
      response.success(res, result, "success create a platform");
    } catch (error) {
      response.error(res, error, "failed to create a platform");
    }
  },
  async findAll(req: IReqUser, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search,
      } = req.query as unknown as IPaginationQuery;

      const query: FilterQuery<TypePlatform> = {};

      if (search) {
        Object.assign(query, {
          ...query,
          $text: {
            $search: search,
          },
        });
      }

      const result = await PlatformModel.find(query)
        .populate("materials")
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
      const count = await PlatformModel.countDocuments(query);

      response.pagination(
        res,
        result,
        {
          total: count,
          current: page,
          totalPages: Math.ceil(count / limit),
        },
        "success find all platforms"
      );
    } catch (error) {
      response.error(res, error, "failed to find all platforms");
    }
  },
  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "failed find one a platform");
      }

      const result = await PlatformModel.findById(id).populate("materials");

      if (!result) {
        return response.notFound(res, "failed find one a platform");
      }

      response.success(res, result, "success find one a platform");
    } catch (error) {
      response.error(res, error, "failed to find one a platform");
    }
  },
  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "failed update a platform");
      }

      const result = await PlatformModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      response.success(res, result, "success update a platform");
    } catch (error) {
      response.error(res, error, "failed to update platform");
    }
  },
  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "failed remove a platform");
      }

      const result = await PlatformModel.findByIdAndDelete(id, {
        new: true,
      });
      response.success(res, result, "success remove a platform");
    } catch (error) {
      response.error(res, error, "failed to remove platform");
    }
  },
  async findAllByMaterial(req: IReqUser, res: Response) {
    try {
      const { materialId } = req.params;

      if (!isValidObjectId(materialId)) {
        return response.error(res, null, "platforms not found");
      }

      const result = await PlatformModel.find({ materials: materialId }).exec();
      response.success(res, result, "success find all platforms by an material");
    } catch (error) {
      response.error(res, error, "failed to find all platform by material");
    }
  },
};
