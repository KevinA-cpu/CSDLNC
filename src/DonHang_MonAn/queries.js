const getDonHang_MonAn = "SELECT TOP 20 * FROM DonHang_MonAn";
const getDonHang_MonAnByMaDH = "SELECT * FROM DonHang_MonAn WHERE MaDH = @1";
const getDonHang_MonAnByMaDT = "SELECT * FROM DonHang_MonAn WHERE MaDT = @1";
const insertDonHang_MonAn = "INSERT INTO DonHang_MonAn VALUES(@1, @2, @3, @4)";
const deleteDonHang_MonAn =
  "DELETE FROM DonHang_MonAn WHERE MaDH = @1 AND TenMon = @2";
export default {
  getDonHang_MonAn,
  getDonHang_MonAnByMaDH,
  getDonHang_MonAnByMaDT,
  insertDonHang_MonAn,
  deleteDonHang_MonAn,
};
