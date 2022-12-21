import config from "../db.js";
import sql from "mssql";
import queriesDoiTac from "./DoiTac/queries.js";
import queriesDonDatHang from "./DonDatHang/queries.js";
import queriesHeThongOnline from "./HeThongOnline/queries.js";
import queriesHopDong from "./HopDong/queries.js";
import queriesChiTietHopDong from "./ChiTietHopDong/queries.js";
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

const HopDongExist = async (MaHD) => {
  try {
      let pool = await sql.connect(config);
      // console.log("MaHD: ",MaHD)
      const result = await pool.request().input('1',sql.VarChar,MaHD).query(queriesHopDong.getHopDongByID)
      console.log("DEBUG")
      if(!result.recordset.length)
          return false;
      return true;
  } catch (error) {
      throw error;
  }
}

const check_TenMon_ThucDon = async (TenMon,MaDT) =>
{
    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
        .input('1',sql.NVarChar(30),TenMon)
        .input('2',sql.VarChar(8),MaDT)
        .query("select * from ThucDon where TenMon = @1 and MaDT = @2");
        if(!result.recordset.length)    // DoiTac chua co MonAn nay
            return false;
        else                            // DoiTac da co MonAn nay
            return true;  
    } catch (error) {
        throw error;
    }
}

const checkMaHD = async(MaHD) =>{
  try {
      let pool = await sql.connect(config);
      const result = await pool.request().input('1',sql.VarChar(8),MaHD).query(queriesChiTietHopDong.getChiTietHopDongByMaHD);
      if(!result.recordset.length)    // MaHD khong ton tai trong ChiTietHopDong
          return false;
      else
          return true;                // MaHD ton tai trong ChiTietHopDong
  } catch (error) {
      throw error;
  }
}

const checkMST = async(MaSoThue) =>{
  try {
      let pool = await sql.connect(config);
      const result = await pool.request().input('1',sql.NVarChar(13),MaSoThue).query(queriesChiTietHopDong.getChiTietHopDongByMaSoThue);
      if(!result.recordset.length)
          return false;   // khong ton tai
      else
          return true;    // ton tai
  } catch (error) {
      throw error;
  }
}


export default{
  checkMaDHExists,
  checkMaKHExists,
  checkMaDTExists,
  checkTenMonExists,
  checkMaTXExists,
  checkHeThongOnlineExists,
  HopDongExist,
  check_TenMon_ThucDon,
  checkMaHD,
  checkMST
};
