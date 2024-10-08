package com.example.backend.repository;

import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.response.sanpham.ChatLieuRespone;
import com.example.backend.dto.response.sanpham.DeGiayRespone;
import com.example.backend.entity.DeGiay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeGiayRepository extends JpaRepository<DeGiay, String> {
    @Query(value = """
    SELECT o.id as id,o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM de_giay o ORDER BY o.ma ASC
            """, nativeQuery = true)
    List<DeGiayRespone> getALLDC();

    @Query(value = """
    SELECT o.id as id,o.ma as ma ,o.ten as ten, o.trang_thai as trangThai FROM de_giay o WHERE 
     (:#{#bangConSearch.ten} IS NULL OR o.ma LIKE (%:#{#bangConSearch.ten}%) OR o.ten LIKE (%:#{#bangConSearch.ten}%) ) AND
     ( :#{#bangConSearch.trangThai} IS NULL OR o.trang_thai=:#{#bangConSearch.trangThai})
    ORDER BY o.ma DESC
            """, nativeQuery = true)
    List<DeGiayRespone> timDG(BangConSearch bangConSearch);
}
