package com.example.backend.dto.request.sanpham;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class AddRequest {
    private ChiTietSanPhamRequest chiTiet;
    private HinhAnhRequest hinh;
}
