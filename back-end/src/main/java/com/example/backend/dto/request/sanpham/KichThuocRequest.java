package com.example.backend.dto.request.sanpham;


import com.example.backend.entity.DeGiay;
import com.example.backend.entity.KichThuoc;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KichThuocRequest {
    private String ma;

    private String ten;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private int trangThai;

    public KichThuoc mapKT(KichThuoc kt){
        kt.setMa(this.ma);
        kt.setTen(this.ten);
        kt.setNgayTao(this.ngayTao);
        kt.setNgaySua(this.ngaySua);
        kt.setNguoiTao(this.nguoiTao);
        kt.setNguoiSua(this.nguoiSua);
        kt.setTrangThai(this.trangThai);
        return kt;
    }
}
