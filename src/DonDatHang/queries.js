const getDonDatHang = "SELECT TOP 20 * FROM DonDatHang";
const getDonDatHangByMaDH = "SELECT * FROM DonDatHang WHERE MaDH = @1";
const insertDonDatHang =
  "INSERT INTO DonDatHang VALUES(@1, @2, @3, @4, @5, @6, @7, @8, @9)";
const deleteDonDatHang = "DELETE FROM DonDatHang WHERE MaDH = @1";
export default {
  getDonDatHang,
  getDonDatHangByMaDH,
  insertDonDatHang,
  deleteDonDatHang,
};
