import { Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import response from "../utils/response";
import MaterialModel, { materialDTO, TypeMaterial } from "../models/material.model";
import { FilterQuery, isValidObjectId } from "mongoose";
import uploader from "../utils/uploader";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      const payload = { ...req.body, createdBy: req.user?.id } as TypeMaterial;
      await materialDTO.validate(payload);
      const result = await MaterialModel.create(payload);
      response.success(res, result, "success create an material");
    } catch (error) {
      response.error(res, error, "failed to create an material");
    }
  },
  async findAll(req: IReqUser, res: Response) {
    try {
      const buildQuery = (filter: any) => {
        let query: FilterQuery<TypeMaterial> = {};

        if (filter.search) query.$text = { $search: filter.search };
        if (filter.category) query.category = filter.category;
        if (filter.isPublish) query.isPublish = filter.isPublish;
        if (filter.isSuperior) query.isSuperior = filter.isSuperior;
        if (filter.characteristics) query.characteristics = { $in: filter.characteristics };

        return query;
      };

      const {
        limit = 50,
        page = 1,
        search,
        category,
        isPublish,
        isSuperior,
        characteristics,
      } = req.query;

      const query = buildQuery({
        search,
        category,
        isPublish,
        isSuperior,
        characteristics,
      });

      const result = await MaterialModel.find(query)
        .limit(+limit)
        .skip((+page - 1) * +limit)
        .sort({ createdAt: -1 })
        .populate("characteristics")
        .populate("category")
        .lean()
        .exec();
      const count = await MaterialModel.countDocuments(query);

      response.pagination(
        res,
        result,
        {
          current: +page,
          total: count,
          totalPages: Math.ceil(count / +limit),
        },
        "success find all materials"
      );
    } catch (error) {
      response.error(res, error, "failed find all materials");
    }
  },
  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return response.notFound(res, "material not found");
      }

      const result = await MaterialModel.findById(id).populate("characteristics").populate("category");

      if (!result) {
        return response.notFound(res, "material not found");
      }

      response.success(res, result, "success find one material");
    } catch (error) {
      response.error(res, error, "failed find one material");
    }
  },
  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await MaterialModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!result) return response.notFound(res, "material not found");

      response.success(res, result, "success update an material");
    } catch (error) {
      response.error(res, error, "failed update an material");
    }
  },
  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await MaterialModel.findByIdAndDelete(id, {
        new: true,
      });

      if (!result) return response.notFound(res, "material not found");

      await uploader.remove(result.banner);

      response.success(res, result, "success remove an material");
    } catch (error) {
      response.error(res, error, "failed to remove an material");
    }
  },
  async findOneBySlug(req: IReqUser, res: Response) {
    try {
      const { slug } = req.params;
       const result = await MaterialModel.findOne({ slug }).populate("characteristics").populate("category");

      if (!result) return response.notFound(res, "material not found");

      response.success(res, result, "success find one by slug an material");
    } catch (error) {
      response.error(res, error, "failed find one by slug an material");
    }
  },
};
