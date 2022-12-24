const getTaiXe = "SELECT TOP 20 * FROM TaiXe";
const getTaiXeWithMaTX = "SELECT * FROM TaiXe WHERE MaTX = @1";
const chooseDonDatHang =
  "UPDATE DonDatHang SET MaTX = @1, TrangThaiDH = N'Đã có tài xế nhận đơn' WHERE MaDH = @2";
const undoDonDatHang =
  "UPDATE DonDatHang SET MaTX = NULL, TrangThaiDH = NULL WHERE MaDH = @1 AND MaTX = @2";
const insertTaiXe = "INSERT INTO TaiXe(MaTX, HoTen, CCCD, SDT, DiaChi, BienSoXe, KhuVucHoatDong, Email, STKNganHang, PhiThueChan) VALUES(@1,@2,@3,@4,@5,@6,@7,@8,@9,@10)";
const getDonDatHangOfTaiXe = "SELECT * FROM DonDatHang WHERE MaTX = @1";
export default {
  getTaiXe,
  getTaiXeWithMaTX,
  chooseDonDatHang,
  undoDonDatHang,
  insertTaiXe,
  getDonDatHangOfTaiXe,
};
