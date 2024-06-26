import config from "../../db.js";
import queries from "./queries.js";
import sql from "mssql";
import {checkMaDHExists, checkMaDTExists}  from "../CheckExists.js";

const getDoiTac = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    await pool.request()
      .query(queries.getDoiTac)
      .then((result) => {
        res.json(result.recordsets);
      });
  } catch (error) {
    throw error;
  }
};

const getDoiTacByID = async (req, res) => {
  try {
    const {MaDT} = JSON.parse(req.body);
    if(!await checkMaDTExists(MaDT))
    {
        res.status(404).json({
            result:"Failed",
            reason: `DoiTac not found with MaDT: ${MaDT}`
        });
        return;
    }
    let pool = await sql.connect(config);
    await pool.request()
    .input('1',sql.VarChar,MaDT)
    .query(queries.getDoiTacWithMaDT).then((result) => {
        res.json(result.recordsets);
    })
  } catch (error) {
      throw error;
}
};

const getAvailableDoiTac = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    await pool
      .request()
      .query(queries.getAvailableDoiTac)
      .then((result) => {
        res.json(result.recordset);
      });
  } catch (error) {
    throw error;
  }
};

const insertDoiTac = async (req, res) => {
  try {
    const {
      MaDT,
      TenQuan,
      DiaChiKinhDoanh,
      LoaiThucPham,
      NguoiDaiDien,
      ThanhPho,
      Quan_Huyen,
      SoLuongChiNhanh,
      SoLuongDonHangMoiNgay,
      Email,
      TaiKhoanNganHang,
    } = JSON.parse(req.body);
    if (await checkMaDTExists(MaDT)) {
      // doi tac da ton tai
      res.status(409).json({
        result: "that bai",
        message: `da ton tai MaDT ${MaDT}`,
      });
      return;
    }
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar, MaDT)
      .input("2", sql.NVarChar, TenQuan)
      .input("3", sql.NVarChar, DiaChiKinhDoanh)
      .input("4", sql.NVarChar, LoaiThucPham)
      .input("5", sql.NVarChar, NguoiDaiDien)
      .input("6", sql.NVarChar, ThanhPho)
      .input("7", sql.NVarChar, Quan_Huyen)
      .input("8", sql.Int, SoLuongChiNhanh)
      .input("9", sql.Int, SoLuongDonHangMoiNgay)
      .input("10", sql.VarChar, Email)
      .input("11", sql.VarChar, TaiKhoanNganHang)
      .query(queries.insertDoiTac, function (err, data) {
        if (!err) {
          res.send({
            result: "successfully",
            MaDT: MaDT,
            TenQuan: TenQuan,
            DiaChiKinhDoanh: DiaChiKinhDoanh,
            LoaiThucPham: LoaiThucPham,
            NguoiDaiDien: NguoiDaiDien,
            ThanhPho: ThanhPho,
            Quan_Huyen: Quan_Huyen,
            SoLuongChiNhanh: SoLuongChiNhanh,
            SoLuongDonHangMoiNgay: SoLuongDonHangMoiNgay,
            Email: Email,
            TaiKhoanNganHang: TaiKhoanNganHang,
          });
        } else {
          res.send({ result: "failed" });
        }
      });
  } catch (error) {
    throw error;
  }
};

const updateDoiTac = async (req, res) => {
  try {
    const { TenQuan, MaDT } = JSON.parse(req.body);
    if (! await checkMaDTExists(MaDT)) {
      res.status(404).json({
        result: "that bai",
        message: `khong ton tai MaDT ${MaDT}`,
      });
      return;
    }
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.NVarChar, TenQuan)
      .input("2", sql.VarChar(8), MaDT)
      .query(queries.updateDoiTac, function (err, data) {
        if (!err) {
          res.status(200).json({
            result: "successfully",
            data: data,
          });
        } else {
          res.status(404).json({
            result: "failed",
            reason: "Something maybe conflict",
          });
        }
      });
  } catch (error) {
    throw error;
  }
};

const deleteDoiTac = async (req, res) => {
  try {
    const { MaDT } = JSON.parse(req.body);
    if (! await checkMaDTExists(MaDT)) {
      res.status(404).json({
        result: "that bai",
        message: `khong ton tai MaDT ${MaDT}`,
      });
      return;
    }
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("1", sql.VarChar(8), MaDT)
      .query(queries.deleteDoiTac, function (err, data) {
        if (!err) {
          res.status(200).json({
            result: "successfully",
            data: data,
          });
        } else {
          res.status(404).json({
            result: "failed",
            reason: "Some thing maybe conflict",
          });
        }
      });
  } catch (error) {
    throw console.error();
  }
};

const getThucDonByMaDT = async(req,res) => {
  try {
      const {MaDT} = JSON.parse(req.body);
      if(! await checkMaDTExists(MaDT)){
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

const NhanDonHang= async(req,res) => {
  try {
    const {MaDH,MaDT} = JSON.parse(req.body);
    if(! await checkMaDHExists(MaDH))
    {
      res.status(404).json({
        result:"Failed",
        reason: `Don hang not found ${MaDH}`
      });
      return;
    }
    if(! await checkMaDTExists(MaDT))
    {
      res.status(404).json({
        result:"Failed",
        reason: `Doi tac not found ${MaDT}`
      });
      return;
    }
    let pool = await sql.connect(config);
    await pool.request().input('1',sql.VarChar(8),MaDH).input('2',sql.VarChar(8),MaDT)
    .query("update DonDatHang set TrangThaiDH = 'dang chuan bi' where MaDH = @1 and MaDT = @2");
    res.status(200).json({result: "Nhan Don hang thanh cong"})
  } catch (error) {
    throw error;
  }
}

const ShowDonHang = async(req,res)=> {
  try {
    const {MaDT} = JSON.parse(req.body);
    if(! await checkMaDTExists(MaDT)){
      res.status(404).json({
          result:"Failed",
          reason: `DoiTac not found with MaDT: ${MaDT}`
      });
      return;
    }
    let pool = await sql.connect(config)
    const result = await pool.request().input('1',sql.VarChar(8),MaDT).query("select * from DonDatHang where MaDT = @1 and TrangThaiDH = 'Dang len don hang'");
    res.status(200).json(result.recordsets);
  } catch (error) {
    throw error;
  }
}

export default {
  getDoiTac,
  getDoiTacByID,
  getAvailableDoiTac,
  insertDoiTac,
  updateDoiTac,
  deleteDoiTac,
  getThucDonByMaDT,
  NhanDonHang,
  ShowDonHang
};
