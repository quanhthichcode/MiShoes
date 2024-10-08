package com.example.backend.dto.request.sanpham;


import com.example.backend.entity.DanhMuc;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DanhMucRequest {

    private String ma;

    private String ten;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private int trangThai;

    public DanhMuc mapDM(DanhMuc dm){
        dm.setMa(this.ma);
        dm.setTen(this.ten);
        dm.setNgayTao(this.ngayTao);
        dm.setNgaySua(this.ngaySua);
        dm.setNguoiTao(this.nguoiTao);
        dm.setNguoiSua(this.nguoiSua);
        dm.setTrangThai(this.trangThai);
        return dm;
    }
}
