package com.example.backend.dto.request.sanphamupdate;

import com.example.backend.entity.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateCTSPRequest {

    public String sanPham;
    public String ghiChu;
    public int trangThai;
    public int soLuong;
    public String moTa;
    public BigDecimal giaBan;
    public String danhMuc;
    public String deGiay;
    public String hang;
    public String kichThuoc;
    public String mauSac;
    public String chatLieu;

    public ChiTietSanPham map(ChiTietSanPham ct){
        ct.setGhiChu(this.ghiChu);
        ct.setTrangThai(this.trangThai);
        ct.setSoLuong(this.soLuong);
        ct.setMoTa(this.moTa);
        ct.setGiaBan(this.giaBan);
        ct.setSanPham(SanPham.builder().id(this.sanPham).build());
        ct.setDanhMuc(DanhMuc.builder().id(this.danhMuc).build());
        ct.setDeGiay(DeGiay.builder().id(this.deGiay).build());
        ct.setHang(Hang.builder().id(this.hang).build());
        ct.setKichThuoc(KichThuoc.builder().id(this.kichThuoc).build());
        ct.setMauSac(MauSac.builder().id(this.mauSac).build());
        ct.setChatLieu(ChatLieu.builder().id(this.chatLieu).build());
        return ct;
    }
}
