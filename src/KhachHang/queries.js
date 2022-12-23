const getKhachHangByMaKH = "SELECT * FROM KhachHang WHERE MaKH = @1";
const insertKhachHang = "INSERT INTO KhachHang VALUES(@1, @2, @3, @4, @5)";
const insertDonDatHang =
  "INSERT INTO DonDatHang VALUES(@1, @2, @3, @4, @5, @6, @7, @8, @9)";
export default {
  getKhachHangByMaKH,
  insertKhachHang,
  insertDonDatHang
};
