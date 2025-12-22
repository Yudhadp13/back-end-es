import { Response } from "express";
import dashboardService from "../services/dashboard.service";
import response from "../utils/response";
import { IReqUser } from "../utils/interfaces";

export default {
  async consultationStatistics(req: IReqUser, res: Response) {
    try {
      const result = await dashboardService.getConsultationStatistics();
      response.success(res, result, "dashboard consultation statistics");
    } catch (error) {
      response.error(res, error, "failed get dashboard consultation statistics");
    }
  },
};
