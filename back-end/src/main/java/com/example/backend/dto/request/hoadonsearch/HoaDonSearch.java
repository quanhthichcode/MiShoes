package com.example.backend.dto.request.hoadonsearch;

import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class HoaDonSearch {
    String tenHD;
    int loaiHD;
    Date ngayBDHD;
    Date ngayKTHD;
}
