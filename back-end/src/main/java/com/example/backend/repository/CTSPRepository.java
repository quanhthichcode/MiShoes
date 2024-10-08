package com.example.backend.repository;


import com.example.backend.dto.request.sanphamsearch.CTSPSearch;
import com.example.backend.dto.response.SanPhamClient.DetailCTSPClientRespon;
import com.example.backend.dto.response.SanPhamClient.ListMauSacBySPClientRespon;
import com.example.backend.dto.response.SanPhamClient.ListSizeBySPClientRespon;
import com.example.backend.dto.response.SoLuongVaSoLuongTon;
import com.example.backend.dto.response.sanpham.CTSPSearchRespone;
import com.example.backend.dto.response.sanpham.ChiTietSanPhamRespone;
import com.example.backend.dto.response.sanpham.DetailCTSPRespone;
import com.example.backend.dto.response.ChiTietSanPhamForBanHang;
import com.example.backend.dto.response.sanpham.DetailCtspByQrRespon;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.model.AdminCTSPForKhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CTSPRepository extends JpaRepository<ChiTietSanPham, String> {
    @Query(value = """
            SELECT o.id AS idCTSP
            ,CASE WHEN MIN(ha.url) IS NULL THEN N'Chưa có ảnh' ELSE MIN(ha.url) END AS linkAnh 
            ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ten AS tenMS,ms.ma AS maMS
            ,CASE WHEN o.so_luong IS NULL THEN N'0' ELSE o.so_luong END AS soLuong
            ,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN hinh_anh ha on o.id=ha.chi_tiet_san_pham_id    
            WHERE o.san_pham_id=:idSP
             group by o.id
                     """, nativeQuery = true)
    List<ChiTietSanPhamRespone> getALLCTSP(@Param("idSP") String idSP);

    @Query(value = """
            SELECT o.ghi_chu as ghiChu,o.id AS id,o.mo_ta AS moTa ,sp.id AS sanPham,sp.ten AS tenSP ,kt.id AS kichThuoc,ms.id AS mauSac,cl.id AS chatLieu,dc.id AS deGiay,dm.id AS danhMuc
            ,h.id AS hang,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
            JOIN de_giay dc  on o.de_giay_id=dc.id
            JOIN danh_muc dm  on o.danh_muc_id=dm.id
            JOIN hang h  on o.hang_id=h.id
            WHERE o.id=:idCT
                     """, nativeQuery = true)
    DetailCTSPRespone detailCTSP(@Param("idCT") String idCT);
    @Query(value = """
          SELECT o.ghi_chu as linkAnh,o.id AS id,o.mo_ta AS moTa ,sp.id AS sanPham,sp.ten AS tenSP ,kt.id AS kichThuoc,ms.id AS mauSac,cl.id AS chatLieu,dc.id AS deGiay,dm.id AS danhMuc
                     ,h.id AS hang,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai,sp.ten as tenSP,ms.ma as maMS,kt.ten as tenKT,ms.ten as tenMS,km.loai as loaiKM,km.gia_tri_khuyen_mai as giaTriKhuyenMai,km.ten as tenKM
                     FROM chi_tiet_san_pham o
                     JOIN san_pham sp  on o.san_pham_id=sp.id
                     JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
                     JOIN mau_sac ms  on o.mau_sac_id=ms.id
                     JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
                     JOIN de_giay dc  on o.de_giay_id=dc.id
                     JOIN danh_muc dm  on o.danh_muc_id=dm.id
                     JOIN hang h  on o.hang_id=h.id
                     join khuyen_mai km on km.id=o.khuyen_mai_id
                       WHERE o.id=:idCT
                     """, nativeQuery = true)
    DetailCtspByQrRespon QRctsp(@Param("idCT") String idCT);
    @Query(value = """
            SELECT o.id AS id,o.mo_ta AS moTa ,o.ghi_chu as ghiChu,sp.id AS sanPham,sp.ten AS tenSP ,kt.id AS kichThuoc,ms.id AS mauSac,cl.id AS chatLieu,dc.id AS deGiay,dm.id AS danhMuc
            ,h.id AS hang,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
            JOIN de_giay dc  on o.de_giay_id=dc.id
            JOIN danh_muc dm  on o.danh_muc_id=dm.id
            JOIN hang h  on o.hang_id=h.id
                     """, nativeQuery = true)
    List<DetailCTSPRespone> detail();

    @Query(value = """
            SELECT distinct o.id AS idCTSP,MIN(ha.url) AS linkAnh ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ten AS tenMS,ms.ma AS maMS,
             o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai, km.ten as tenKM , km.gia_tri_khuyen_mai as giaTriKhuyenMai , km.loai as loaiKM
             FROM duanmishoes.chi_tiet_san_pham o
             JOIN duanmishoes.san_pham sp  on o.san_pham_id=sp.id
             JOIN duanmishoes.kich_thuoc kt  on o.kich_thuoc_id=kt.id
             JOIN duanmishoes.mau_sac ms  on o.mau_sac_id=ms.id
             JOIN duanmishoes.hinh_anh ha on o.id=ha.chi_tiet_san_pham_id 
             LEFT JOIN duanmishoes.khuyen_mai km on o.khuyen_mai_id = km.id
             where o.trang_thai =0
             group by o.id
            """, nativeQuery = true)
    List<ChiTietSanPhamForBanHang> getALLCTSPBanHang();


    @Query(value = """
            SELECT o.id 
            FROM chi_tiet_san_pham o
            JOIN khuyen_mai km  on o.khuyen_mai_id=km.id
            WHERE km.id=:idKM ORDER BY o.id DESC
                     """, nativeQuery = true)
    List<String> getAllCTSPByKM(@Param("idKM") String idKM);


    @Query(value = """
              SELECT o.id AS idCTSP,o.mo_ta AS moTa ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ma AS tenMS,cl.ten AS tenCL,dg.ten AS tenDG,dm.ten AS tenDM
              ,h.ten AS tenH,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
              FROM chi_tiet_san_pham o
             LEFT JOIN san_pham sp  on o.san_pham_id=sp.id
             LEFT JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
              LEFT JOIN mau_sac ms  on o.mau_sac_id=ms.id
             LEFT JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
             LEFT JOIN de_giay dg  on o.de_giay_id=dg.id
            LEFT  JOIN danh_muc dm  on o.danh_muc_id=dm.id
             LEFT JOIN hang h  on o.hang_id=h.id
              WHERE sp.id=:idSP ORDER BY o.id DESC
                       """, nativeQuery = true)
    List<AdminCTSPForKhuyenMai> getCTSPBySP(@Param("idSP") String idSP);

    @Query(value = "select ctsp.id from chi_tiet_san_pham ctsp left join khuyen_mai km on ctsp.khuyen_mai_id = km.id where ctsp.khuyen_mai_id =:idKM", nativeQuery = true)
    List<String> getCTSPByKM(String idKM);

    @Query(value = """
            SELECT o.id AS idCTSP,ha.url AS linkAnh,o.mo_ta AS moTa ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ma AS maMS,ms.ten AS tenMS,cl.ten AS tenCL,dc.ten AS tenDC,dm.ten AS tenDM
            ,h.ten AS tenH,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
            JOIN de_giay dc  on o.de_giay_id=dc.id
            JOIN danh_muc dm  on o.danh_muc_id=dm.id
            JOIN hang h  on o.hang_id=h.id
            JOIN hinh_anh ha on o.id=ha.chi_tiet_san_pham_id    
            WHERE                                                                 
            ((:#{#ctspSearch.tenCT} IS NULL OR sp.ten LIKE (%:#{#ctspSearch.tenCT}%) ) AND
            (:#{#ctspSearch.idKT} IS NULL OR o.kich_thuoc_id =:#{#ctspSearch.idKT} ) AND
            (:#{#ctspSearch.idMS} IS NULL OR o.mau_sac_id =:#{#ctspSearch.idMS} ) AND
            (:#{#ctspSearch.idCL} IS NULL OR o.chat_lieu_id =:#{#ctspSearch.idCL} ) AND
            (:#{#ctspSearch.idDC} IS NULL OR o.de_giay_id =:#{#ctspSearch.idDC} ) AND
            (:#{#ctspSearch.idDM} IS NULL OR o.danh_muc_id =:#{#ctspSearch.idDM} ) AND
            (:#{#ctspSearch.idH} IS NULL OR o.hang_id =:#{#ctspSearch.idH} ) AND
            (:#{#ctspSearch.trangThaiCT} IS NULL OR o.trang_thai =:#{#ctspSearch.trangThaiCT}) AND
            (:#{#ctspSearch.soLuongCT} IS NULL OR o.so_luong <= :#{#ctspSearch.soLuongCT}) AND
            (:#{#ctspSearch.giaBanCT} IS NULL OR o.gia_ban <= :#{#ctspSearch.giaBanCT})) 
            AND o.san_pham_id = :idSP
                     """, nativeQuery = true)
    List<CTSPSearchRespone> getTim(@Param("idSP") String idSP, CTSPSearch ctspSearch);

    // sản phẩm client
    @Query(value = """
            SELECT o.id AS id,o.mo_ta AS moTa ,sp.id AS sanPhamID,sp.ten AS tenSP ,kt.id AS kichThuocID,ms.id AS mauSacID,cl.id AS chatLieuID, cl.ten as tenCL,dc.id AS deGiayID,dc.ten as tenDeGiay,dm.id AS danhMucID
                ,dm.ten as tenDM,h.id AS hangID,h.ten as tenHang,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai,o.ghi_chu as anh,o.khuyen_mai_id as khuyenMaiID , km.loai as loaiKM , km.gia_tri_khuyen_mai as giaTriKhuyenMai
                FROM chi_tiet_san_pham o
                JOIN san_pham sp  on o.san_pham_id=sp.id
                JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
                JOIN mau_sac ms  on o.mau_sac_id=ms.id
                JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
                JOIN de_giay dc  on o.de_giay_id=dc.id
                JOIN danh_muc dm  on o.danh_muc_id=dm.id
                JOIN hang h  on o.hang_id=h.id
                LEFT JOIN khuyen_mai km on o.khuyen_mai_id = km.id
                WHERE o.id=:idCT
                """, nativeQuery = true)
    DetailCTSPClientRespon detailCTSPClient(@Param("idCT") String idCT);

    //list mau sac by sp client
    @Query(value = """
            SELECT distinct mau_sac.id as mauSacID, mau_sac.ma as maMau FROM chi_tiet_san_pham
             join san_pham on chi_tiet_san_pham.san_pham_id = san_pham.id
              join mau_sac on chi_tiet_san_pham.mau_sac_id =mau_sac.id where san_pham_id=:idSP
                 """, nativeQuery = true)
    List<ListMauSacBySPClientRespon> listMauSacBySPClient(@Param("idSP") String idSP);

    //list size by sp client
    @Query(value = """
            SELECT distinct kich_thuoc.id as kichThuocID, kich_thuoc.ten as tenKichThuoc FROM chi_tiet_san_pham
              join san_pham on chi_tiet_san_pham.san_pham_id = san_pham.id
               join kich_thuoc on chi_tiet_san_pham.kich_thuoc_id =kich_thuoc.id  where san_pham_id=:idSP order by kich_thuoc.ten
                """, nativeQuery = true)
    List<ListSizeBySPClientRespon> listSizeBySPClient(@Param("idSP") String idSP);

    //list size by id màu sắc client
    @Query(value = """
            SELECT distinct kich_thuoc.id as kichThuocID, kich_thuoc.ten as tenKichThuoc FROM chi_tiet_san_pham
              join san_pham on chi_tiet_san_pham.san_pham_id = san_pham.id
               join kich_thuoc on chi_tiet_san_pham.kich_thuoc_id =kich_thuoc.id  where san_pham_id=:idSP 
                and mau_sac_id=:idMS and so_luong >0
               order by kich_thuoc.ten
                """, nativeQuery = true)
    List<ListSizeBySPClientRespon> listSizeBySPandIDmsClient(@Param("idSP") String idSP, @Param("idMS") String idMS);

    //detail ctsp by id san pham , id mau sac, id size
    @Query(value = """
            SELECT o.id AS id,o.mo_ta AS moTa ,sp.id AS sanPhamID,sp.ten AS tenSP ,kt.id AS kichThuocID,ms.id AS mauSacID,cl.id AS chatLieuID, cl.ten as tenCL,dc.id AS deGiayID,dc.ten as tenDeGiay,dm.id AS danhMucID
                ,dm.ten as tenDM,h.id AS hangID,h.ten as tenHang,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai,o.ghi_chu as anh,o.khuyen_mai_id as khuyenMaiID , km.loai as loaiKM , km.gia_tri_khuyen_mai as giaTriKhuyenMai
                FROM chi_tiet_san_pham o
                JOIN san_pham sp  on o.san_pham_id=sp.id
                JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
                JOIN mau_sac ms  on o.mau_sac_id=ms.id
                JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
                JOIN de_giay dc  on o.de_giay_id=dc.id
                JOIN danh_muc dm  on o.danh_muc_id=dm.id
                JOIN hang h  on o.hang_id=h.id
                LEFT JOIN khuyen_mai km on o.khuyen_mai_id = km.id 
                                  WHERE o.san_pham_id =:idSP and
                               o.mau_sac_id=:idMS and
                          o.kich_thuoc_id=:idKT    
                       """, nativeQuery = true)
    DetailCTSPClientRespon detailCTSPClientByIdSPbyIdSizebyIdMs(@Param("idSP") String idSP, @Param("idMS") String idMS, @Param("idKT") String idKT);

    @Query(value = """
             SELECT distinct o.id AS idCTSP,MIN(ha.url) AS linkAnh ,sp.ten AS tenSP ,kt.ten AS tenKT,ms.ten AS tenMS,ms.ma AS maMS,
             o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai, km.ten as tenKM , km.gia_tri_khuyen_mai as giaTriKhuyenMai , km.loai as loaiKM
             FROM duanmishoes.chi_tiet_san_pham o
             JOIN duanmishoes.san_pham sp  on o.san_pham_id=sp.id
             JOIN duanmishoes.kich_thuoc kt  on o.kich_thuoc_id=kt.id
             JOIN duanmishoes.mau_sac ms  on o.mau_sac_id=ms.id
             JOIN duanmishoes.hinh_anh ha on o.id=ha.chi_tiet_san_pham_id 
             LEFT JOIN duanmishoes.khuyen_mai km on o.khuyen_mai_id = km.id
             where o.trang_thai =0 AND                                                    
            ((:#{#ctspSearch.tenCT} IS NULL OR sp.ten LIKE (%:#{#ctspSearch.tenCT}%) ) AND
            (:#{#ctspSearch.idKT} IS NULL OR o.kich_thuoc_id =:#{#ctspSearch.idKT} ) AND
            (:#{#ctspSearch.idMS} IS NULL OR o.mau_sac_id =:#{#ctspSearch.idMS} ) AND
            (:#{#ctspSearch.idCL} IS NULL OR o.chat_lieu_id =:#{#ctspSearch.idCL} ) AND
            (:#{#ctspSearch.idDC} IS NULL OR o.de_giay_id =:#{#ctspSearch.idDC} ) AND
            (:#{#ctspSearch.idDM} IS NULL OR o.danh_muc_id =:#{#ctspSearch.idDM} ) AND
            (:#{#ctspSearch.idH} IS NULL OR o.hang_id =:#{#ctspSearch.idH} ) AND
            (:#{#ctspSearch.trangThaiCT} IS NULL OR o.trang_thai =:#{#ctspSearch.trangThaiCT}) AND
            (:#{#ctspSearch.soLuongCT} IS NULL OR o.so_luong <=:#{#ctspSearch.soLuongCT} OR o.so_luong > 0) AND
            (:#{#ctspSearch.giaBanCT} IS NULL OR o.gia_ban <=:#{#ctspSearch.giaBanCT} OR o.gia_ban > 0)) 
            group by o.id
                     """, nativeQuery = true)
    List<ChiTietSanPhamForBanHang> getTimBanHang(CTSPSearch ctspSearch);
    @Query(value = """
            SELECT o.ghi_chu as ghiChu,o.id AS id,o.mo_ta AS moTa ,sp.id AS sanPham,sp.ten AS tenSP ,kt.ten AS kichThuoc,ms.ma AS mauSac,cl.ten AS chatLieu,dc.ten AS deGiay,dm.ten AS danhMuc
            ,h.ten AS hang,o.so_luong AS soLuong,o.gia_ban AS giaBan,o.trang_thai AS trangThai , km.loai as loaiKM , km.gia_tri_khuyen_mai as giaTriKhuyenMai
            FROM chi_tiet_san_pham o
            JOIN san_pham sp  on o.san_pham_id=sp.id
            JOIN kich_thuoc kt  on o.kich_thuoc_id=kt.id
            JOIN mau_sac ms  on o.mau_sac_id=ms.id
            JOIN chat_lieu cl  on o.chat_lieu_id=cl.id
            JOIN de_giay dc  on o.de_giay_id=dc.id
            JOIN danh_muc dm  on o.danh_muc_id=dm.id
            JOIN hang h  on o.hang_id=h.id
            LEFT JOIN khuyen_mai km on o.khuyen_mai_id = km.id
            WHERE o.id=:idCT
                     """, nativeQuery = true)
    DetailCTSPRespone detailCTSPGioHang(@Param("idCT") String idCT);


    @Query(value = "select chi_tiet_san_pham.so_luong as soLuongTon , " +
            "hoa_don_chi_tiet.so_luong as soLuong " +
            "from chi_tiet_san_pham left join hoa_don_chi_tiet on chi_tiet_san_pham.id = hoa_don_chi_tiet.chi_tiet_san_pham_id where chi_tiet_san_pham.id =:idSP and hoa_don_chi_tiet.hoa_don_id =:idHD",nativeQuery = true)
    SoLuongVaSoLuongTon getSLAndSLT(String idSP,String idHD);
}
