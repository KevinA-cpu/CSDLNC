import e, { json, query } from "express";
import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql"
import {checkMaDTExists} from "../CheckExists.js";

const getPhiHoaHong = async(req,res) => {
    try {
        let pool = await sql.connect(config);
        const results = await pool.request().query(queries.getPhiHoaHong);
        res.status(200).json(results.recordsets);
    } catch (error) {
        throw error;
    }
}

const getPhiHoaHongByID = async(req,res) => {
    try {
        const {MaDT} = JSON.parse(req.body);
        if(! await checkMaDTExists(MaDT))
        {
            res.status(404).json({
                result:"failed",
                reason:`DoiTac with MaDT:${MaDT} was not found`
            })
        }
        let pool = await sql.connect(config);
        const results = await pool.request()
        .input('1',sql.VarChar(8),MaDT)
        .query(queries.getPhiHoaHongByID);
        res.status(200).json(results.recordsets);
    } catch (error) {
        throw error;
    }
}

const updatePhiHoaHong = async(req,res) => {
    try {
        const {DoanhSo,NgayThang,MaDT} = JSON.parse(req.body);
        if(! await checkMaDTExists(MaDT))
        {
            res.status(404).json({
                result:"failed",
                reason:`DoiTac with MaDT:${MaDT} was not found`
            })
        }
        let pool = await sql.connect(config);
        await pool.request()
        .input('1',sql.Money,DoanhSo)
        .input('2',sql.DateTime,NgayThang)
        .input('3',sql.VarChar(8),MaDT)
        .query(queries.updatePhiHoaHong)
        res.status(200).json({
            result:"update successfully",
            data: {
                DoanhSo:DoanhSo,
                NgayThang:NgayThang,
                MaDT:MaDT
            }
        })
    } catch (error) {
        throw error;
    }
}

export default {
    getPhiHoaHong,
    getPhiHoaHongByID,
    updatePhiHoaHong
}