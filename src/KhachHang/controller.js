import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";
import { checkMaKHExists } from "../CheckExists.js";

const getKhachHangByMaKH = async (req, res) => {
  try {
    const MaKH = req.query.MaKH;
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaKH)
      .query(queries.getKhachHangByMaKH);
    res.status(200).json(results.recordset);
  } catch (error) {
    throw error;
  }
};

const insertKhachHang = async (req, res) => {
  try {
    const { MaKH, HoTen, DiaChi, SDT, Email } = JSON.parse(req.body);

    if (await checkMaKHExists(MaKH)) {
      res.status(409).json({
        result: "that bai",
        message: `da ton tai MaKH ${MaKH}`,
      });
      return;
    }

    const pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar(8), MaKH)
      .input("2", sql.NVarChar(30), HoTen)
      .input("3", sql.NVarChar(100), DiaChi)
      .input("4", sql.Char(10), SDT)
      .input("5", sql.VarChar(30), Email)
      .query(queries.insertKhachHang);
    res.status(200).json({
      result: "thanh cong",
      message: "da them khach hang vao KhachHang",
      data: {
        MaKH: MaKH,
        HoTen: HoTen,
        DiaChi: DiaChi,
        SDT: SDT,
        Email: Email,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getKhachHangByMaKH,
  insertKhachHang,
};
