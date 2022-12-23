const getDoiTac = "SELECT TOP 20 * FROM DoiTac;";
const getDoiTacWithMaDT = "SELECT * FROM DoiTac WHERE MaDT = @1;";
const getAvailableDoiTac =
  "SELECT TOP 20 * FROM DoiTac dt WHERE dt.MaDT IN (SELECT hto.MaDT FROM HeThongOnline hto WHERE hto.MaDT = dt.MaDT AND hto.TrangThaiHoatDong = N'Đang hoạt động')";
const insertDoiTac =
  "INSERT INTO DoiTac(MaDT,TenQuan,DiaChiKinhDoanh,LoaiThucPham,NguoiDaiDien,ThanhPho,Quan_Huyen,SoLuongChiNhanh,SoLuongDonHangMoiNgay,Email,TaiKhoanNganHang) VALUES(@1,@2,@3,@4,@5,@6,@7,@8,@9,@10,@11);";
const updateDoiTac = "UPDATE DoiTac SET TenQuan = @1 WHERE MaDT = @2;";
const deleteDoiTac = "DELETE FROM DoiTac WHERE MaDT = @1;";

const getThuCDonByMaDT = 
"select td.TenMon,ma.DonGia,ma.TinhTrangMon,ma.SoLuongDaBan,ma.SoLike,ma.SoDislike from ThucDon td,MonAn ma where td.MaDT = @1 and ma.TenMon = td.TenMon";

export default {
  getDoiTac,
  getDoiTacWithMaDT,
  getAvailableDoiTac,
  insertDoiTac,
  updateDoiTac,
  deleteDoiTac,
  getThuCDonByMaDT
};
