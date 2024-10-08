package com.example.backend.service;


import com.example.backend.dto.response.BieuDoRespon;
import com.example.backend.dto.response.SanPhamBanChayRespon;
import com.example.backend.dto.response.ThongKeRespon;
import com.example.backend.dto.response.TrangThaiHoaDonRespon;
import com.example.backend.repository.ThongKeResponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class ThongKeService {
    @Autowired
    ThongKeResponsitory thongKeResponsitory;
    public  ThongKeRespon thongKeTheoNgay(){
        return thongKeResponsitory.thongKeTheoNgay();
    }
    public  ThongKeRespon thongKeTheoThang(){
        return thongKeResponsitory.thongKeTheoThang();
    }
    public  ThongKeRespon thongKeTheoNam(){
        return thongKeResponsitory.thongKeTheoNam();
    }
    public  ThongKeRespon getDoanhThuNgayTruoc(){
        return thongKeResponsitory.doanhThuNgayTruoc();
    }
    public  ThongKeRespon getDoanhThuThangTruoc(){
        return thongKeResponsitory.doanhThuThangTruoc();
    }
    public  ThongKeRespon getDoanhThuNamTruoc(){
        return thongKeResponsitory.doanhThuNamTruoc();
    }
    public List<SanPhamBanChayRespon> getSpBanChayNgay(){return thongKeResponsitory.getSPBanChayNgay();}
    public List<SanPhamBanChayRespon> getSpBanChayThang(){return thongKeResponsitory.getSPBanChayThang();}
    public List<SanPhamBanChayRespon> getSpBanChayNam(){return thongKeResponsitory.getSPBanChayNam();}
    public List<SanPhamBanChayRespon> getSpBanSapHet(){return thongKeResponsitory.getSPSapHet();}
    public List<SanPhamBanChayRespon> getSpBanChayTuan(){return thongKeResponsitory.getSPBanChayTuan();}
    public List<BieuDoRespon> getBieuDoNgay(){
        return thongKeResponsitory.getBieuDoNgay();
    }
    public  List<BieuDoRespon> getBieuDoTuan(){
        return thongKeResponsitory.getBieuDoTuan();
    }
    public  List<BieuDoRespon> getBieuDoThang(){
        return thongKeResponsitory.getBieuDoThang();
    }
    public  List<BieuDoRespon> getBieuDoNam(){
        return thongKeResponsitory.getBieuDoNam();
    }
    public List<TrangThaiHoaDonRespon> getTrangThaiHoaDonNgay(){
        return thongKeResponsitory.getTrangThaiHoaDonNgay();
    }
    public List<TrangThaiHoaDonRespon> getTrangThaiHoaDonThang(){
        return thongKeResponsitory.getTrangThaiHoaDonThang();
    }
    public List<TrangThaiHoaDonRespon> getTrangThaiHoaDonNam(){
        return thongKeResponsitory.getTrangThaiHoaDonNam();
    }
    public List<TrangThaiHoaDonRespon> getTrangThaiHoaDonTuan(){
        return thongKeResponsitory.getTrangThaiHoaDonTuan();
    }
    public Integer getSPBanNgay(){
        return thongKeResponsitory.getSPBanNgay();
    }
    public Integer getSPBanNgayTruoc(){
        return thongKeResponsitory.getSPBanNgayTruoc();
    }

}
