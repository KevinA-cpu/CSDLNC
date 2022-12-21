const getHeThongOnline = "SELECT TOP 20 * FROM HeThongOnline";
const getHeThongOnlineWithThreeParams =
  "SELECT * FROM HeThongOnline WHERE MaDT = @1 AND ThanhPho = @2 AND Quan_Huyen = @3";
const updateHeThongOnline =
  "UPDATE HeThongOnline SET ThanhPho = @1, Quan_Huyen = @2, TrangThaiHoatDong = @3, ThoiGianHoatDong = @4 WHERE MaDT = @5 AND ThanhPho = @6 AND Quan_Huyen = @7";

export default {
  getHeThongOnline,
  getHeThongOnlineWithThreeParams,
  updateHeThongOnline,
};
