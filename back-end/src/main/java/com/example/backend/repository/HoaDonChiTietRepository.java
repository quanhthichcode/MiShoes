package com.example.backend.repository;

import com.example.backend.dto.response.HoaDonChiTietBanHangRespone;
import com.example.backend.dto.response.HoaDonChiTietRespone;
import com.example.backend.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, String> {
    @Query(value = "SELECT hdct.id as idHDCT, hdct.hoa_don_id as idHD,hdct.chi_tiet_san_pham_id as idCTSP,hdct.so_luong as soLuong,\n" +
            "hdct.gia_giam as giaGiam,hdct.gia_sau_giam as giaSauGiam,hdct.ngay_tao as ngayTao,hdct.ngay_sua as ngaySua,\n" +
            "hdct.trang_thai as trangThai , (select ten from mau_sac where mau_sac.id = ctsp.mau_sac_id) as tenMS,\n" +
            "(select ma from mau_sac where mau_sac.id = ctsp.mau_sac_id) as maMS,\n" +
            "(select ten from kich_thuoc where kich_thuoc.id = ctsp.kich_thuoc_id) as tenKT,\n" +
            "ctsp.ghi_chu as linkAnh, (select ten from san_pham where san_pham.id = ctsp.san_pham_id) as tenSP,\n" +
            "(select loai from khuyen_mai where khuyen_mai.id = ctsp.khuyen_mai_id) as loaiKM , \n" +
            "(select ten from khuyen_mai where khuyen_mai.id = ctsp.khuyen_mai_id) as tenKM,\n" +
            "(select ma from hoa_don where hoa_don.id = hdct.hoa_don_id) as maHD,\n" +
            "(select gia_tri_khuyen_mai from khuyen_mai where khuyen_mai.id = ctsp.khuyen_mai_id) as giaTriKhuyenMai\n" +
            "FROM hoa_don_chi_tiet hdct LEFT JOIN chi_tiet_san_pham ctsp ON hdct.chi_tiet_san_pham_id = ctsp.id where hoa_don_id =:id ",nativeQuery = true)
    List<HoaDonChiTietBanHangRespone> getAllHDCTByHD(String id);
    List<HoaDonChiTiet> findHoaDonChiTietByHoaDon_Id(String id);
    @Query(value = "SELECT hoa_don_id as idHD,chi_tiet_san_pham_id as idCTSP,so_luong,gia_giam,gia_sau_giam,ngay_tao,ngay_sua,trang_thai FROM hoa_don_chi_tiet where hoa_don_id =:idHD and chi_tiet_san_pham_id =:idCTSP ",nativeQuery = true)
    HoaDonChiTietRespone getOneHDCT(@Param("idHD") String idHD,@Param("idCTSP")String idCTSP);
    @Query(value = "select * from hoa_don_chi_tiet where chi_tiet_san_pham_id =:id",nativeQuery = true)
    List<HoaDonChiTiet> getAllHDCTByCTSP(String id);

    @Query(value = "select * from hoa_don_chi_tiet where chi_tiet_san_pham_id =:idCTSP and hoa_don_id =:idHD",nativeQuery = true)
    HoaDonChiTiet getHDCTByCTSPAndHD(String idCTSP, String idHD);

    @Query(value = "select * from hoa_don_chi_tiet where hoa_don_id =:idHD",nativeQuery = true)
    List<HoaDonChiTiet> getAllHDCTByIDHD(String idHD);


//    @Query(value = "SELECT hdct.hoa_don_id as idHD,hdct.chi_tiet_san_pham_id as idCTSP,hdct.so_luong as soLuong,\n" +
//            "hdct.gia_giam as giaGiam,hdct.gia_sau_giam as giaSauGiam,hdct.ngay_tao as ngayTao,hdct.ngay_sua as ngaySua,\n" +
//            "hdct.trang_thai as trangThai , (select ten from mau_sac where mau_sac.id = ctsp.mau_sac_id) as tenMS,\n" +
//            "(select ma from mau_sac where mau_sac.id = ctsp.mau_sac_id) as maMS,\n" +
//            "(select ten from kich_thuoc where kich_thuoc.id = ctsp.kich_thuoc_id) as tenKT,\n" +
//            "ctsp.ghi_chu as linkAnh, (select ten from san_pham where san_pham.id = ctsp.san_pham_id) as tenSP,\n" +
//            "(select loai from khuyen_mai where khuyen_mai.id = ctsp.khuyen_mai_id) as loaiKM , \n" +
//            "(select ten from khuyen_mai where khuyen_mai.id = ctsp.khuyen_mai_id) as tenKM,\n" +
//            "(select ma from hoa_don where hoa_don.id = hdct.hoa_don_id) as maHD,\n" +
//            "(select gia_tri_khuyen_mai from khuyen_mai where khuyen_mai.id = ctsp.khuyen_mai_id) as giaTriKhuyenMai\n" +
//            "FROM hoa_don_chi_tiet hdct LEFT JOIN chi_tiet_san_pham ctsp ON hdct.chi_tiet_san_pham_id = ctsp.id where hoa_don_id =:id ",nativeQuery = true)
//    List<HoaDonChiTietBanHangRespone> getAllHDCTByMaHD(String ma);
}
