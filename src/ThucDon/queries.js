const getThucDon = "select * from ThucDon";
const getThuCDonByMaDT = 
"select td.TenMon,ma.DonGia,ma.TinhTrangMon,ma.SoLuongDaBan,ma.SoLike,ma.SoDislike from ThucDon td,MonAn ma where td.MaDT = @1 and ma.TenMon = td.TenMon";
const getDoiTacByID = "select * from DoiTac where MaDT = @1";
const insertThucDon = "insert into ThucDon(MaDT,TenMon) values(@1,@2);"
const updateThucDon = "update ThucDon set TenMon = @1 where TenMon = @2 and MaDT = @3";
const deleteThucDon = "delete from ThucDon where MaDT = @1 and TenMon = @2";
export default { 
    getThucDon,
    getThuCDonByMaDT,
    getDoiTacByID,
    insertThucDon,
    updateThucDon,
    deleteThucDon
}