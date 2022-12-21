import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";
import { checkMaDHExists, checkMaTXExists } from "../CheckExists.js";

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

export default {
  chooseDonDatHang,
  undoDonDatHang,
};
