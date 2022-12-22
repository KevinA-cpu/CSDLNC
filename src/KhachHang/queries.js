const getKhachHangByMaKH = "SELECT * FROM KhachHang WHERE MaKH = @1";
const insertKhachHang = "INSERT INTO KhachHang VALUES(@1, @2, @3, @4, @5)";
export default {
  getKhachHangByMaKH,
  insertKhachHang,
};
