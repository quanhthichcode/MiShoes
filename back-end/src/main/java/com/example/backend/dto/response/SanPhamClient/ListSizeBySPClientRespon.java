package com.example.backend.dto.response.SanPhamClient;

import org.springframework.beans.factory.annotation.Value;

public interface ListSizeBySPClientRespon {
    @Value("#{target.kichThuocID}")
    String getKichThuocID();
    @Value("#{target.tenKichThuoc}")
    String getTenKichThuoc();
}
