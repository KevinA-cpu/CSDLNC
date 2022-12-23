const getChiTietHopDong = "SELECT * FROM ChiTietHopDong";
const getChiTietHopDongByMaHD = "SELECT * FROM ChiTietHopDong WHERE MaHD = @1";
const getChiTietHopDongByMaSoThue =
  "SELECT * FROM ChiTietHopDong WHERE MaSoThue = @1";
const getHopDongByMaHD = "SELECT * FROM HopDong WHERE MaHD = @1";
const insertChiTietHopDong =
  "INSERT INTO ChiTietHopDong(MaSoThue,MaDT,SoNamHoatDong,TrangThaiHoatDong,NgayKyHopDong,PhiKichHoat,MaHD) VALUES(@1,@2,@3,@4,@5,@6,@7)";
const getDoiTacByMaDT = "SELECT * FROM DoiTac WHERE MaDT = @1";
const getChiTietHopDongByMaDT = "SELECT * FROM ChiTietHopDong WHERE MaDT = @1 ";
export default {
  getChiTietHopDong,
  getChiTietHopDongByMaHD,
  getChiTietHopDongByMaSoThue,
  getHopDongByMaHD,
  insertChiTietHopDong,
  getDoiTacByMaDT,
  getChiTietHopDongByMaDT,
};
