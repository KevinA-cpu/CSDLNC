import e, { json, query } from "express";
import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql"

const getHopDong = async (req,res) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(queries.getHopDong).then((result) => {
            res.json(result.recordsets);
        })
    } catch (error) {
        throw error
    }
}
const getHopDongByID = async (req,res) => {
    try {
        const {MaHD} = JSON.parse(req.body)
        if(! await HopDongExist(MaHD)){
            res.status(404).json({
                result:"Failed",
                reason: `HopDong not found with MaDT: ${MaHD}`
            });
            return;
        }
        let pool = await sql.connect(config);
        await pool.request()
        .input('1',sql.VarChar,MaHD)
        .query(queries.getHopDongByID).then((result) => {
            res.json(result.recordsets);
        })
    } catch (error) {
        throw error;
    }
}

const insertHopDong = async (req,res) => {
    try {
        const {
            MaHD,
            SoChiNhanhDangKy,
            DiaChiDangKyCacChiNhanh,
            STK,
            NganHang,
            ChiNhanhNganHang
        } = JSON.parse(req.body);

        console.log("MaHD1: ",MaHD)

        //Kiem tra HopDong Exists
        if(await CheckExists.HopDongExist(MaHD)){
            res.status(409).json({
                result:"Failed",
                reason:`HopDong with MahD ${MaHD} is already exist`
            });
            return;
        }
        let pool = await sql.connect(config);
        await pool.request()
        .input('1',sql.VarChar(8),MaHD)
        .input('2',sql.Int,SoChiNhanhDangKy)
        .input('3',sql.NVarChar(100),DiaChiDangKyCacChiNhanh)
        .input('4',sql.VarChar(15),STK)
        .input('5',sql.NVarChar(50),NganHang)
        .input('6',sql.NVarChar(100),ChiNhanhNganHang)
        .query(queries.insertHopDong)
        res.status(200).json({
            result:"Successfully",
            data : {
                MaHD:MaHD,
                SoChiNhanhDangKy:SoChiNhanhDangKy,
                DiaChiDangKyCacChiNhanh:DiaChiDangKyCacChiNhanh,
                STK:STK,
                NganHang:NganHang,
                ChiNhanhNganHang:ChiNhanhNganHang
            },
        })
    } catch (error) {
        throw error;
    }
}

const updateHopDong = async (req,res) => {
    try {
        const {STK,MaHD} = JSON.parse(req.body);
        if(! await CheckExists.HopDongExist(MaHD))
        {
            res.status(404).json({
                result: "that bai",
                message: `khong ton tai MaDT ${MaHD}`,
            });
            return;
        }
        let pool = await sql.connect(config);
        await pool.request().input('1',sql.VarChar(15),STK).input('2',sql.VarChar(8),MaHD)
        .query(queries.updateHopDong)
        res.status(200).json({
            result:"update successfully",
            data: {
                MaHD: MaHD,
                STK:STK
            }
        })
    } catch (error) {
        throw error;
    }
}

const deleteHopDong = async (req,res) => {
    try {
        const {MaHD} = JSON.parse(req.body);
        if(!await CheckExists.HopDongExist(MaHD))
        {
            res.status(404).json({
                result: "that bai",
                message: `khong ton tai MaDT ${MaHD}`,
            });
            return;
        }
        let pool = await sql.connect(config);
        await pool.request().input('1',sql.VarChar(8),MaHD).query(queries.deleteHopDong);
        res.status(200).json({
            result:"delete successfully",
            MaHD : MaHD
        })
    } catch (error) {
        throw error;
    }
}

export default
{
    getHopDong,
    getHopDongByID,
    insertHopDong,
    updateHopDong,
    deleteHopDong
}