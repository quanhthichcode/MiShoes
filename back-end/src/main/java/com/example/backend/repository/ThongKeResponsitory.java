package com.example.backend.repository;


import com.example.backend.dto.response.BieuDoRespon;
import com.example.backend.dto.response.SanPhamBanChayRespon;
import com.example.backend.dto.response.ThongKeRespon;
import com.example.backend.dto.response.TrangThaiHoaDonRespon;
import com.example.backend.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;


@Repository
public interface ThongKeResponsitory extends JpaRepository<HoaDon, String> {

    @Query(value = """
            SELECT  CASE WHEN sum(thanh_tien) IS NULL  THEN 0 ELSE sum(thanh_tien) END  as tongTienThongKe
            , count(ma) AS tongHoaDonThongKe
            FROM duanmishoes.hoa_don where  cast(hoa_don.ngay_mua AS DATE)=date(curdate())
            and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)
                        """, nativeQuery = true)
    ThongKeRespon thongKeTheoNgay();

    @Query(value = """
            SELECT  CASE WHEN sum(thanh_tien) IS NULL  THEN 0 ELSE sum(thanh_tien) END  as tongTienThongKe
            , count(ma) AS tongHoaDonThongKe
            FROM duanmishoes.hoa_don where  month(ngay_tao)=month(curdate()) and year(ngay_tao)=year(curdate()) and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)
                        """, nativeQuery = true)
    ThongKeRespon thongKeTheoThang();

    @Query(value = """
                SELECT  CASE WHEN sum(thanh_tien) IS NULL  THEN 0 ELSE sum(thanh_tien) END  as tongTienThongKe
            , count(ma) AS tongHoaDonThongKe
                FROM duanmishoes.hoa_don where year(ngay_tao)=year(curdate()) and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)
                        """, nativeQuery = true)
    ThongKeRespon thongKeTheoNam();

    @Query(value = """
              SELECT  CASE WHEN sum(thanh_tien) IS NULL  THEN 0 ELSE sum(thanh_tien) END  as tongTienThongKe
            , count(ma) AS tongHoaDonThongKe
                FROM duanmishoes.hoa_don WHERE ngay_tao=(curdate()- INTERVAL 1 DAY)  and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)
                        """, nativeQuery = true)
    ThongKeRespon doanhThuNgayTruoc();

    @Query(value = """
             SELECT  CASE WHEN sum(thanh_tien) IS NULL  THEN 0 ELSE sum(thanh_tien) END  as tongTienThongKe
            , count(ma) AS tongHoaDonThongKe
                FROM duanmishoes.hoa_don where year(ngay_tao)=year(curdate()- INTERVAL 1 DAY) and month(ngay_tao)=month(curdate()- INTERVAL 1 DAY) and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)
                        """, nativeQuery = true)
    ThongKeRespon doanhThuThangTruoc();

    @Query(value = """
             SELECT  CASE WHEN sum(thanh_tien) IS NULL  THEN 0 ELSE sum(thanh_tien) END  as tongTienThongKe
            , count(ma) AS tongHoaDonThongKe
FROM duanmishoes.hoa_don where year(ngay_tao)=year(curdate()- INTERVAL 1 DAY)  and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)
                        """, nativeQuery = true)
    ThongKeRespon doanhThuNamTruoc();

