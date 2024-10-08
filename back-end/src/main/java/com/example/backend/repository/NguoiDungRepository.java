package com.example.backend.repository;

import com.example.backend.dto.request.NguoiDungSeacrh;
import com.example.backend.dto.response.KhachHangRespon;
import com.example.backend.dto.response.NhanVienRespon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.model.AdminKhachHangRepon;
import com.example.backend.model.AdminNhanVienRespon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NguoiDungRepository extends JpaRepository<NguoiDung, String> {
    @Query(value = "SELECT CASE WHEN nd.diem IS NULL THEN N'0'ELSE nd.diem END  as diem, nd.id AS idND, nd.ma AS maND, nd.ten AS tenND, nd.so_dien_thoai AS SDT,\n" +
            "             CASE WHEN nd.email IS NULL THEN N'Không có'ELSE nd.email END  as email,CASE WHEN nd.ngay_sinh IS NULL THEN N'Không có'ELSE nd.ngay_sinh END  as ngaySinh\n" +
            "             ,nd.gioi_tinh AS gioiTinh, nd.chung_minh_thu AS cccd, CASE WHEN nd.anh IS NULL THEN N'Không có'ELSE nd.anh END  as anh,\n" +
            "             nd.trang_thai AS trangThai \n" +
            "            FROM nguoi_dung nd WHERE nd.chuc_vu = 'NHANVIEN' order by ngay_tham_gia desc ", nativeQuery = true)
    List<AdminNhanVienRespon> getAllNhanVien();

    @Query(value = """
            select
                 case
                     when nd.diem is null then N'0'
                     else nd.diem
                 end as diem,
                 nd.id as idND,
                 nd.ma as maND,
                 nd.ten as tenND,
                 nd.so_dien_thoai as SDT,
                 case
                     when nd.email is null then N'Không có'
                     else nd.email
                 end as email,
                 case
                     when nd.ngay_sinh is null then N'Không có'
                     else nd.ngay_sinh
                 end as ngaySinh,
                 nd.gioi_tinh as gioiTinh,
                 nd.chung_minh_thu as cccd,
                 case
                     when nd.anh is null then N'Không có'
                     else nd.anh
                 end as anh,
                 nd.trang_thai as trangThai
             from
                 nguoi_dung nd
             where
                 nd.chuc_vu = 'KHACHHANG'
         order by ngay_tham_gia desc
             """, nativeQuery = true)
    List<AdminKhachHangRepon> getAllKhachHang();

    @Query(value = """
            SELECT ROW_NUMBER() OVER (ORDER BY u.ngay_tham_gia DESC ) AS stt,
                            u.id AS id,
                            u.ten AS ten,
                            u.ma AS ma,
                            u.email AS email,
                            u.gioi_tinh AS gioiTinh,
                            u.chung_minh_thu AS canCuocCongDan,
                            u.ngay_sinh AS ngaySinh,
                            u.so_dien_thoai AS soDienThoai,
                            u.anh AS anh,
                            u.ngay_tao AS ngayTao,
                            u.ngay_tham_gia AS ngayThamGia,
                            u.trang_thai AS trangThai,
                            a.id AS idDiaChi,
                            a.ten_thanh_pho AS tenThanhPho,
                            a.ten_huyen AS tenHuyen,
                            a.ten_xa AS tenXa,
                            a.dia_chi AS diaChi
                       FROM nguoi_dung u
                       LEFT JOIN dia_chi a on u.id = a.nguoi_dung_id
                       WHERE a.trang_thai=0 AND u.chuc_vu = 'KHACHHANG' AND u.id = :id
            """, nativeQuery = true)
    KhachHangRespon findByIdCustomer(@Param("id") String id);

    @Query(value = """
            SELECT ROW_NUMBER() OVER (ORDER BY u.ngay_tham_gia DESC ) AS stt,
                            u.id AS id,
                            u.ten AS ten,
                            u.ma AS ma,
                            u.email AS email,
                            u.gioi_tinh AS gioiTinh,
                            u.chung_minh_thu AS canCuocCongDan,
                            u.ngay_sinh AS ngaySinh,
                            u.so_dien_thoai AS soDienThoai,
                            u.anh AS anh,
                            u.ngay_tao AS ngayTao,
                            u.ngay_tham_gia AS ngayThamGia,
                            u.trang_thai AS trangThai,
                            a.id AS idDiaChi,
                            a.ten_thanh_pho AS tenThanhPho,
                            a.ten_huyen AS tenHuyen,
                            a.ten_xa AS tenXa,
                            a.dia_chi AS diaChi
                       FROM nguoi_dung u
                       LEFT JOIN dia_chi a on u.id = a.nguoi_dung_id
                       WHERE a.trang_thai=0 AND u.chuc_vu = 'NHANVIEN' AND u.id = :id
            """, nativeQuery = true)
    NhanVienRespon findByIdNhanVien(@Param("id") String id);

    @Query(value = """
            select
            	case
            		when nd.diem is null then N'0'
            		else nd.diem
            	end as diem,
            	nd.id as idND,
            	nd.ma as maND,
            	nd.ten as tenND,
            	nd.so_dien_thoai as SDT,
            	case
            		when nd.email is null then N'Không có'
            		else nd.email
            	end as email,
            	case
            		when nd.ngay_sinh is null then N'Không có'
            		else nd.ngay_sinh
            	end as ngaySinh,
            	nd.gioi_tinh as gioiTinh,
            	nd.chung_minh_thu as cccd,
            	case
            		when nd.anh is null then N'Không có'
            		else nd.anh
            	end as anh,
            	nd.trang_thai as trangThai
            from
            	nguoi_dung nd
            where
            	(:#{#nguoiDungSeacrh.ten} IS NULL OR 
            	nd.ma like (%:#{#nguoiDungSeacrh.ten}%) OR
            	nd.ten like (%:#{#nguoiDungSeacrh.ten}%) OR
            	nd.so_dien_thoai like (%:#{#nguoiDungSeacrh.ten}%) ) AND
                (:#{#nguoiDungSeacrh.trangThai} IS NULL OR
                nd.trang_thai =:#{#nguoiDungSeacrh.trangThai}) AND
            	nd.chuc_vu = 'KHACHHANG'
            order by
            	maND desc
                         """, nativeQuery = true)
    List<AdminKhachHangRepon> getTimKhachHang(NguoiDungSeacrh nguoiDungSeacrh);

    @Query(value = """
            select
            	case
            		when nd.diem is null then N'0'
            		else nd.diem
            	end as diem,
            	nd.id as idND,
            	nd.ma as maND,
            	nd.ten as tenND,
            	nd.so_dien_thoai as SDT,
            	case
            		when nd.email is null then N'Không có'
            		else nd.email
            	end as email,
            	case
            		when nd.ngay_sinh is null then N'Không có'
            		else nd.ngay_sinh
            	end as ngaySinh,
            	nd.gioi_tinh as gioiTinh,
            	nd.chung_minh_thu as cccd,
            	case
            		when nd.anh is null then N'Không có'
            		else nd.anh
            	end as anh,
            	nd.trang_thai as trangThai
            from
            	nguoi_dung nd
            where
            	(:#{#nguoiDungSeacrh.ten} IS NULL OR 
            	nd.ma like (%:#{#nguoiDungSeacrh.ten}%) OR
            	nd.ten like (%:#{#nguoiDungSeacrh.ten}%) OR
            	nd.so_dien_thoai like (%:#{#nguoiDungSeacrh.ten}%) ) AND
                (:#{#nguoiDungSeacrh.trangThai} IS NULL OR
                nd.trang_thai =:#{#nguoiDungSeacrh.trangThai}) AND
            	nd.chuc_vu = 'NHANVIEN'
            order by
            	maND desc
                         """, nativeQuery = true)
    List<AdminNhanVienRespon> getTimNhanVien(NguoiDungSeacrh nguoiDungSeacrh);


    // login

    @Query(value = """
           select  * from nguoi_dung where  email=:email
                    """,nativeQuery = true)
    Optional<NguoiDung> findByEmail(@Param("email") String email);

    NguoiDung findNguoiDungByEmail(String email);

    NguoiDung findAllById(String id);

    @Query(value = "select * from nguoi_dung where id=:id",nativeQuery = true)
    NguoiDung getNDByID(String id);
}
