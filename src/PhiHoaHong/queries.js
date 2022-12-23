const getPhiHoaHong = "select TOP 20 * from PhiHoaHong";
const getPhiHoaHongByID = "select * from PhiHoaHong where MaDT = @1";
const updatePhiHoaHong = "update PhiHoaHong set DoanhSo = @1,NgayThang=@2 where MaDT = @3"

export default {
    getPhiHoaHong,
    getPhiHoaHongByID,
    updatePhiHoaHong
}