package com.example.backend.dto.response.SanPhamClient;

import org.springframework.beans.factory.annotation.Value;

public interface ListMauSacBySPClientRespon {
    @Value("#{target.mauSacID}")
    String getMauSacID();
    @Value("#{target.maMau}")
    String getMaMau();
}
