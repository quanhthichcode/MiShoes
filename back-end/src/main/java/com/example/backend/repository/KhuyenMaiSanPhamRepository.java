package com.example.backend.repository;

import com.example.backend.entity.KhuyenMaiSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KhuyenMaiSanPhamRepository extends JpaRepository<KhuyenMaiSanPham,String> {
    @Query(value = "select chi_tiet_sp_id from chitietsp_khuyenmai where khuyen_mai_id =:id",nativeQuery = true)
    List<String> getAllProductByPromotion(String id);

    @Query(value = "select * from chitietsp_khuyenmai where khuyen_mai_id =:idKM and chi_tiet_san_pham_id =:idCTSP",nativeQuery = true)
    KhuyenMaiSanPham findKhuyenMaiSanPham(String idKM,String idCTSP);

    @Query(value ="select * from chitietsp_khuyenmai",nativeQuery = true)
    List<KhuyenMaiSanPham> getAll();
}