    @Query(value = " select sum(hoa_don_chi_tiet.so_luong) as soLuong,hoa_don_chi_tiet.chi_tiet_san_pham_id as idSP, chi_tiet_san_pham.gia_ban as giaBan,min(hinh_anh.url) as linkAnh,\n" +
            "san_pham.ten as tenSp,mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang\n" +
            " from hoa_don_chi_tiet join hoa_don on hoa_don.id=hoa_don_chi_tiet.hoa_don_id\n" +
            " join chi_tiet_san_pham on chi_tiet_san_pham.id =hoa_don_chi_tiet.chi_tiet_san_pham_id\n" +
            "join hinh_anh on hinh_anh.chi_tiet_san_pham_id=chi_tiet_san_pham.id\n" +
            "join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id\n" +
            "join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id\n" +
            "join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id\n" +
            "join hang on hang.id=chi_tiet_san_pham.hang_id\n" +
            "WHERE \n" +
            "    YEAR(hoa_don_chi_tiet.ngay_tao) = YEAR(CURDATE())\n" +
            "    AND MONTH(hoa_don_chi_tiet.ngay_tao) = MONTH(CURDATE()) and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)\n" +
            "group by hoa_don_chi_tiet.chi_tiet_san_pham_id,chi_tiet_san_pham.gia_ban,hinh_anh.url,mau_sac.ten,san_pham.ten,kich_thuoc.ten,\n" +
            "hang.ten\n" +
            "order by sum(hoa_don_chi_tiet.so_luong) desc limit 5", nativeQuery = true)
    List<SanPhamBanChayRespon> getSPBanChayThang();

    @Query(value = "select sum(hoa_don_chi_tiet.so_luong) as soLuong,hoa_don_chi_tiet.chi_tiet_san_pham_id as idSP, chi_tiet_san_pham.gia_ban as giaBan,min(hinh_anh.url) as linkAnh,san_pham.ten as tenSp,mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang\n" +
            "from hoa_don_chi_tiet join hoa_don on hoa_don.id=hoa_don_chi_tiet.hoa_don_id\n" +
            "join chi_tiet_san_pham on chi_tiet_san_pham.id =hoa_don_chi_tiet.chi_tiet_san_pham_id\n" +
            "join hinh_anh on hinh_anh.chi_tiet_san_pham_id=chi_tiet_san_pham.id\n" +
            "join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id\n" +
            "join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id\n" +
            "join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id\n" +
            "join hang on hang.id=chi_tiet_san_pham.hang_id\n" +
            "WHERE YEAR(hoa_don_chi_tiet.ngay_tao) = YEAR(CURDATE())\n" +
            "and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)\n" +
            "group by hoa_don_chi_tiet.chi_tiet_san_pham_id,chi_tiet_san_pham.gia_ban,hinh_anh.url,mau_sac.ten,san_pham.ten,kich_thuoc.ten,hang.ten\n" +
            "order by sum(hoa_don_chi_tiet.so_luong) desc limit 5", nativeQuery = true)
    List<SanPhamBanChayRespon> getSPBanChayNam();
    @Query(value = "select sum(hoa_don_chi_tiet.so_luong) as soLuong,hoa_don_chi_tiet.chi_tiet_san_pham_id as idSP, chi_tiet_san_pham.gia_ban as giaBan,min(hinh_anh.url) as linkAnh,san_pham.ten as tenSp,mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang\n" +
            "from hoa_don_chi_tiet join hoa_don on hoa_don.id=hoa_don_chi_tiet.hoa_don_id\n" +
            "join chi_tiet_san_pham on chi_tiet_san_pham.id =hoa_don_chi_tiet.chi_tiet_san_pham_id\n" +
            "join hinh_anh on hinh_anh.chi_tiet_san_pham_id=chi_tiet_san_pham.id\n" +
            "join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id\n" +
            "join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id\n" +
            "join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id\n" +
            "join hang on hang.id=chi_tiet_san_pham.hang_id\n" +
            "WHERE YEARWEEK(hoa_don_chi_tiet.ngay_tao) = YEARWEEK(CURDATE())\n" +
            "and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)\n" +
            "group by hoa_don_chi_tiet.chi_tiet_san_pham_id,chi_tiet_san_pham.gia_ban,hinh_anh.url,mau_sac.ten,san_pham.ten,kich_thuoc.ten,hang.ten\n" +
            "order by sum(hoa_don_chi_tiet.so_luong) desc limit 5", nativeQuery = true)
    List<SanPhamBanChayRespon> getSPBanChayTuan();

