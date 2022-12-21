const getThucDon = "select * from ThucDon";
const getThuCDonByMaDT = "select * from ThucDon where MaDT = @1";
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