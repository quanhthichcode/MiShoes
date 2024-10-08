package com.example.backend.entity;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Table(name = "hang")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder

public class Hang {
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
