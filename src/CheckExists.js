import config from "../db.js";
import sql from "mssql";
import queriesDoiTac from "./DoiTac/queries.js";
import queriesDonDatHang from "./DonDatHang/queries.js";
import queriesHeThongOnline from "./HeThongOnline/queries.js";
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
      .query(queriesDoiTac.getDoiTacWithMaDT);

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

const checkMaTXExists = async (MaTX) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaTX)
      .query("SELECT * FROM TaiXe WHERE MaTX = @1");
    if (!results.recordset.length) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

const checkHeThongOnlineExists = async (MaDT, ThanhPho, Quan_Huyen) => {
  try {
    const pool = await sql.connect(config);
    const results = await pool
      .request()
      .input("1", sql.VarChar(8), MaDT)
      .input("2", sql.NVarChar(30), ThanhPho)
      .input("3", sql.NVarChar(30), Quan_Huyen)
      .query(queriesHeThongOnline.getHeThongOnlineWithThreeParams);
    if (!results.recordset.length) return false;
    return true;
  } catch (error) {
    throw error;
  }
};

export {
  checkMaDHExists,
  checkMaKHExists,
  checkMaDTExists,
  checkTenMonExists,
  checkMaTXExists,
  checkHeThongOnlineExists,
};
