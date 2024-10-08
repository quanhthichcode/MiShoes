package com.example.backend.repository;

import com.example.backend.entity.CongThuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CongThucRepository extends JpaRepository<CongThuc,String> {
    CongThuc getCongThucByTrangThai(int trangThai);
}
