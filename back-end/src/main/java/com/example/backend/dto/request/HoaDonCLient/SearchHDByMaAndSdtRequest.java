package com.example.backend.dto.request.HoaDonCLient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchHDByMaAndSdtRequest {
    private String ma;
    private String sdt;
}