    @Query(value = "select sum(hoa_don_chi_tiet.so_luong) as soLuong,hoa_don_chi_tiet.chi_tiet_san_pham_id as idSP, chi_tiet_san_pham.gia_ban as giaBan,min(hinh_anh.url) as linkAnh,san_pham.ten as tenSp,mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang\n" +
            "from hoa_don_chi_tiet join hoa_don on hoa_don.id=hoa_don_chi_tiet.hoa_don_id\n" +
            "join chi_tiet_san_pham on chi_tiet_san_pham.id =hoa_don_chi_tiet.chi_tiet_san_pham_id\n" +
            "join hinh_anh on hinh_anh.chi_tiet_san_pham_id=chi_tiet_san_pham.id\n" +
            "join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id\n" +
            "join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id\n" +
            "join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id\n" +
            "join hang on hang.id=chi_tiet_san_pham.hang_id\n" +
            "WHERE date(hoa_don_chi_tiet.ngay_tao) = CURDATE()\n" +
            "and (hoa_don.trang_thai=4 or hoa_don.trang_thai=5)\n" +
            "group by hoa_don_chi_tiet.chi_tiet_san_pham_id,chi_tiet_san_pham.gia_ban,hinh_anh.url,mau_sac.ten,san_pham.ten,kich_thuoc.ten,hang.ten\n" +
            "order by sum(hoa_don_chi_tiet.so_luong) desc limit 5", nativeQuery = true)
    List<SanPhamBanChayRespon> getSPBanChayNgay();
    @Query(value = """
            select chi_tiet_san_pham.so_luong as soLuong,chi_tiet_san_pham.id as idSP, chi_tiet_san_pham.gia_ban as giaBan,min(hinh_anh.url) as linkAnh,san_pham.ten as tenSp,mau_sac.ten as mauSac,kich_thuoc.ten as kichThuoc,hang.ten as hang
            from chi_tiet_san_pham\s
            join hinh_anh on hinh_anh.chi_tiet_san_pham_id=chi_tiet_san_pham.id
join san_pham on san_pham.id=chi_tiet_san_pham.san_pham_id
            join mau_sac on mau_sac.id=chi_tiet_san_pham.mau_sac_id
            join kich_thuoc on kich_thuoc.id=chi_tiet_san_pham.kich_thuoc_id
            join hang on hang.id=chi_tiet_san_pham.hang_id
            WHERE chi_tiet_san_pham.so_luong<5
            group by chi_tiet_san_pham.id,chi_tiet_san_pham.gia_ban,hinh_anh.url,mau_sac.ten,san_pham.ten,kich_thuoc.ten,hang.ten
            """,nativeQuery = true)
    List<SanPhamBanChayRespon> getSPSapHet();
    @Query(value = """
SELECT\s
    DATE(hoa_don_chi_tiet.ngay_tao) AS ngay,
    COUNT(DISTINCT hoa_don_chi_tiet.hoa_don_id) AS tongHoaDon,
    SUM(hoa_don_chi_tiet.so_luong) AS tongSanPham\s
FROM\s
    hoa_don_chi_tiet\s
WHERE\s
    DATE(hoa_don_chi_tiet.ngay_tao) = CURDATE() \s
GROUP BY\s
    DATE(hoa_don_chi_tiet.ngay_tao)
""", nativeQuery = true)
    List<BieuDoRespon> getBieuDoNgay();

    @Query(value = "Select DATE(hoa_don_chi_tiet.ngay_tao) AS ngay, count(distinct hoa_don_chi_tiet.hoa_don_id) as tongHoaDon,sum(hoa_don_chi_tiet.so_luong) as tongSanPham from hoa_don_chi_tiet \n" +
            "            where yearweek(hoa_don_chi_tiet.ngay_tao)= yearweek(curdate())  group by date (hoa_don_chi_tiet.ngay_tao)", nativeQuery = true)
    List<BieuDoRespon> getBieuDoTuan();

