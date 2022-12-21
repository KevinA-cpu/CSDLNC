import e, { query } from "express";
import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql"
import CheckExists from "../CheckExists.js";

const getHeThongOnline = async(req,res) => {
    try {
        let pool = await sql.connect(config);
        const results = await pool.request().query(queries.getHeThongOnline);
        res.status(200).json(results.recordsets);
    } catch (error) {
        throw error;
    }
}

export default {
    getHeThongOnline
}