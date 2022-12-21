import e, { query } from "express";
import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql"
import CheckExists from "../CheckExists.js";

const getChiTietHopDong = async (req,res) => {
    try {
        let pool = await sql.connect(config);
        const result = await pool.request().query(queries.getChiTietHopDong);
        res.status(200).json(result.recordsets);
    } catch (error) {
        throw error;
    }
}

const getChiTietHopDongByMaHD = async(req,res) => {
    try {
        const {MaHD} = JSON.parse(req.body);
        if(!await CheckExists.checkMaHD(MaHD))
        {
            res.status(404).json({
                result:"Failed",
                reason: `DoiTac not found with MaDT: ${MaHD}`
            });
            return;
        }
        let pool = await sql.connect(config);
        await pool.request()
        .input('1',sql.VarChar,MaHD)
        .query(queries.getChiTietHopDongByMaHD).then((result) => {
            res.json(result.recordsets);
        })
    } catch (error) {
        throw error;
    }
}

const getChiTietHopDongByMaSoThue = async(req,res) => {
    try {
        const {MaSoThue} = JSON.parse(req.body);
        if(!await CheckExists.checkMST(MaSoThue))
        {
            res.status(404).json({
                result:"Failed",
                reason: `Chi Tiet Hop Dong not found with MaDT: ${MaSoThue}`
            });
            return;
        }
        let pool = await sql.connect(config);
        await pool.request()
        .input('1',sql.VarChar,MaSoThue)
        .query(queries.getChiTietHopDongByMaSoThue).then((result) => {
            res.json(result.recordsets);
        })
    } catch (error) {
        throw error;
    }
}

const insertChiTietHopDong = async(req,res) => {
    try {
        const {MaSoThue,MaDT,SoNamHoatDong,TrangThaiHoatDong,NgayKyHopDong,PhiKichHoat,MaHD} = JSON.parse(req.body);
        if(await CheckExists.checkMST(MaSoThue))        // check MaSoThue nay co ton tai hay chua
        {
            res.status(409).json({
                result:"Failed",
                reason: `MaSoThue is already exist MaSoThue: ${MaSoThue}`
            });
            return;
        }
        if(await CheckExists.checkMaHD(MaHD))           // check MaHD nay co ton tai trong table ChiTietHopDong khong
        {
            res.status(409).json({
                result:"Failed",
                reason: `MaHD is already exist MaHD: ${MaHD}`
            });
            return;
        }
        if(!await CheckExists.HopDongExist(MaHD)){
            res.status(404).json({
                result:"Failed",
                reason: `MaHD is not exist MaHD: ${MaHD} in DATABASE`
            });
            return;
        }
        if(!await CheckExists.checkDoiTacExist(MaDT)){
            res.status(404).json({
                result:"Failed",
                reason: `DoiTac is not exist MaDT: ${MaDT} in DATABASE`
            });
            return;
        }
        let pool = await sql.connect(config);
        await pool.request()
        .input('1',sql.VarChar,MaSoThue)
        .input('2',sql.NVarChar,MaDT)
        .input('3',sql.Int,SoNamHoatDong)
        .input('4',sql.NVarChar,TrangThaiHoatDong)
        .input('5',sql.NVarChar,NgayKyHopDong)
        .input('6',sql.Money,PhiKichHoat)
        .input('7',sql.NVarChar,MaHD).query(queries.insertChiTietHopDong);
        res.status(200).json({
            result:"Successfully",
            data : {
                MaSoThue:MaSoThue,
                MaDT:MaDT,
                SoNamHoatDong:SoNamHoatDong,
                TrangThaiHoatDong:TrangThaiHoatDong,
                NgayKyHopDong:NgayKyHopDong,
                PhiKichHoat:PhiKichHoat,
                MaHD:MaHD
            },
        })
        
    } catch (error) {
        throw error;
    }
}

export default {
    getChiTietHopDong,
    getChiTietHopDongByMaHD,
    getChiTietHopDongByMaSoThue,
    insertChiTietHopDong
}