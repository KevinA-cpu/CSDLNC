import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";

import {
  checkMaKHExists,
  checkMaDHExists,
  checkMaDTExists,
  check_TenMon_ThucDon,
} from "../CheckExists.js";

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

const DatHang = async (req, res) => {
  try {
    const { MaKH, DiaChiDH, MaDT, TenMon1 } = JSON.parse(req.body);

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
        message: `Doi Tac ${MaDT} khong co mon an ${TenMon1}`,
      });
      return;
    }

    if (!(await check_TenMon_ThucDon(TenMon1, MaDT))) {
      res.status(404).json({
        result: "that bai",
        message: `Doi Tac ${MaDT} khong co mon an ${TenMon1}`,
      });
      return;
    }

    const MaDH1 =
      "DH" + String(Math.floor(Math.random() * (99999 - 10000)) + 10000);

    const TongTienCacMon = 0;
    const TrangThaDH = "Dang len don hang";
    const TongTienDH = 0;

    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const ThoiGianDatHang = time;
    const MaTX = "NULL";
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar(8), MaDH1)
      .input("2", sql.Money, TongTienCacMon)
      .input("3", sql.NVarChar(25), TrangThaDH)
      .input("4", sql.NVarChar(100), DiaChiDH)
      .input("5", sql.NVarChar(50), ThoiGianDatHang)
      .input("6", sql.Money, TongTienDH)
      .input("7", sql.VarChar(8), MaKH)
      .input("8", sql.VarChar(8), MaTX)
      .input("9", sql.VarChar(8), MaDT)
      .query(queries.insertDonDatHang);
    res.status(200).json({
      result: "thanh cong",
      message: "da them don hang vao DonDatHang",
      data: {
        MaDH: MaDH1,
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
    await pool
      .request()
      .input("1", sql.VarChar(8), MaDH1)
      .input("2", sql.NVarChar(30), TenMon1)
      .query("insert into DonHang_MonAn(MaDH,TenMon) values(@1,@2)");
  } catch (error) {
    throw error;
  }
};

export default {
  getKhachHangByMaKH,
  insertKhachHang,
  DatHang,
};
