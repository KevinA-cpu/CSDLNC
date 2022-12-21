import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";
import { checkMaDHExists, checkTenMonExists } from "../CheckExists.js";

const getDonHang_MonAn = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool.request().query(queries.getDonHang_MonAn);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

const getDonHang_MonAnByMaDH = async (req, res) => {
  try {
    const MaDH = req.query.MaDH;
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaDH)
      .query(queries.getDonHang_MonAnByMaDH);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

const getDonHang_MonAnByMaDT = async (req, res) => {
  try {
    const MaDT = req.query.MaDT;
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaDT)
      .query(queries.getDonHang_MonAnByMaDT);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

const insertDonHang_MonAn = async (req, res) => {
  try {
    const { MaDH, TenMon, DonGia, SoLuong } = JSON.parse(req.body);

    if (!(await checkMaDHExists(MaDH))) {
      res.status(404).json({
        result: "that bai",
        message: `khong ton tai MaDH ${MaDH} vi pham khoa ngoai`,
      });
      return;
    }
    if (!(await checkTenMonExists(TenMon))) {
      res.status(404).json({
        result: "that bai",
        message: `khong ton tai TenMon ${TenMon} vi pham khoa ngoai`,
      });
      return;
    }

    const pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar(8), MaDH)
      .input("2", sql.NVarChar(30), TenMon)
      .input("3", sql.Money, DonGia)
      .input("4", sql.Int, SoLuong)
      .query(queries.insertDonHang_MonAn);
    res.status(200).json({
      result: "thanh cong",
      message: "da them donhang_monan vao DonHang_MonAn",
      data: {
        MaDH: MaDH,
        TenMon: TenMon,
        DonGia: DonGia,
        SoLuong: SoLuong,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deleteDonHang_MonAn = async (req, res) => {
  try {
    const { MaDH, TenMon } = req.query;
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar(8), MaDH)
      .input("2", sql.NVarChar(30), TenMon)
      .query(queries.deleteDonHang_MonAn);
    res.status(200).json({
      result: "thanh cong",
      message: `da xoa donhang_monan voi MaDH ${MaDH} va TenMon ${TenMon}`,
    });
  } catch (error) {
    throw error;
  }
};
export default {
  getDonHang_MonAn,
  getDonHang_MonAnByMaDH,
  getDonHang_MonAnByMaDT,
  insertDonHang_MonAn,
  deleteDonHang_MonAn,
};
