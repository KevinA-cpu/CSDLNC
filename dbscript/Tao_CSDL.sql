CREATE DATABASE GiaoDoAnABC
GO
USE GiaoDoAnABC
GO

--- TẠO BẢNG ---
CREATE TABLE KhachHang
(
	MaKH VARCHAR(8),
	HoTen NVARCHAR(30),
	DiaChi NVARCHAR(100),
	SDT CHAR(10),
	Email VARCHAR(30)

		CONSTRAINT PK_KhachHang PRIMARY KEY (MaKH)
)


CREATE TABLE TaiXe
(
	MaTX VARCHAR(8),
	HoTen NVARCHAR(30),
	CCCD CHAR(12),
	SDT CHAR(10),
	DiaChi NVARCHAR(100),
	BienSoXe VARCHAR(15),
	KhuVucHoatDong NVARCHAR(100),
	Email VARCHAR(30),
	STKNganHang VARCHAR(15),
	PhiTheChan MONEY

		CONSTRAINT PK_TaiXe PRIMARY KEY (MaTX)
)

CREATE TABLE DoiTac
(
	MaDT VARCHAR(8),
	TenQuan NVARCHAR(30),
	DiaChiKinhDoanh NVARCHAR(100),
	LoaiThucPham NVARCHAR(50),
	NguoiDaiDien NVARCHAR(30),
	ThanhPho NVARCHAR(30),
	Quan NVARCHAR(30),
	Huyen NVARCHAR(30),
	SoLuongChiNhanh INT,
	SoLuongDonHangMoiNgay INT,
	Email VARCHAR(30),
	TaiKhoanNganHang VARCHAR(30)

		CONSTRAINT PK_DoiTac PRIMARY KEY (MaDT)
)

CREATE TABLE DonDatHang
(
	MaDH VARCHAR(8),
	TongTienCacMon MONEY,
	TrangThaiDH NVARCHAR(25),
	DiaChiDH NVARCHAR(100),
	ThoiGianDatHang DATETIME2,
	TongTienDH MONEY,
	MaKH VARCHAR(8),
	MaTX VARCHAR(8),
	MaDT VARCHAR(8)

		CONSTRAINT PK_DonDatHang PRIMARY KEY (MaDH)
)

CREATE TABLE Feedback
(
	MaKH VARCHAR(8),
	MaDT VARCHAR(8),
	TenQuan NVARCHAR(30),
	DiaChiKinhDoanh NVARCHAR(100),
	ThongTinFeedback NVARCHAR(500)
)

CREATE TABLE DonHang_MonAn
(
	MaDH VARCHAR(8),
	TenMon NVARCHAR(30),
	DonGia Money,
	SoLuong INT
)

CREATE TABLE MonAn
(
	TenMon NVARCHAR(30),
	DonGia MONEY,
	TinhTrangMon NVARCHAR(25),
	SoLuongDaBan INT,
	SoLike INT,
	SoDislike INT

		CONSTRAINT PK_MonAn PRIMARY KEY (TenMon)
)

CREATE TABLE TuyChonMonAn
(
	TenMon NVARCHAR(30),
	TuyChon NVARCHAR(500)
)

CREATE TABLE ThucDon
(
	MaDT VARCHAR(8),
	TenMon NVARCHAR(30)
)

CREATE TABLE ChiTietHopDong
(
	MaSoThue NVARCHAR(13),
	MaDT VARCHAR(8),
	SoNamHoatDong INT,
	TrangThaiHoatDong NVARCHAR(25),
	NgayKyHopDong DATE,
	PhiKichHoat MONEY

		CONSTRAINT PK_ChiTietHopDong PRIMARY KEY (MaSoThue)
)

CREATE TABLE HopDong
(
	MaSoThue NVARCHAR(13),
	MaHD VARCHAR(8),
	SoChiNhanhDangKy INT,
	DiaChiDangKyCacChiNhanh NVARCHAR(100),
	STK VARCHAR(15),
	NganHang NVARCHAR(50),
	ChiNhanhNganHang NVARCHAR(100)

		CONSTRAINT PK_HopDong PRIMARY KEY (MaHD)
)

CREATE TABLE PhiHoaHong
(
	MaDT VARCHAR(8),
	DoanhSo MONEY,
	NgayThang DATE
)

CREATE TABLE HeThongOnline
(
	MaDT VARCHAR(8),
	ThanhPho NVARCHAR(30),
	Quan NVARCHAR(30),
	Huyen NVARCHAR(30),
	TrangThaiHoatDong NVARCHAR(30),
	ThoiGianHoatDong VARCHAR(20)
)





--- TẠO KHÓA NGOẠI ---

