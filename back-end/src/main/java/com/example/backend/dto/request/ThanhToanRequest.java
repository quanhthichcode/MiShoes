package com.example.backend.dto.request;


import com.example.backend.entity.HoaDon;
import com.example.backend.entity.ThanhToan;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ThanhToanRequest {
    private String id;
    private String hoaDon;
    private int phuongThuc;
    private BigDecimal tienMat;
    private BigDecimal chuyenKhoan;
    private BigDecimal tongTien;
    private String phuongThucVnp;
    private String moTa;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;
    public ThanhToan map(ThanhToan thanhToan){
        thanhToan.setId(this.id);
        thanhToan.setHoaDon(HoaDon.builder().id(this.hoaDon).build());
        thanhToan.setPhuongThuc(this.phuongThuc);
        thanhToan.setTienMat(this.tienMat);
        thanhToan.setChuyenKhoan(this.chuyenKhoan);
        thanhToan.setTongTien(this.tongTien);
        thanhToan.setPhuongThucVnp(this.phuongThucVnp);
        thanhToan.setMoTa(this.moTa);
        thanhToan.setNgayTao(this.ngayTao);
        thanhToan.setNgaySua(this.ngaySua);
        thanhToan.setTrangThai(this.trangThai);
        thanhToan.setNguoiTao(this.nguoiTao);
        return thanhToan;
    }
}
