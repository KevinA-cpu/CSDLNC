import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";
import { checkMaDHExists, checkMaTXExists } from "../CheckExists.js";

const getTaiXe = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool.request().query(queries.getTaiXe);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

const getTaiXeWithMaTX = async (req, res) => {
  try {
    const MaTX = req.query.MaTX;
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaTX)
      .query(queries.getTaiXeWithMaTX);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

const chooseDonDatHang = async (req, res) => {
  try {
    const { MaDH, MaTX } = JSON.parse(req.body);

    if (!(await checkMaDHExists(MaDH))) {
      res.status(404).json({
        result: "that bai",
        message: `khong ton tai MaDH ${MaDH} trong DonDatHang`,
      });
      return;
    }

    if (!(await checkMaTXExists(MaTX))) {
      res.status(404).json({
        result: "that bai",
        message: `khong ton tai MaTX ${MaTX} vi pham khoa ngoai`,
      });
      return;
    }
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar(8), MaTX)
      .input("2", sql.VarChar(8), MaDH)
      .query(queries.chooseDonDatHang);
    res.status(200).json({
      result: "thanh cong",
      message: `tai xe ${MaTX} da chon don hang ${MaDH}`,
    });
  } catch (error) {
    throw error;
  }
};

const undoDonDatHang = async (req, res) => {
  try {
    const { MaDH, MaTX } = JSON.parse(req.body);
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar(8), MaDH)
      .input("2", sql.VarChar(8), MaTX)
      .query(queries.undoDonDatHang);
    res.status(200).json({
      result: "thanh cong",
      message: `tai xe ${MaTX} da bo chon don hang ${MaDH}`,
    });
  } catch (error) {
    throw error;
  }
};

const insertTaiXe = async (req, res) => {
  try {
    const {
      MaTX,
      HoTen,
      CCCD,
      SDT,
      DiaChi,
      BienSoXe,
      KhuVucHoatDong,
      Email,
      STKNganHang,
      PhiTheChan,
    } = JSON.parse(req.body);

    if (await checkMaTXExists(MaTX)) {
      res.status(404).json({
        result: "that bai",
        message: `da ton tai MaTX ${MaTX} vi pham khoa chinh`,
      });
      return;
    }

    const pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar(8), MaTX)
      .input("2", sql.NVarChar(30), HoTen)
      .input("3", sql.Char(12), CCCD)
      .input("4", sql.Char(10), SDT)
      .input("5", sql.NVarChar(100), DiaChi)
      .input("6", sql.NVarChar(30), BienSoXe)
      .input("7", sql.NVarChar(100), KhuVucHoatDong)
      .input("8", sql.VarChar(30), Email)
      .input("9", sql.NVarChar(30), STKNganHang)
      .input("10", sql.Money, PhiTheChan)
      .query(queries.insertTaiXe);

    res.status(200).json({
      result: "thanh cong",
      message: "them tai xe thanh cong",
      data: {
        MaTX: MaTX,
        HoTen: HoTen,
        CCCD: CCCD,
        SDT: SDT,
        DiaChi: DiaChi,
        BienSoXe: BienSoXe,
        KhuVucHoatDong: KhuVucHoatDong,
        Email: Email,
        STKNganHang: STKNganHang,
        PhiTheChan: PhiTheChan,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getDonHang_MonAnForTaiXe = async (req, res) => {
  try {
    const MaTX = req.query.MaTX;
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaTX)
      .query(queries.getDonHang_MonAnForTaiXe);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

export default {
  getTaiXe,
  getTaiXeWithMaTX,
  chooseDonDatHang,
  undoDonDatHang,
  insertTaiXe,
  getDonHang_MonAnForTaiXe,
};
