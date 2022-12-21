import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";
import checkExists from "../CheckExists.js";

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

    if (!(await checkExists.checkMaDHExists(MaDH))) {
      res.status(404).json({
        result: "that bai",
        message: `khong ton tai MaDH ${MaDH} trong DonDatHang`,
      });
      return;
    }

    if (!(await checkExists.checkMaTXExists(MaTX))) {
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

export default {
  getTaiXe,
  getTaiXeWithMaTX,
  chooseDonDatHang,
  undoDonDatHang,
};
