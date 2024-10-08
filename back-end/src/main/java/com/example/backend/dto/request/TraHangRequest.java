package com.example.backend.dto.request;

import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.TraHang;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TraHangRequest {
    private String id;
    private String idHDCT;
    private String idCTSP;
    private int soLuong;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private String ghiChu;
    private int trangThai;

    public TraHang map(TraHang traHang){
        traHang.setId(this.id);
        traHang.setChiTietSanPham(ChiTietSanPham.builder().id(this.idCTSP).build());
        traHang.setSoLuong(this.soLuong);
        traHang.setNgayTao(this.ngayTao);
        traHang.setNgaySua(this.ngaySua);
        traHang.setNguoiTao(this.nguoiTao);
        traHang.setNguoiSua(this.nguoiSua);
        traHang.setGhiChu(this.ghiChu);
        traHang.setTrangThai(this.trangThai);
        return traHang;
    }
}
