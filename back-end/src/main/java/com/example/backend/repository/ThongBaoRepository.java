package com.example.backend.repository;

import com.example.backend.entity.ThongBao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongBaoRepository extends JpaRepository<ThongBao,String> {
    @Query("select  pot from  ThongBao  pot where pot.loai =0 or  pot.loai =3 or  pot.loai =6 order by pot.ngayTao desc ")
    List<ThongBao> findAllAdmin();

    @Query(value = """
            SELECT COUNT(pot.id) AS total  FROM thong_bao pot WHERE (pot.loai = 0 OR pot.loai = 3 OR pot.loai = 6) and pot.trang_thai=0
            """,nativeQuery = true)
    Integer countAdmin();


    @Query("select  pot from  ThongBao  pot where (pot.loai =1 or  pot.loai =2 or  pot.loai =4 or  pot.loai =5 or  pot.loai =7 or  pot.loai =8) and pot.nguoiDung.id=:id order by pot.trangThai asc ")
    List<ThongBao> findAllKH(String id);

    @Query(value = """
            SELECT COUNT(pot.id) AS total  FROM thong_bao pot WHERE 
            (pot.loai =1 or  pot.loai =2 or  pot.loai =4 or  pot.loai =5 or  pot.loai =7 or  pot.loai =8) 
            and pot.trang_thai=0 and pot.nguoi_dung=:id
            """,nativeQuery = true)
    Integer countKH(String id);
}
