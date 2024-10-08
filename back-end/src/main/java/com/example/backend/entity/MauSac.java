package com.example.backend.entity;

import com.example.backend.util.Status;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "mau_sac")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class MauSac {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String ma;
    private String ten;

    private LocalDateTime ngayTao;

    private LocalDateTime ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private int trangThai;
}

