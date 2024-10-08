package com.example.backend.repository;

import com.example.backend.dto.request.KhachHangVoucherSearch;
import com.example.backend.dto.request.NguoiDungSeacrh;
import com.example.backend.dto.response.NguoiDungRespone;
import com.example.backend.dto.response.VoucherRespone;
import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.entity.Voucher;
import com.example.backend.model.AdminKhachHangRepon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NguoiDungVoucherRepository extends JpaRepository<NguoiDungVoucher, String> {
    @Query(value = "select nguoi_dung_id from nguoidung_voucher where voucher_id=:id and trang_thai ='DANG_SU_DUNG' ", nativeQuery = true)
    List<String> getIDKHByIDKM(String id);

    @Query(value = """
            select voucher.id as id ,  DATEDIFF(ngay_ket_thuc, CURDATE()) AS ngayConLai,ngay_ket_thuc as ngayKetThuc ,voucher.ma as ma , voucher.ten as ten ,voucher.loai_voucher as loaiVoucher, voucher.muc_do as mucDo , voucher.dieu_kien as dieuKien , voucher.so_luong as soLuong, voucher.trang_thai as trangThai , voucher.giam_toi_da as giamToiDa from voucher join nguoidung_voucher on nguoidung_voucher.voucher_id =voucher.id
                                                                                                                                          where nguoi_dung_id=:idND and voucher.trang_thai='DANG_HOAT_DONG' and nguoidung_voucher.trang_thai='DANG_SU_DUNG'
            """, nativeQuery = true)
    List<VoucherRespone> getVoucherByNguoiDung(String idND);

    @Query(value = "SELECT CASE WHEN nd.diem IS NULL THEN N'0'ELSE nd.diem END  as diem, nd.id AS idND, nd.ma AS maND, nd.ten AS tenND, nd.so_dien_thoai AS SDT,\n" +
            "  CASE WHEN nd.email IS NULL THEN N'Không có'ELSE nd.email END  as email,CASE WHEN nd.ngay_sinh IS NULL THEN N'Không có'ELSE nd.ngay_sinh END  as ngaySinh\n" +
            "  ,nd.gioi_tinh AS gioiTinh, nd.chung_minh_thu AS cccd, CASE WHEN nd.anh IS NULL THEN N'Không có'ELSE nd.anh END  as anh, \n" +
            "  nd.trang_thai AS trangThai\n" +
            "FROM nguoi_dung nd where nd.id in (select nguoi_dung_id from nguoidung_voucher where voucher_id=:idV )", nativeQuery = true)
    List<AdminKhachHangRepon> getNguoiDungByVoucher(@Param("idV") String id);

    List<NguoiDungVoucher> getAllByNguoiDungLike(String nguoiDung);

    NguoiDungVoucher getNguoiDungVoucherByNguoiDung_IdAndVoucher_Id(String idKH, String idV);

    @Query(value = "select * from nguoidung_voucher where voucher_id=:idV and nguoi_dung_id=:idND", nativeQuery = true)
    NguoiDungVoucher getNguoiDungVoucherByVoucherAndKHhachHang(String idV, String idND);

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
            	nd.so_dien_thoai like (%:#{#nguoiDungSeacrh.ten}%) OR
            	nd.email like (%:#{#nguoiDungSeacrh.ten}%))AND            
            	nd.chuc_vu = 'khach_hang'
            order by
            	maND desc
                         """, nativeQuery = true)
    List<AdminKhachHangRepon> getKhachHangSearch(KhachHangVoucherSearch nguoiDungSeacrh);
}
