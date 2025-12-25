import SessionModel, { SESSION_STATUS } from "../models/session.model";
import MaterialModel from "../models/material.model";
import mongoose from "mongoose";

export default {
  async getConsultationStatistics() {
    // =============================
    // 1. TOTAL KONSULTASI
    // =============================
    const totalConsultation = await SessionModel.countDocuments();

    // =============================
    // 2. STATUS STATS
    // =============================
    const statusAggregation = await SessionModel.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
    ]);

    const statusStats = {
      FINISHED: 0,
      IN_PROGRESS: 0,
    };

    statusAggregation.forEach((item) => {
      statusStats[item._id as keyof typeof statusStats] = item.total;
    });

    // =============================
    // 3. TOP 5 MATERIAL
    // =============================
    const topMaterials = await SessionModel.aggregate([
      {
        $match: {
          status: SESSION_STATUS.FINISHED,
          result: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$result",
          total: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "materials",
          localField: "_id",
          foreignField: "_id",
          as: "material",
        },
      },
      { $unwind: "$material" },
      {
        $project: {
          _id: "$material._id",
          name: "$material.name",
          total: 1,
        },
      },
    ]);

    // =============================
    // 4. KONSULTASI PER BULAN
    // =============================
    const consultationByPeriod = await SessionModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          period: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          total: 1,
          _id: 0,
        },
      },
    ]);

    return {
      totalConsultation,
      statusStats,
      topMaterials,
      consultationByPeriod,
    };
  },

  async getTopMaterialsByPeriod({
    period,
    year,
    month,
  }: {
    period: "daily" | "weekly" | "monthly";
    year: number;
    month?: number;
  }) {
    let match: any = {
      status: SESSION_STATUS.FINISHED,
      result: { $ne: null },
    };

    // ===== FILTER WAKTU =====
    if (period === "monthly" && month) {
      match.$expr = {
        $and: [
          { $eq: [{ $year: "$createdAt" }, year] },
          { $eq: [{ $month: "$createdAt" }, month] },
        ],
      };
    }

    if (period === "daily") {
      match.$expr = {
        $eq: [{ $year: "$createdAt" }, year],
      };
    }

    // ===== AGGREGATION =====
    const materials = await SessionModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$result",
          total: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "materials",
          localField: "_id",
          foreignField: "_id",
          as: "material",
        },
      },
      { $unwind: "$material" },
      {
        $project: {
          materialId: "$material._id",
          materialName: "$material.name",
          total: 1,
          _id: 0,
        },
      },
    ]);

    return {
      period,
      range:
        period === "monthly"
          ? `${year}-${month}`
          : `${year}`,
      materials,
    };
  }


};
