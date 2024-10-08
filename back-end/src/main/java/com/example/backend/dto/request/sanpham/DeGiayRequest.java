package com.example.backend.dto.request.sanpham;


import com.example.backend.entity.ChatLieu;
import com.example.backend.entity.DeGiay;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DeGiayRequest {
    private String ma;

    private String ten;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private int trangThai;

    public DeGiay mapDG(DeGiay dg){
        dg.setMa(this.ma);
        dg.setTen(this.ten);
        dg.setNgayTao(this.ngayTao);
        dg.setNgaySua(this.ngaySua);
        dg.setNguoiTao(this.nguoiTao);
        dg.setNguoiSua(this.nguoiSua);
        dg.setTrangThai(this.trangThai);
        return dg;
    }
}
