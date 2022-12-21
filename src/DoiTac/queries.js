const getDoiTac = "SELECT * FROM DoiTac;";
const getDoiTacByID = "SELECT * FROM DoiTac WHERE MaDT = @1;";
const insertDoiTac = 
"INSERT INTO DoiTac(MaDT,TenQuan,DiaChiKinhDoanh,LoaiThucPham,NguoiDaiDien,ThanhPho,Quan_Huyen,SoLuongChiNhanh,SoLuongDonHangMoiNgay,Email,TaiKhoanNganHang) VALUES(@1,@2,@3,@4,@5,@6,@7,@8,@9,@10,@11);";
const updateDoiTac =
"UPDATE DoiTac SET TenQuan = @1 WHERE MaDT = @2;";
const deleteDoiTac = "DELETE FROM DoiTac WHERE MaDT = @1;";

export default {
    getDoiTac,
    getDoiTacByID,
    insertDoiTac,
    updateDoiTac,
    deleteDoiTac
}