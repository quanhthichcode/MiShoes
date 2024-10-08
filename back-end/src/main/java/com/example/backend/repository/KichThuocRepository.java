package com.example.backend.repository;

import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.response.sanpham.DeGiayRespone;
import com.example.backend.dto.response.sanpham.KichThuocRespone;
import com.example.backend.entity.KichThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KichThuocRepository extends JpaRepository<KichThuoc, String> {
    @Query(value = """
    SELECT o.id as id,o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM kich_thuoc o ORDER BY o.ma ASC
            """, nativeQuery = true)
    List<KichThuocRespone> getALLKT();

    @Query(value = """
    SELECT o.id as id,o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM kich_thuoc o WHERE 
     (:#{#bangConSearch.ten} IS NULL OR o.ma LIKE (%:#{#bangConSearch.ten}%) OR o.ten LIKE (%:#{#bangConSearch.ten}%) ) AND
     ( :#{#bangConSearch.trangThai} IS NULL OR o.trang_thai=:#{#bangConSearch.trangThai})
    ORDER BY o.ma DESC
            """, nativeQuery = true)
    List<KichThuocRespone> timKT(BangConSearch bangConSearch);
}
