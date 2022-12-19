import e, { query } from "express";
import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql"

const checkDoiTacExist = async (MaDT) => {
    try {
        let pool = await sql.connect(config);
        // const {MaDT} = req.body;
        // console.log("req.body: ",req.body.MaDT)
        console.log(MaDT)
        await pool.request()
        .input('1',sql.VarChar,MaDT)
        .query(queries.getDoiTacByID).then((result) => {
            console.log(result)
            if(!result)        // DoiTac khong ton tai
            {
                return false;
            }
            else                                // DoiTac ton tai
            {
                return true;
            }
        })
    } catch (error) {
        throw error;
    }
}

const getDoiTac = async (req,res) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().query(queries.getDoiTac).then((result) => {
            res.json(result.recordsets);
        })
    } catch (error) {
        throw error
    }
}

const getDoiTacByID = async (req,res) => {
    try {
        let pool = await sql.connect(config);
        const {MaDT} = req.body;
        console.log("req.body: ",req.body.MaDT)
        await pool.request()
        .input('1',sql.VarChar,req.body.MaDT)
        .query(queries.getDoiTacByID).then((result) => {
            if(result.rowsAffected == 0)
            {
                res.status(404).json({
                    result:"Failed",
                    reason: "DoiTac not found"})
            }
            else
            {
                res.json(result.recordsets);
            }
        })
    } catch (error) {
        throw error;
    }
}

const insertDoiTac = async (req,res) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('1',sql.VarChar,req.body.MaDT)
        .input('2',sql.NVarChar,req.body.TenQuan)
        .input('3',sql.NVarChar,req.body.DiaChiKinhDoanh)
        .input('4',sql.NVarChar,req.body.LoaiThucPham)
        .input('5',sql.NVarChar,req.body.NguoiDaiDien)
        .input('6',sql.NVarChar,req.body.ThanhPho)
        .input('7',sql.NVarChar,req.body.Quan_Huyen)
        .input('8',sql.Int,req.body.SoLuongChiNhanh)
        .input('9',sql.Int,req.body.SoLuongDonHangMoiNgay)
        .input('10',sql.VarChar,req.body.Email)
        .input('11',sql.VarChar,req.body.TaiKhoanNganHang)
        .query(queries.insertDoiTac,function(err,data){
            if(!err)
            {
                res.send({
                result:"successfully",
                MaDT:req.body.MaDT,
                TenQuan:req.body.TenQuan,
                DiaChiKinhDoanh:req.body.DiaChiKinhDoanh,
                LoaiThucPham:req.body.LoaiThucPham,
                NguoiDaiDien:req.body.NguoiDaiDien,
                ThanhPho:req.body.ThanhPho,
                Quan_Huyen:req.body.Quan_Huyen,
                SoLuongChiNhanh:req.body.SoLuongChiNhanh,
                SoLuongDonHangMoiNgay:req.body.SoLuongDonHangMoiNgay,
                Email:req.body.Email,
                TaiKhoanNganHang:req.body.TaiKhoanNganHang,
            });
            }
            else
            {
                res.send({result:"failed",reason:"DoiTac has already exists"});
            }
            
        });
    } catch (error) {
        throw error;
    }
}

const updateDoiTac = async (req,res) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().input('1',sql.NVarChar,req.body.TenQuan).input('2',sql.VarChar,req.body.MaDT)
        .query(queries.updateDoiTac,function(err,data){
            if(!err)
            {
                res.status(200).json({
                    result: "successfully",
                    data:data
                })
            }
            else
            {
                res.status(404).json({
                    result: "failed",
                    reason:"Doi tac is not exists"
                })
            }
        })      
    } catch (error) {
        throw error;
    }
}

const deleteDoiTac = async (req,res) => {
    try {
        let pool = await sql.connect(config);
        await pool.request().input('1',sql.VarChar,req.body.MaDT)
        .query(queries.deleteDoiTac,function(err,data){
            if(!err)
            {
                res.status(200).json({
                    result: "successfully",
                    data:data
                })
            }
            else
            {
                res.status(404).json({
                    result: "failed",
                    reason:"Doi tac is not exists"
                })
            }
        })      
    } catch (error) {
        throw console.error();
    }
}

export default {
    getDoiTac,
    getDoiTacByID,
    insertDoiTac,
    updateDoiTac,
    deleteDoiTac
}