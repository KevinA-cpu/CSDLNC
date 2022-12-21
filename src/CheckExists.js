import config from "../db.js";
import sql from "mssql";
import queriesDoiTac from "./DoiTac/queries.js";
import queriesHopDong from "./HopDong/queries.js";
import queriesChiTietHopDong from "./ChiTietHopDong/queries.js";
import queriesThucDon from "./ThucDon/queries.js";

const checkDoiTacExist = async (MaDT) => {
    try {
        let pool = await sql.connect(config);
        const result = await pool.request().input('1',sql.VarChar,MaDT).query(queriesDoiTac.getDoiTacByID)
        if(!result.recordset.length)
            return false;
        return true;
    } catch (error) {
        throw error;
    }
}

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

const checkTenMon = async(TenMon) => {
    try {
        let pool = await sql.connect(config);
        const result = await pool.request().input('1',sql.NVarChar(30),TenMon).query("select * from MonAn where TenMon = @1");
        if(!result.recordset.length)    // Mon An khong ton tai trong table MonAn
            return false;
        else
            return true;                // Mon An ton tai trong table MonAn
    } catch (error) {
        throw error;
    }
}

const check_TenMon_ThucDon = async (TenMon,MaDT) =>
{
    try {
        let pool = await sql.connect(config);
        const result = await pool.request().input('1',sql.NVarChar(30),TenMon).input('2',sql.VarChar(8),MaDT).query("select * from ThucDon where TenMon = @1 and MaDT = @2");
        if(!result.recordset.length)    // DoiTac chua co MonAn nay
            return false;
        else                            // DoiTac da co MonAn nay
            return true;  
    } catch (error) {
        throw error;
    }
}

export default {
    checkDoiTacExist,
    HopDongExist,
    checkMST,
    checkMaHD,
    checkTenMon,
    check_TenMon_ThucDon
}