import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";
import checkExists from "../CheckExists.js";

const getHeThongOnline = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool.request().query(queries.getHeThongOnline);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

const getHeThongOnlineWithThreeParams = async (req, res) => {
  try {
    const { MaDT, ThanhPho, Quan_Huyen } = req.query;
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaDT)
      .input("2", sql.NVarChar(30), ThanhPho)
      .input("3", sql.NVarChar(30), Quan_Huyen)
      .query(queries.getHeThongOnlineWithThreeParams);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

const updateHeThongOnline = async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    const { MaDT, ThanhPho, Quan_Huyen } = data;

    if (!(await checkExists.checkHeThongOnlineExists(MaDT, ThanhPho, Quan_Huyen))) {
      res.status(404).json({
        result: "that bai",
        reason: `khong tim thay he thong online voi MaDT ${MaDT}, ThanhPho ${ThanhPho}, Quan_Huyen ${Quan_Huyen}`,
      });
      return;
    }

    const {
      ThanhPhoChange,
      Quan_HuyenChange,
      TrangThaiHoatDong,
      ThoiGianHoatDong,
    } = data.change;
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.NVarChar(30), ThanhPhoChange)
      .input("2", sql.NVarChar(30), Quan_HuyenChange)
      .input("3", sql.NVarChar(30), TrangThaiHoatDong)
      .input("4", sql.VarChar(20), ThoiGianHoatDong)
      .input("5", sql.VarChar(8), MaDT)
      .input("6", sql.NVarChar(30), ThanhPho)
      .input("7", sql.NVarChar(30), Quan_Huyen)
      .query(queries.updateHeThongOnline);
    res.status(200).json({
      results: "thanh cong",
      message: "cap nhat he thong online thanh cong",
      data: {
        MaDT: MaDT,
        ThanhPho: ThanhPho,
        Quan_Huyen: Quan_Huyen,
        change: {
          ThanhPhoChange: ThanhPhoChange,
          Quan_HuyenChange: Quan_HuyenChange,
          TrangThaiHoatDong: TrangThaiHoatDong,
          ThoiGianHoatDong: ThoiGianHoatDong,
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getHeThongOnline,
  getHeThongOnlineWithThreeParams,
  updateHeThongOnline,
};
