package com.example.backend.dto.request.sanpham;

import com.example.backend.entity.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ChiTietSanPhamRequest {
    private String id;
    private String ghiChu;
    private String tenCt;
    public String sanPham;
    public String kichThuoc;
    public String mauSac;
    public String chatLieu;
    public String deGiay;
    public String danhMuc;
    public String hang;
    public boolean gioiTinh;
    public BigDecimal giaBan;
    public BigDecimal giaNhap;
    public String qrCode;
    public String moTa;
    public int soLuong;
    public LocalDateTime ngayTao;
    public LocalDateTime ngaySua;
    public String nguoiTao;
    public String nguoiSua;
    public int trangThai;

    public ChiTietSanPham map(ChiTietSanPham ctsp){
        ctsp.setId(this.id);
        ctsp.setSanPham(SanPham.builder().id(this.sanPham).build());
        ctsp.setKichThuoc(KichThuoc.builder().id(this.kichThuoc).build());
        ctsp.setMauSac(MauSac.builder().id(this.mauSac).build());
        ctsp.setChatLieu(ChatLieu.builder().id(this.chatLieu).build());
        ctsp.setDeGiay(DeGiay.builder().id(this.deGiay).build());
        ctsp.setDanhMuc(DanhMuc.builder().id(this.danhMuc).build());
        ctsp.setHang(Hang.builder().id(this.hang).build());
        ctsp.setGioiTinh(this.gioiTinh);
        ctsp.setGiaBan(this.giaBan);
        ctsp.setGiaNhap(this.giaNhap);
        ctsp.setQrCode(this.qrCode);
        ctsp.setMoTa(this.moTa);
        ctsp.setSoLuong(this.soLuong);
        ctsp.setNgayTao(this.ngayTao);
        ctsp.setNgaySua(this.ngaySua);
        ctsp.setNguoiTao(this.nguoiTao);
        ctsp.setNguoiSua(this.nguoiSua);
        ctsp.setTrangThai(this.trangThai);
        ctsp.setGhiChu(this.ghiChu);
        ctsp.setTenCt(this.tenCt);
        return ctsp;
    }
}
