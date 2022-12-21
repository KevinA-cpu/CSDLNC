const chooseDonDatHang =
  "UPDATE DonDatHang SET MaTX = @1, TrangThaiDH = N'Đã có tài xế nhận đơn' WHERE MaDH = @2";
const undoDonDatHang =
  "UPDATE DonDatHang SET MaTX = NULL, TrangThaiDH = NULL WHERE MaDH = @1 AND MaTX = @2";
export default {
  chooseDonDatHang,
};
