import config from "../db.js";
import sql from "mssql";
import queriesDonDatHang from "./DonDatHang/queries.js";
import queriesDonHang_MonAn from "./DonHang_MonAn/queries.js";

const checkMaDHExists = async (MaDH) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaDH)
      .query(queriesDonDatHang.getDonDatHangByMaDH);

    if (!results.recordset.length) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

const checkMaKHExists = async (MaKH) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaKH)
      .query("SELECT * FROM KhachHang WHERE MaKH = @1");

    if (!results.recordset.length) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

const checkMaDTExists = async (MaDT) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaDT)
      .query("SELECT * FROM DoiTac WHERE MaDT = @1");

    if (!results.recordset.length) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

const checkTenMonExists = async (TenMon) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.NVarChar(30), TenMon)
      .query("SELECT * FROM MonAn WHERE TenMon = @1");

    if (!results.recordset.length) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

export { checkMaDHExists, checkMaKHExists, checkMaDTExists, checkTenMonExists };
