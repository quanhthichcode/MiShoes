package com.example.backend.repository;

import com.example.backend.dto.request.KhuyenMaiSearch;
import com.example.backend.dto.response.AdminKhuyenMai;
import com.example.backend.model.AdminKhuyenMaiRespon;
import com.example.backend.entity.KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai,String> {

@Query(value = "select khuyen_mai.id as idKM , khuyen_mai.ma as maKM, khuyen_mai.ten as tenKM , khuyen_mai.khuyen_mai_toi_da as ToiDaKM, \n" +
        "khuyen_mai.ngay_bat_dau as ngayBD , khuyen_mai.ngay_ket_thuc as ngayKT , khuyen_mai.loai as loaiKM , \n" +
        "khuyen_mai.trang_thai as trangThai , khuyen_mai.nguoi_tao as nguoiTao , khuyen_mai.nguoi_sua as nguoiSua,\n" +
        "khuyen_mai.ngay_tao as ngayTao , khuyen_mai.ngay_sua as ngaySua , chi_tiet_san_pham.id as idCTSP\n" +
        "from khuyen_mai join chi_tiet_san_pham on khuyen_mai.id = chi_tiet_san_pham.khuyen_mai_id order by khuyen_mai.ma DESC",nativeQuery = true)
    public List<AdminKhuyenMaiRespon > getAll();

    @Query(value = """
            SELECT id , ma , ten  , gia_tri_khuyen_mai  , 
                    ngay_bat_dau   , ngay_ket_thuc  , loai  , 
                    nguoi_tao   , nguoi_sua  ,
                    ngay_tao   , ngay_sua   ,trang_thai  as trangThai  from khuyen_mai  WHERE
                    (:#{#khuyenMaiSearch.ten} IS NULL OR khuyen_mai.ten LIKE (%:#{#khuyenMaiSearch.ten}%)) AND 
                    (:#{#khuyenMaiSearch.ma} IS NULL OR khuyen_mai.ma LIKE (%:#{#khuyenMaiSearch.ma}%)) AND 
                    (:#{#khuyenMaiSearch.gia_tri_khuyen_mai} IS NULL OR khuyen_mai.gia_tri_khuyen_mai LIKE (%:#{#khuyenMaiSearch.gia_tri_khuyen_mai}%)) AND
                    (:#{#khuyenMaiSearch.loai} IS NULL OR khuyen_mai.loai LIKE  (%:#{#khuyenMaiSearch.loai}%)) AND 
                    ((:#{#khuyenMaiSearch.ngay_bat_dau} IS NULL AND :#{#khuyenMaiSearch.ngay_ket_thuc} IS NULL) OR 
                    (:#{#khuyenMaiSearch.ngay_bat_dau} IS NULL AND khuyen_mai.ngay_ket_thuc <= :#{#khuyenMaiSearch.ngay_ket_thuc}) OR 
                    (:#{#khuyenMaiSearch.ngay_ket_thuc} IS NULL AND khuyen_mai.ngay_bat_dau >= :#{#khuyenMaiSearch.ngay_bat_dau}) OR 
                    (khuyen_mai.ngay_bat_dau BETWEEN :#{#khuyenMaiSearch.ngay_bat_dau} AND :#{#khuyenMaiSearch.ngay_ket_thuc}) OR
                    (khuyen_mai.ngay_ket_thuc BETWEEN :#{#khuyenMaiSearch.ngay_bat_dau} AND :#{#khuyenMaiSearch.ngay_ket_thuc})) 
                    """,nativeQuery = true)
    List<AdminKhuyenMai> searchKhuyenMai(KhuyenMaiSearch khuyenMaiSearch);
}

