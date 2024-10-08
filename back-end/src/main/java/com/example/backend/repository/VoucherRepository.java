package com.example.backend.repository;


import com.example.backend.dto.response.AdminVoucher;
import com.example.backend.dto.response.VoucherRespone;
import com.example.backend.entity.Voucher;
import com.example.backend.dto.request.VoucherSearch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, String> {
    List<Voucher> findAllByOrderByNgayTaoDesc();

    @Query(value = "SELECT * from voucher v WHERE v.ma LIKE %:key% or phuong_thuc LIKE :key and ngay_bat_dau between :ngayBD and :ngayKT and ngay_ket_thuc between  :ngayBD and :ngayKT", nativeQuery = true)
    List<Voucher> search(@Param("key") String key, @Param("ngayBD") Date ngayBD, @Param("ngayKT") Date ngayKT);

//    @Query(value = """
//                SELECT v.id AS id, v.ma AS ma,v.ten AS ten,v.muc_do AS mucDo,
//                                    v.giam_toi_da AS giamToiDa,v.dieu_kien AS dieuKien,v.so_luong AS soLuong,
//                                     v.loai_voucher AS loaiVoucher,v.ngay_bat_dau AS ngayBatDau,
//                                     v.ngay_ket_thuc AS ngayKetThuc,v.trang_thai AS trangThai FROM voucher v WHERE
//                         (:#{#voucherSearch.ten} IS NULL OR
//                         v.ma LIKE (%:#{#voucherSearch.ten}%) OR
//                         v.ten LIKE (%:#{#voucherSearch.ten}%) OR
//                         CAST(v.muc_do AS CHAR) LIKE (%:#{#voucherSearch.ten}%) ) AND
//                        (:#{#voucherSearch.loaiVoucher} IS NULL OR
//                        v.loai_voucher LIKE  (%:#{#voucherSearch.loaiVoucher}%)) AND
//                        ( :#{#voucherSearch.trangThai} IS NULL OR
//                         v.trang_thai LIKE (%:#{#voucherSearch.trangThai}) ) AND
//                          ((:#{#voucherSearch.ngayBatDau} IS NULL AND :#{#voucherSearch.ngayKetThuc} IS NULL) OR
//                         (:#{#voucherSearch.ngayBatDau} IS NULL AND v.ngay_ket_thuc <= :#{#voucherSearch.ngayKetThuc}) OR
//                         (:#{#voucherSearch.ngayKetThuc} IS NULL AND v.ngay_bat_dau >= :#{#voucherSearch.ngayBatDau}) OR
//                         (v.ngay_bat_dau BETWEEN :#{#voucherSearch.ngayBatDau} AND :#{#voucherSearch.ngayKetThuc}) OR
//                         (v.ngay_ket_thuc BETWEEN :#{#voucherSearch.ngayBatDau} AND :#{#voucherSearch.ngayKetThuc})))
//            """, nativeQuery = true)
//    List<AdminVoucher> searchVoucher(VoucherSearch voucherSearch);
@Query(value = """
                SELECT v.id AS id, v.ma AS ma, v.ten AS ten, v.muc_do AS mucDo,
                       v.giam_toi_da AS giamToiDa, v.dieu_kien AS dieuKien, v.so_luong AS soLuong,
                       v.loai_voucher AS loaiVoucher, v.ngay_bat_dau AS ngayBatDau,
                       v.ngay_ket_thuc AS ngayKetThuc, v.trang_thai AS trangThai 
                FROM voucher v 
                WHERE
                    (:#{#voucherSearch.ten} IS NULL OR
                     v.ma LIKE (%:#{#voucherSearch.ten}%) OR
                     v.ten LIKE (%:#{#voucherSearch.ten}%) OR
                     CAST(v.muc_do AS CHAR) LIKE (%:#{#voucherSearch.ten}%)) 
                    AND
                    (:#{#voucherSearch.loaiVoucher} IS NULL OR
                     v.loai_voucher LIKE  (%:#{#voucherSearch.loaiVoucher}%)) 
                    AND
                    (:#{#voucherSearch.trangThai} IS NULL OR
                     v.trang_thai LIKE (%:#{#voucherSearch.trangThai})) 
                    AND
                    ((:#{#voucherSearch.ngayBatDau} IS NULL AND :#{#voucherSearch.ngayKetThuc} IS NULL) OR
                     (:#{#voucherSearch.ngayBatDau} IS NULL AND v.ngay_ket_thuc <= :#{#voucherSearch.ngayKetThuc}) OR
                     (:#{#voucherSearch.ngayKetThuc} IS NULL AND v.ngay_bat_dau >= :#{#voucherSearch.ngayBatDau}) OR
                     (v.ngay_bat_dau BETWEEN :#{#voucherSearch.ngayBatDau} AND :#{#voucherSearch.ngayKetThuc}) OR
                     (v.ngay_ket_thuc BETWEEN :#{#voucherSearch.ngayBatDau} AND :#{#voucherSearch.ngayKetThuc}))
            """, nativeQuery = true)
List<AdminVoucher> searchVoucher(VoucherSearch voucherSearch);


    @Query(value = """
            SELECT id, ma
                   CASE
                       WHEN loai_voucher = 'Phần trăm' THEN MAX((:tien * muc_do)/100)
                       ELSE MAX(giam_toi_da)
                   END AS max_giam_toi_da
            FROM voucher
            WHERE dieu_kien <= 200000 and trang_thai=0
            GROUP BY id,ma
            ORDER BY max_giam_toi_da DESC
            LIMIT 1;
            """, nativeQuery = true)
    Voucher getVoucherHopLe(BigDecimal tien);

    @Query(value = """
                    select v.id AS id, v.ma AS ma,v.ten AS ten,v.muc_do AS mucDo,
                                    v.giam_toi_da AS giamToiDa,v.dieu_kien AS dieuKien,v.so_luong AS soLuong,
                                     v.loai_voucher AS loaiVoucher,v.ngay_bat_dau AS ngayBatDau,
                                     v.ngay_ket_thuc AS ngayKetThuc,v.trang_thai AS trangThai,DATEDIFF(ngay_ket_thuc, CURDATE()) AS ngayConLai FROM voucher v where v.id not in (select voucher.id from voucher  join nguoidung_voucher on nguoidung_voucher.voucher_id =voucher.id  ) and v.trang_thai='DANG_HOAT_DONG'
            """, nativeQuery = true)
    List<VoucherRespone> getVoucherTatCa();

     Optional<Voucher> findAllById(String id);


     @Query(value = "select * from voucher where id =:idV and trang_thai = 'DANG_HOAT_DONG'",nativeQuery = true)
    Voucher detail(String idV);
}
