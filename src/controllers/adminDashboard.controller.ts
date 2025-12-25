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

  async topMaterials(req: IReqUser, res: Response) {
  try {
    const {
      period = "monthly",
      year = new Date().getFullYear(),
      month,
    } = req.query;

    const result =
      await dashboardService.getTopMaterialsByPeriod({
        period: period as any,
        year: Number(year),
        month: month ? Number(month) : undefined,
      });

    response.success(res, result, "top materials by period");
  } catch (error) {
    response.error(res, error, "failed get top materials");
  }
}

};