-- TABLE DonDatHang -- 
-- DonDatHang(MaKH) -> KhachHang(MaKH)
ALTER TABLE DonDatHang
ADD CONSTRAINT FK_DonDatHang_KhachHang FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
-- DonDatHang(MaTX) -> TaiXe(MaTX)
ALTER TABLE DonDatHang
ADD CONSTRAINT FK_DonDatHang_TaiXe FOREIGN KEY (MaTX) REFERENCES TaiXe(MaTX)
-- DonDatHang(MaDT) -> DoiTac(MaDT)
ALTER TABLE DonDatHang
ADD CONSTRAINT FK_DonDatHang_DoiTac FOREIGN KEY (MaDT) REFERENCES DoiTac(MaDT)

-- TABLE Feedback -- 
-- Feedback(MaKH) -> KhachHang(MaKH)
ALTER TABLE Feedback
ADD CONSTRAINT FK_Feedback_KhachHang FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
-- Feedback(MaDT) -> DoiTac(MaDT)
ALTER TABLE Feedback
ADD CONSTRAINT FK_Feedback_DoiTac FOREIGN KEY (MaDT) REFERENCES DoiTac(MaDT)

-- TABLE DonHang_MonAn --
-- DonHang_MonAn(MaDH) -> DonDatHang(MaDH)
ALTER TABLE DonHang_MonAn
ADD CONSTRAINT FK_DonHang_MonAn_DonDatHang FOREIGN KEY (MaDH) REFERENCES DonDatHang(MaDH)
-- DonHang_MonAn(TenMon) -> MonAn(TenMon)
ALTER TABLE DonHang_MonAn
ADD CONSTRAINT FK_DonHang_MonAn_MonAn FOREIGN KEY (TenMon) REFERENCES MonAn(TenMon)

-- TABLE TuyChonMonAn --
-- TuyChonMonAn(TenMon) -> MonAn(TenMon)
ALTER TABLE TuyChonMonAn
ADD CONSTRAINT FK_TuyChonMonAn_MonAn FOREIGN KEY (TenMon) REFERENCES MonAn(TenMon)

-- TABLE ThucDon -- 
-- ThucDon(MaDT) -> DoiTac(MaDT)
ALTER TABLE ThucDon
ADD CONSTRAINT FK_ThucDon_DoiTac FOREIGN KEY (MaDT) REFERENCES DoiTac(MaDT)
-- ThucDon(MonAn) -> MonAn(TenMon)
ALTER TABLE ThucDon
ADD CONSTRAINT FK_ThucDon_MonAn FOREIGN KEY (TenMon) REFERENCES MonAn(TenMon)

-- TABLE ChiTietHopDong -- 
-- ChiTietHopDong(MaDT) -> DoiTac(MaDT)
ALTER TABLE ChiTietHopDong
ADD CONSTRAINT FK_ChiTietHopDong_DoiTac FOREIGN KEY (MaDT) REFERENCES DoiTac(MaDT)

-- TABLE HopDong --
-- HopDong(MaSoThue) -> ChiTietHopDong(MaSoThue)
ALTER TABLE HopDong
ADD CONSTRAINT FK_HopDong_ChiTietHopDong FOREIGN KEY (MaSoThue) REFERENCES ChiTietHopDong(MaSoThue)

-- TABLE PhiHoaHong -- 
-- PhiHoaHong(MaDT) -> DoiTac(MaDT)
ALTER TABLE PhiHoaHong
ADD CONSTRAINT FK_PhiHoaHong_DoiTac FOREIGN KEY (MaDT) REFERENCES DoiTac(MaDT)

-- TABLE HeThongOnline -- 
-- HeThongOnline(MaDT) -> DoiTac(MaDT)
ALTER TABLE HeThongOnline
ADD CONSTRAINT FK_HeThongOnline_DoiTac FOREIGN KEY (MaDT) REFERENCES DoiTac(MaDT)

--- TẠO INDEX ---
CREATE INDEX IX_DonDatHangForeignKeys ON DonDatHang (MaKH, MaTX, MaDT)

CREATE INDEX IX_FeedBackForeingKeys ON Feedback (MaKH, MaDT)

CREATE INDEX IX_DonHang_MonAnForeignKeys ON DonHang_MonAn (MaDH, TenMon)

CREATE INDEX IX_TuyChonMonAnForeignKeys ON TuyChonMonAn (TenMon)

CREATE INDEX IX_ThucDonForeignKeys ON ThucDon (MaDT, TenMon)

CREATE INDEX IX_ChiTietHopDongForeignKeys ON ChiTietHopDong(MaDT)

CREATE INDEX IX_HopDongForeignKeys ON HopDong (MaSoThue)

CREATE INDEX IX_PhiHoaHong ON PhiHoaHong (MaDT)

CREATE INDEX IX_HeThongOnline ON HeThongOnline (MaDT)