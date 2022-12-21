import e, { json, query } from "express";
import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql"
import CheckExists  from "../CheckExists.js";

const getThucDon = async(req,res) => {
    try {
        let pool = await sql.connect(config);
        const results = await pool.request().query(queries.getThucDon);
        res.status(200).json(results.recordsets);
    } catch (error) {
        throw error;
    }
}

const getThucDonByMaDT = async(req,res) => {
    try {
        const {MaDT} = JSON.parse(req.body);
        if(! await CheckExists.checkDoiTacExist(MaDT)){
            res.status(404).json({
                result:"Failed",
                reason: `DoiTac not found with MaDT: ${MaDT}`
            });
            return;
        }
        let pool = await sql.connect(config);
        const results = await pool.request().input('1',sql.VarChar(8),MaDT).query(queries.getThuCDonByMaDT);
        res.status(200).json(results.recordsets);
    } catch (error) {
        throw error;
    }
}

const insertThucDon = async (req,res) =>
{
    try {
        const {MaDT,TenMon} = JSON.parse(req.body);
        if(! await CheckExists.checkDoiTacExist(MaDT))  // doi tac khong ton tai trong database
        {
            res.status(404).json({
                result:"insert Failed",
                reason: `DoiTac not found with MaDT: ${MaHD}`
            });
            return;
        }
        if(! await CheckExists.checkTenMon(TenMon))
        {
            res.status(404).json({
                result:"insert Failed",
                reason: `MonAn not found in table MonAn with TenMon: ${TenMon}`
            });
            return;
        }
        if(await CheckExists.check_TenMon_ThucDon(TenMon,MaDT))
        {
            res.status(409).json({
                result:"insert Failed",
                reason: `DoiTac ${MaDT} has already MonAn with TenMon: ${TenMon}`
            });
            return;
        }
        let pool = await sql.connect(config);
        await pool.request()
        .input('1',sql.VarChar(8),MaDT)
        .input('2',sql.NVarChar(30),TenMon)
        .query(queries.insertThucDon);
        res.status(200).json({
            result:"insert Successfully",
            data : {
                MaDT:MaDT,
                TenMon:TenMon
            },
        })
    } catch (error) {
        throw error;
    }
}

const updateThucDon = async(req,res) => {
    try {
        const {TenMon_Old,TenMon_New,MaDT} = JSON.parse(req.body);
        console.log(TenMon_Old,TenMon_New,MaDT)
        if(! await CheckExists.checkDoiTacExist(MaDT))
        {
            res.status(404).json({
                result:"update Failed",
                reason: `Doitac not found with MaDT: ${MaDT}`
            });
            return;
        }
        if(! await CheckExists.checkTenMon(TenMon_Old))
        {
            res.status(404).json({
                result:"update Failed",
                reason: `MonAn not found in table MonAn with TenMon: ${TenMon}`
            });
            return;
        }
        if(! await CheckExists.check_TenMon_ThucDon(TenMon_Old,MaDT))
        {
            res.status(404).json({
                result:"update Failed",
                reason: `MonAn: ${TenMon_Old} is not exist in ThucDon of DoiTac with MaDT: ${MaDT}`
            });
            return;
        }
        let pool = await sql.connect(config);
        await pool.request()
        .input('1',sql.NVarChar(30),TenMon_New)
        .input('2',sql.NVarChar(30),TenMon_Old)
        .input('3',sql.VarChar(8),MaDT)
        .query(queries.updateThucDon);
        res.status(200).json({
            result: "update successfully",
            data: {
                TenMon_New:TenMon_New,
                TenMon_Old:TenMon_Old,
                MaDT:MaDT
            }
        })
    } catch (error) {
        throw error;
    }
}

const deleteThucDon = async(req,res) =>{
    try {
        const {MaDT,TenMon} = JSON.parse(req.body);
        if(! await CheckExists.checkDoiTacExist(MaDT)) 
        {
            res.status(404).json({
                result:"Failed",
                reason: `DoiTac ${MaDT} not found`
            });
            return;
        }
        if(! await CheckExists.checkTenMon(TenMon))
        {
            res.status(404).json({
                result:"Failed",
                reason: `TenMon with ${TenMon} not found`
            });
            return;
        }
        if(! await CheckExists.check_TenMon_ThucDon(TenMon,MaDT))
        {
            res.status(404).json({
                result:"Failed",
                reason: `DoiTac ${MaDT} don't has MonAn with TenMon: ${TenMon}`
            });
            return;
        }
        let pool = await sql.connect(config);
        await pool.request().input('1',sql.VarChar(8),MaDT)
        .input('2',sql.NVarChar(30),TenMon)
        .query(queries.deleteThucDon)
        res.status(200).json({
            result:"delete successfully",
            data:{
                MaDT:MaDT,
                TenMon:TenMon
            }
        })
    } catch (error) {
        throw error;
    }
}

export default {
    getThucDon,
    getThucDonByMaDT,
    insertThucDon,
    updateThucDon,
    deleteThucDon
}