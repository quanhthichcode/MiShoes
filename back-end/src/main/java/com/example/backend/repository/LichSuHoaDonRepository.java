package com.example.backend.repository;


import com.example.backend.dto.response.AdminHoaDonTimeLineRes;
import com.example.backend.dto.response.AdminHoaDonTimeLineRespon;
import com.example.backend.entity.LichSuHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuHoaDonRepository extends JpaRepository<LichSuHoaDon, String> {
 @Query(value = """
SELECT mo_ta_hoat_dong AS moTaHoatDong,trang_thai AS trangThai,nguoi_tao AS nguoiTao,ngay_tao AS ngayTao
 FROM duanmishoes.lich_su_hoa_don WHERE  hoa_don_id=:idHD ORDER BY ngayTao ASC""",nativeQuery = true)
 List<AdminHoaDonTimeLineRespon> detailLichSuHoaDon(String  idHD);
 @Query(value = """
  SELECT ngay_tao AS hdTimeLine,trang_thai AS trangThai FROM  duanmishoes.lich_su_hoa_don WHERE 
  hoa_don_id=:idHD ORDER BY trangThai ASC""",nativeQuery = true)
 List<AdminHoaDonTimeLineRes> HoaDonTimeLine(String idHD);
}
