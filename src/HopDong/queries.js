const getHopDong = "SELECT * FROM HopDong";
const getHopDongByID = "SELECT * FROM HopDong WHERE MaHD = @1;";
const insertHopDong = "INSERT INTO HopDong(MaHD,SoChiNhanhDangKy,DiaChiDangKyCacChiNhanh,STK,NganHang,ChiNhanhNganHang) VALUES(@1,@2,@3,@4,@5,@6)";
const updateHopDong = "UPDATE HopDong SET STK = @1 WHERE MaHD = @2";
const deleteHopDong = "DELETE FROM HopDong WHERE MaHD = @1";
export default {
    getHopDong,
    getHopDongByID,
    insertHopDong,
    updateHopDong,
    deleteHopDong
}