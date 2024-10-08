package com.example.backend.repository;

import com.example.backend.dto.response.LichSuThanhToanRespon;
import com.example.backend.entity.ThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThanhToanRepository extends JpaRepository<ThanhToan, String> {

    @Query(
            value = """
        select  id,hoa_don_id,CASE WHEN phuong_thuc_vnp IS NULL THEN N''ELSE phuong_thuc_vnp END  as maVNP,tong_tien as tongTien,ngay_tao as ngayTao,phuong_thuc as phuongThuc,
        mo_ta as moTa,nguoi_tao as nguoiTao from  duanmishoes.thanh_toan where hoa_don_id=:idHD         
                    
                    """, nativeQuery = true
    )
    List<LichSuThanhToanRespon> getALLLLichSuThanhToanByIDHD(@Param("idHD") String idHD);
    @Query(
            value = """
     SELECT * FROM duanmishoes.thanh_toan where hoa_don_id=:idHD
                    """, nativeQuery = true
    )
    List<ThanhToan> getThanhToanByIdHD(String idHD);

    @Query(value = "select * from thanh_toan where hoa_don_id=:idHD && phuong_thuc=:phuongThuc",nativeQuery = true)
    ThanhToan getTT(String idHD,int phuongThuc);
}
