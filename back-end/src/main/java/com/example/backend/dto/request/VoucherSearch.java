package com.example.backend.dto.request;

import com.example.backend.util.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VoucherSearch {
    String ten;
//    @Enumerated(EnumType.STRING)
    String trangThai;
    String loaiVoucher;
    Date ngayBatDau;
    Date ngayKetThuc;

}
