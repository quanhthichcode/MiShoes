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

public class AddAnhRequest {
    private String ma;
    private String ten;
    private String url;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private String nguoiTao;
    private String nguoiSua;
    private int trangThai;

    public HinhAnh map(HinhAnh ha){
        ha.setMa(this.ma);
        ha.setTen(this.ten);
        ha.setUrl(this.url);
        ha.setNgayTao(this.ngayTao);
        ha.setNgaySua(this.ngaySua);
        ha.setNguoiTao(this.nguoiTao);
        ha.setNguoiSua(this.nguoiSua);
        return ha;
    }
}
