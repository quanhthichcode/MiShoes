package com.example.backend.dto.request.sanpham;


import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.HinhAnh;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class HinhAnhRequest {

    private String ma;
    private String chiTietSanPham;
    private String ten;
    private String url;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;

    public HinhAnh map(HinhAnh ha){
        ha.setMa(this.ma);
        ha.setChiTietSanPham(ChiTietSanPham.builder().id(this.chiTietSanPham).build());
        ha.setTen(this.ten);
        ha.setUrl(this.url);
        ha.setNgayTao(this.ngayTao);
        ha.setNgaySua(this.ngaySua);
        ha.setNguoiTao(this.nguoiTao);
        ha.setNguoiSua(this.nguoiSua);
        return ha;
    }
}
