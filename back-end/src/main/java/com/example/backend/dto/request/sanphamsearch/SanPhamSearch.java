package com.example.backend.dto.request.sanphamsearch;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SanPhamSearch {
    String ten;
    String trangThai;
    int soLuong;
}
