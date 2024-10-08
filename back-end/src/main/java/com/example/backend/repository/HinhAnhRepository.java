package com.example.backend.repository;

import com.example.backend.entity.HinhAnh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HinhAnhRepository extends JpaRepository<HinhAnh,String> {
    List<HinhAnh> findHinhAnhsByTenOrderByNgayTaoDesc(String ten);
}
