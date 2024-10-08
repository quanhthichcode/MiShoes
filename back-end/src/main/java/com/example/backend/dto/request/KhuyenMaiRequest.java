package com.example.backend.dto.request;


import com.example.backend.entity.KhuyenMai;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class KhuyenMaiRequest {
    private String ma;
    private String ten;
    private BigDecimal gia_tri_khuyen_mai;
    private LocalDateTime ngay_bat_dau;
    private LocalDateTime ngay_ket_thuc;
    private String loai;
    private String nguoiTao;
    private String nguoiSua;
    private Date ngayTao;
    private Date ngaySua;
    private Integer trangThai;

    public KhuyenMai map(){
        KhuyenMai km = new KhuyenMai();
        km.setMa(this.getMa());
        km.setTen(this.getTen());
        km.setGia_tri_khuyen_mai(this.getGia_tri_khuyen_mai());
        km.setNgay_bat_dau(this.getNgay_bat_dau());
        km.setNgay_ket_thuc(this.getNgay_ket_thuc());
        km.setLoai(this.getLoai());
        km.setNguoiTao(this.getNguoiTao());
        km.setNguoiSua(this.getNguoiSua());
        km.setNgayTao(this.getNgayTao());
        km.setNgaySua(this.getNgaySua());
        km.setTrangThai(this.getTrangThai());
        return  km;
    }
}
