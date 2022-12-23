import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";
import {
  checkMaDHExists,
  checkMaDTExists,
  checkMaKHExists,
} from "../CheckExists.js";

const getDonDatHang = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool.request().query(queries.getDonDatHang);
    res.status(200).send(results.recordset);
  } catch (error) {
    throw error;
  }
};

const getDonDatHangByMaDH = async (req, res) => {
  try {
    const { MaDH } = JSON.parse(req.body);
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaDH)
      .query(queries.getDonDatHangByMaDH);
    res.status(200).send(results.recordset);
  } catch (error) {
    throw error;
  }
};

const insertDonDatHang = async (req, res) => {
  try {
    const {
      MaDH,
      TongTienCacMon,
      TrangThaDH,
      DiaChiDH,
      ThoiGianDatHang,
      TongTienDH,
      MaKH,
      MaTX,
      MaDT,
    } = JSON.parse(req.body);

    if (await checkMaDHExists(MaDH)) {
      res.status(409).json({
        result: "that bai",
        message: `da ton tai MaDH ${MaDH}`,
      });
      return;
    }

    if (!(await checkMaDTExists(MaDT))) {
      res.status(404).json({
        result: "that bai",
        message: `khong ton tai MaDT ${MaDT} vi pham khoa ngoai`,
      });
      return;
    }

    if (!(await checkMaKHExists(MaKH))) {
      res.status(404).json({
        result: "that bai",
        message: `khong ton tai MaKH ${MaKH} vi pham khoa ngoai`,
      });
      return;
    }

    const pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar(8), MaDH)
      .input("2", sql.Money, TongTienCacMon)
      .input("3", sql.NVarChar(25), TrangThaDH)
      .input("4", sql.NVarChar(100), DiaChiDH)
      .input("5", sql.DateTime2(7), ThoiGianDatHang)
      .input("6", sql.Money, TongTienDH)
      .input("7", sql.VarChar(8), MaKH)
      .input("8", sql.VarChar(8), MaTX)
      .input("9", sql.VarChar(8), MaDT)
      .query(queries.insertDonDatHang);
    res.status(200).json({
      result: "thanh cong",
      message: "da them don hang vao DonDatHang",
      data: {
        MaDH: MaDH,
        TongTienCacMon: TongTienCacMon,
        TrangThaDH: TrangThaDH,
        DiaChiDH: DiaChiDH,
        ThoiGianDatHang: ThoiGianDatHang,
        TongTienDH: TongTienDH,
        MaKH: MaKH,
        MaTX: MaTX,
        MaDT: MaDT,
      },
    });
  } catch (error) {
    throw error;
  }
};

const deleteDonDatHang = async (req, res) => {
  try {
    const MaDH = req.query.MaDH;
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar(8), MaDH)
      .query(queries.deleteDonDatHang);
    res.status(200).json({
      result: "thanh cong",
      message: `da xoa don hang voi MaDH ${MaDH}`,
    });
  } catch (error) {
    throw error;
  }
};

const getDonDatHangForTaiXe = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool.request().query(queries.getDonDatHangForTaiXe);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

const getDonDatHangByMaKH = async (req, res) => {
  try {
    const MaKH = req.query.MaKH;
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaKH)
      .query(queries.getDonDatHangByMaKH);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

export default {
  getDonDatHang,
  getDonDatHangByMaDH,
  insertDonDatHang,
  deleteDonDatHang,
  getDonDatHangForTaiXe,
  getDonDatHangByMaKH,
};
