package com.example.backend.dto.request;


import com.example.backend.entity.HoaDon;
import com.example.backend.entity.NguoiDung;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@ToString
public class HoaDonRequest {
   // String id;
    String ma;
    String nhanVien;
    String nguoiDung;
    LocalDateTime ngayMua;
    BigDecimal giaGoc;
    BigDecimal giaGiamGia;
    BigDecimal thanhTien;
    BigDecimal tienVanChuyen;
    int diemSuDung;
    int giaTriDiem;
    int loaiHoaDon;
    String tenNguoiNhan;
    String soDienThoai;
    String email;
    String diaChi;
    String qrCode;
    String ghiChu;
    Date ngayDuKienNhan;
    Date ngayNhanHang;
    Date ngayTraHang;
    String nguoiTao;
    String nguoiSua;
    LocalDateTime ngayTao;
    LocalDateTime ngaySua;
    int trangThai;
    int stt;
    String key;
    public HoaDon map(HoaDon hoaDon) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        //hoaDon.setId(this.id);
        hoaDon.setMa(this.ma);
        hoaDon.setNhanVien(this.nhanVien);
        hoaDon.setNgayMua(this.ngayMua);
        hoaDon.setGiaGoc(this.giaGoc);
        hoaDon.setGiaGiamGia(this.giaGiamGia);
        hoaDon.setThanhTien(this.thanhTien);
        hoaDon.setDiemSuDung(this.diemSuDung);
        hoaDon.setLoaiHoaDon(this.loaiHoaDon);
        hoaDon.setTenNguoiNhan(this.tenNguoiNhan);
        hoaDon.setSoDienThoai(this.soDienThoai);
        hoaDon.setEmail(this.email);
        hoaDon.setDiaChi(this.diaChi);
        hoaDon.setQrCode(this.qrCode);
        hoaDon.setGhiChu(this.ghiChu);
        hoaDon.setNgayNhanHang(this.ngayNhanHang);
        hoaDon.setNgayTraHang(this.ngayTraHang);
        hoaDon.setNguoiTao(this.nguoiTao);
        hoaDon.setNguoiSua(this.nguoiSua);
        hoaDon.setNgayTao(this.ngayTao);
        hoaDon.setNgaySua(this.ngaySua);
        hoaDon.setTrangThai(this.trangThai);
        hoaDon.setNgayDuKienNhan(this.ngayDuKienNhan);
        hoaDon.setTienVanChuyen(this.tienVanChuyen);
        if (this.nguoiDung == null) {
            hoaDon.setNguoiDung(null);
        } else {
            hoaDon.setNguoiDung(NguoiDung.builder().id(this.nguoiDung).build());
        }
        return hoaDon;
    }
}
