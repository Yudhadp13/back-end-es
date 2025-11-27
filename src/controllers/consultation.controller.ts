import { Response } from "express";
import expertService from "../services/expert.service";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import response from "../utils/response";

export default {
  async start(req: IReqUser, res: Response) {
    try {
          if (!req.user?.id) {
          throw new Error("User not authenticated");
          }
      const result = await expertService.startSession(req.user.id.toString());
      response.success(res, result, "session started");
    } catch (error) {
      response.error(res, error, "failed to start session");
    }
  },

  async answer(req: IReqUser, res: Response) {
    try {
      const { sessionId, optionValue } = req.body;

      const result = await expertService.answerQuestion(sessionId, optionValue);
      response.success(res, result, "answer processed");
    } catch (error) {
      response.error(res, error, "failed to answer question");
    }
  },

  async history(req: IReqUser, res: Response) {
  try {
    const { page = 1, limit = 10 } = req.query as unknown as IPaginationQuery;

    const SessionModel = (await import("../models/session.model")).default;

    const result = await SessionModel.find({
      user: req.user?.id,
    })
      .populate("result")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const count = await SessionModel.countDocuments({
      user: req.user?.id,
    });

    response.pagination(
      res,
      result,
      {
        total: count,
        totalPages: Math.ceil(count / Number(limit)),
        current: Number(page),
      },
      "consultation history"
    );
  } catch (error) {
    response.error(res, error, "failed get history");
  }}
};
