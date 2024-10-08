package com.example.backend.repository;

import com.example.backend.dto.response.DiaChiKHResponse;
import com.example.backend.dto.response.DiaChiKhachHangRespon;
import com.example.backend.dto.response.DiaChiRespone;
import com.example.backend.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DiaChiRepository extends JpaRepository<DiaChi, String> {
    @Query(value = "SELECT * FROM dia_chi a WHERE a.trang_thai = 0 AND a.nguoi_dung_id =:id",nativeQuery = true)
    DiaChi findByUserAndStatus (@Param("id") String user);
    @Query(value = "SELECT id , nguoi_dung_id as nguoiDung,id_thanh_pho as idThanhPho,id_huyen as idHuyen,id_xa as idXa, ten_nguoi_nhan as tenNguoiNhan, so_dien_thoai as soDienThoai,dia_chi as diaChi,ten_xa as tenXa,ten_huyen as tenHuyen,ten_thanh_pho as tenThanhPho, trang_thai as trangThai from dia_chi where nguoi_dung_id =:id",nativeQuery = true)
    List<DiaChiKhachHangRespon> findDiaChiByKH (@Param("id") String user);


    @Query(value = "select dia_chi.ten_nguoi_nhan as tenNguoiNhan," +
            "dia_chi.so_dien_thoai as soDienThoai," +
            "dia_chi.ten_thanh_pho as tenThanhPho , " +
            "dia_chi.ten_huyen as tenHuyen," +
            "dia_chi.ten_xa as tenXa," +
            "dia_chi.dia_chi as diaChi," +
            "nguoi_dung.email as email," +
            "dia_chi.trang_thai as trangThai," +
            "dia_chi.id_thanh_pho as idThanhPho," +
            "dia_chi.id_huyen as idHuyen," +
            "dia_chi.id_xa as idXa from dia_chi left join nguoi_dung on dia_chi.nguoi_dung_id = nguoi_dung.id where dia_chi.nguoi_dung_id=:id and dia_chi.trang_thai = 0",nativeQuery = true)
    List<DiaChiKHResponse> getAllDiachiByIDKH (String id );

        @Query(value = "SELECT id , nguoi_dung_id as nguoiDung,id_thanh_pho as idThanhPho,id_huyen as idHuyen,id_xa as idXa, ten_nguoi_nhan as tenNguoiNhan, so_dien_thoai as soDienThoai,dia_chi as diaChi,ten_xa as tenXa,ten_huyen as tenHuyen,ten_thanh_pho as tenThanhPho, trang_thai as trangThai from dia_chi where nguoi_dung_id =:id and trang_thai=0",nativeQuery = true)
    DiaChiKhachHangRespon findDiaChiMacDinh (@Param("id") String user);

    @Query("select u from DiaChi u where u.nguoiDung.id =:id and u.trangThai =0")
    DiaChi findDiaChiByIdUserAndTrangThai(String id);

}
