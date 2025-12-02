import { Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import SpecificationModel, { specificationDAO } from "../models/specification.model";
import response from "../utils/response";

export default{
    async create(req: IReqUser, res: Response) {
        try {
            await specificationDAO.validate(req.body);
            const result = await SpecificationModel.create(req.body);
            response.success(res, result, "success create a specification");
        } catch (error) {
            response.error(res, error, "failed create specification");
        }
    },
    async findAll(req: IReqUser, res: Response) {
        const { page = 1, limit = 10, search } = req.query as unknown as IPaginationQuery;
        try {
            const query = {};

            if (search) {
                Object.assign(query, {
                    $or: [
                        {
                            name: {$regex: search, $options: "i"},
                        },
                        {
                            description: {$regex: search, $options: "i"},
                        },
                    ],
                });
            }

            const result = await SpecificationModel.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
            .exec();

            const count = await SpecificationModel.countDocuments(query);

            response.pagination(res, result, {
                total: count,
                totalPages: Math.ceil(count / limit),
                current: page,
            },
            "success find all specification"
        );

        } catch (error) {
            response.error(res, error, "failed find all specification");
        }
    },
    async findByName(req: IReqUser, res: Response) {
        try {
            const { name } = req.query;
            const result = await SpecificationModel.findByName(`${name}`);
            response.success(res, result, "success get specification by code name");
        } catch (error) {
            response.error(res, error, "failed to get specification by code name");
        }
    },
    async findOne(req: IReqUser, res: Response) {
        try {
            const { id } = req.params;
            const result = await SpecificationModel.findById(id);
            response.success(res, result, "success find one specification");
        } catch (error) {
            response.error(res, error, "failed find one specification");
        }
    },
    async update(req: IReqUser, res: Response) {
        try {
            const { id } = req.params;
            const result = await SpecificationModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            response.success(res, result, "success update specification");
        } catch (error) {
            response.error(res, error, "failed update specification");
        }
    },
    async remove(req: IReqUser, res: Response) {
        try {
            const { id } = req.params;
            const result = await SpecificationModel.findByIdAndDelete(id, {new: true});
            response.success(res, result, "success remove specification");
        } catch (error) {
            response.error(res, error, "failed remove specification");
        }
    },
};