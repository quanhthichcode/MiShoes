package com.example.backend.dto.request.sanphamsearch;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TimSanPhamTheoMang {
    String[] arraySanPham;
    String[] arrayMauSac;
    String[] arrayKichThuoc;
    int giaBatDau;
    int giaKetThuc;
}
