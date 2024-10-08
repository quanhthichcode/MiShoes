package com.example.backend.dto.request;


import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.entity.Voucher;
import com.example.backend.util.Status;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NguoiDungVoucherRequest {
    private String id;
    private String voucher;
    private String nguoiDung;
    private String nguoiTao;
    private String nguoiSua;
    private LocalDateTime ngayTao;
    private LocalDateTime ngaySua;
    private Status trangThai;
    public NguoiDungVoucher map(NguoiDungVoucher n){
        n.setId(this.id);
        n.setVoucher(Voucher.builder().id(this.voucher).build());
        n.setNguoiDung(NguoiDung.builder().id(this.nguoiDung).build());
        n.setNguoiTao(this.nguoiTao);
        n.setNguoiSua(this.nguoiSua);
        n.setNgayTao(this.ngayTao);
        n.setNgaySua(this.ngaySua);
        n.setTrangThai(this.trangThai);
        return n;
    }
}
