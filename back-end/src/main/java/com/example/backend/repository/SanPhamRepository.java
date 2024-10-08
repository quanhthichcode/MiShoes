package com.example.backend.repository;

import com.example.backend.dto.request.sanphamsearch.SanPhamSearch;
import com.example.backend.dto.response.sanpham.SanPhamRespone;
import com.example.backend.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SanPhamRepository extends JpaRepository<SanPham, String> {

    @Query(value = """
            select
            	a.id as idSP,
            	a.ma as ma ,
            	a.ten as ten,
            	case
            		when SUM(coalesce(o.so_luong, 0)) is null then N'0'
            		else SUM(coalesce(o.so_luong, 0))
            	end as soLuong,
            	a.trang_thai as trangThai
            from
            	san_pham a
            left join chi_tiet_san_pham o on
            	o.san_pham_id = a.id
            group by
            	ma,
            	ten,
            	a.trang_thai,
            	a.id
            having SUM(coalesce(o.so_luong, 0))> 0
            order by
            	a.ma desc
            """, nativeQuery = true)
    List<SanPhamRespone> getALLSP();

    @Query(value = "select san_pham.id from san_pham join chi_tiet_san_pham on san_pham.id = chi_tiet_san_pham.san_pham_id where chi_tiet_san_pham.id = ?1", nativeQuery = true)
    List<String> getIDSPbyCTSP(String id);

    @Query(value = """
            SELECT  
             a.id  AS idSP
            ,a.ma AS ma ,a.ten AS ten
            ,CASE WHEN SUM(coalesce(o.so_luong,0)) IS NULL THEN N'0' ELSE SUM(coalesce(o.so_luong,0)) END AS soLuong
            , a.trang_thai AS trangThai
            FROM san_pham a LEFT JOIN chi_tiet_san_pham o  on o.san_pham_id= a.id GROUP BY ma,ten,a.trang_thai,a.id HAVING 
             (:#{#sanPhamSearch.ten} IS NULL OR a.ma LIKE (%:#{#sanPhamSearch.ten}%) OR a.ten LIKE (%:#{#sanPhamSearch.ten}%) ) AND
             ( :#{#sanPhamSearch.trangThai} IS NULL OR a.trang_thai=:#{#sanPhamSearch.trangThai})AND
             (:#{#sanPhamSearch.soLuong} IS NULL OR SUM(coalesce(o.so_luong,0)) BETWEEN 0 AND :#{#sanPhamSearch.soLuong} ) 
             ORDER BY a.ma DESC
                    """, nativeQuery = true)
    List<SanPhamRespone> tim(SanPhamSearch sanPhamSearch);
}