    @Query(value = "Select DATE(hoa_don_chi_tiet.ngay_tao) AS ngay,count(distinct hoa_don_chi_tiet.hoa_don_id) as tongHoaDon,sum(hoa_don_chi_tiet.so_luong) as tongSanPham from hoa_don_chi_tiet \n" +
            "where year(hoa_don_chi_tiet.ngay_tao)= year(curdate()) and month(hoa_don_chi_tiet.ngay_tao)=month(curdate())  group by date(hoa_don_chi_tiet.ngay_tao) ", nativeQuery = true)
    List<BieuDoRespon> getBieuDoThang();

    @Query(value = """
            Select count(distinct hoa_don_chi_tiet.hoa_don_id) as tongHoaDon,sum(hoa_don_chi_tiet.so_luong) as tongSanPham from hoa_don_chi_tiet
            where year(date (hoa_don_chi_tiet.ngay_tao))= year(curdate())
            """, nativeQuery = true)
    List<BieuDoRespon> getBieuDoNam();

    @Query(value = "select case when hoa_don.trang_thai IS NULL  THEN 0 else hoa_don.trang_thai end as trangThai,count(hoa_don.id) as soLuong from hoa_don where year(hoa_don.ngay_tao)=year(current_date()) and month(hoa_don.ngay_tao)=month(current_date())\n" +
            "group by hoa_don.trang_thai", nativeQuery = true)
    List<TrangThaiHoaDonRespon> getTrangThaiHoaDonThang();

    @Query(value = "select case when hoa_don.trang_thai IS NULL  THEN 0 else hoa_don.trang_thai end as trangThai,count(hoa_don.id) as soLuong \n" +
            "from hoa_don \n" +
            "where year(hoa_don.ngay_tao)=year(current_date())\n" +
            "group by hoa_don.trang_thai", nativeQuery = true)
    List<TrangThaiHoaDonRespon> getTrangThaiHoaDonNam();

    @Query(value = "select case when hoa_don.trang_thai IS NULL  THEN 0 else hoa_don.trang_thai end as trangThai,count(hoa_don.id) as soLuong from hoa_don \n" +
            "where date(hoa_don.ngay_tao)=current_date()\n" +
            "group by hoa_don.trang_thai", nativeQuery = true)
    List<TrangThaiHoaDonRespon> getTrangThaiHoaDonNgay();

    @Query(value = "select case when hoa_don.trang_thai IS NULL  THEN 0 else hoa_don.trang_thai end as trangThai,count(hoa_don.id) as soLuong from hoa_don \n" +
            "where yearweek(hoa_don.ngay_tao)=yearweek(current_date())\n" +
            "group by hoa_don.trang_thai", nativeQuery = true)
    List<TrangThaiHoaDonRespon> getTrangThaiHoaDonTuan();

    @Query(value = """
            Select CASE WHEN sum(hoa_don_chi_tiet.so_luong) IS NULL THEN 0 ELSE sum(hoa_don_chi_tiet.so_luong) END as tongSanPham
             from  hoa_don_chi_tiet
             where year(hoa_don_chi_tiet.ngay_tao)=year(curdate()) and month(hoa_don_chi_tiet.ngay_tao)=month(curdate())
            """, nativeQuery = true)
    Integer getSPBanNgay();
    @Query(value = """
            Select CASE WHEN sum(hoa_don_chi_tiet.so_luong) IS NULL THEN 0 ELSE sum(hoa_don_chi_tiet.so_luong) END as tongSanPham
             from  hoa_don_chi_tiet
             where year(hoa_don_chi_tiet.ngay_tao)=year(curdate()-INTERVAL 1 DAY) and month(hoa_don_chi_tiet.ngay_tao)=month(curdate()-INTERVAL 1 DAY)
            """, nativeQuery = true)
    Integer getSPBanNgayTruoc();

}