package com.example.backend.service;

import com.example.backend.dto.request.GioHangChiTietRequest;
import com.example.backend.dto.request.HoaDonChiTietRequest;
import com.example.backend.dto.response.HoaDonChiTietBanHangRespone;
import com.example.backend.dto.response.HoaDonChiTietRespone;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.HoaDonChiTiet;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.HoaDonChiTietRepository;
import com.example.backend.repository.HoaDonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HoaDonChiTietService {
    @Autowired
    HoaDonChiTietRepository hoaDonChiTietRepository;
    @Autowired
    CTSPRepository ctspRepository;
    @Autowired
    HoaDonRepository hoaDonRepository;
    public List<HoaDonChiTietBanHangRespone> getAllHDCTByHD(String ma){
        System.out.println("Ma"+ma);
        if (hoaDonRepository.getHDByMa(ma) == null) return  null;
        String id = hoaDonRepository.getHDByMa(ma).getId();
        return hoaDonChiTietRepository.getAllHDCTByHD(id);
    }
    public HoaDonChiTietRespone getOneHDCT(String idHD,String idCTSP){
        return hoaDonChiTietRepository.getOneHDCT(idHD,idCTSP);
    }
    public HoaDonChiTiet addHDCT(HoaDonChiTietRequest request){
        System.out.println("Hóa đơn chi tiết request"+request);
        String idCTSP= request.getChiTietSanPham();
        HoaDon hoaDon = hoaDonRepository.getHDByMa(request.getHoaDon());
        request.setHoaDon(hoaDon.getId());
        HoaDonChiTiet hdct=request.map(new HoaDonChiTiet());
        BigDecimal giaHienTai = hoaDon.getGiaGoc() == null ? new BigDecimal("0") : hoaDon.getGiaGoc();
        BigDecimal giaThem = request.getGiaSauGiam();
        hoaDon.setGiaGoc(giaHienTai.add(giaThem));
        hoaDon.setThanhTien(giaHienTai.add(giaThem));
        ChiTietSanPham ctsp=ctspRepository.findById(idCTSP).get();
        HoaDonChiTiet checkHDCT = hoaDonChiTietRepository.getHDCTByCTSPAndHD(idCTSP,hoaDon.getId());
        if(checkHDCT != null){
            System.out.println("ID Hóa đơn"+hoaDon.getId());
            return updateSL1(idCTSP,hoaDon.getId());
        }
        hdct.setNgayTao(LocalDateTime.now());
        hdct.setTrangThai(0);
        ctsp.setSoLuong(ctsp.getSoLuong()- request.getSoLuong());
        ctspRepository.save(ctsp);
        hoaDonRepository.save(hoaDon);
        return  hoaDonChiTietRepository.save(hdct);
    }


    public HoaDonChiTiet updateSL1(String idCTSP,String idHD) {
        HoaDonChiTiet hdct = hoaDonChiTietRepository.getHDCTByCTSPAndHD(idCTSP, idHD);
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        int slt = ctsp.getSoLuong();
        int slh = hdct.getSoLuong();
        int sltd = slh + 1;
        hdct.setSoLuong(sltd);
        ctsp.setSoLuong(slt - 1);
        System.out.println("HDCT sau update" + hdct);
        System.out.println("CTSP sau update" + ctsp);
        HoaDon hoaDon = hoaDonRepository.getHoaDonByIDHD(idHD);
        BigDecimal tong = new BigDecimal("0");
        List<HoaDonChiTiet> list = hoaDonChiTietRepository.getAllHDCTByIDHD(idHD);
        for (HoaDonChiTiet x : list) {
            if (x.getChiTietSanPham().getId().equals(idCTSP)) {
                tong = tong.add(x.getGiaSauGiam().multiply(BigDecimal.valueOf(sltd)));

            } else {
                tong = tong.add(x.getGiaSauGiam().multiply(BigDecimal.valueOf(x.getSoLuong())));
            }
        }
        BigDecimal giaGiam = hoaDon.getGiaGiamGia() == null ? new BigDecimal("0") : hoaDon.getGiaGiamGia();
        hoaDon.setGiaGoc(tong);
        hoaDon.setThanhTien(tong.subtract(giaGiam));
        hoaDonRepository.save(hoaDon);
        ctspRepository.save(ctsp);
        return hoaDonChiTietRepository.save(hdct);
    }
    public HoaDonChiTiet addHDCTClient(HoaDonChiTietRequest request){
        HoaDonChiTiet hdct=request.map(new HoaDonChiTiet());
        return  hoaDonChiTietRepository.save(hdct);

    }
    public HoaDonChiTiet updateTruSl(HoaDonChiTietRequest request){
        HoaDonChiTiet hdct=request.map(new HoaDonChiTiet());
        HoaDonChiTiet hdctTonTai=hoaDonChiTietRepository.findById(request.getId()).get();
        hdctTonTai.setSoLuong(hdctTonTai.getSoLuong()-(hdct.getSoLuong()- hdctTonTai.getSoLuong()));
        String idCTSP= request.getChiTietSanPham();
        ChiTietSanPham ctsp=ctspRepository.findById(idCTSP).get();
        ctsp.setSoLuong(ctsp.getSoLuong()+ (hdct.getSoLuong()- hdctTonTai.getSoLuong()));
        ctspRepository.save(ctsp);
        hdctTonTai.setNgaySua(LocalDateTime.now());

        return  hoaDonChiTietRepository.save(hdctTonTai);
    }
    public HoaDonChiTiet deleteHDCT(HoaDonChiTietRequest request){
        HoaDonChiTiet hdctTonTai=hoaDonChiTietRepository.findById(request.getId()).get();
        ChiTietSanPham ctsp=ctspRepository.findById(request.getId()).get();
        ctsp.setSoLuong(ctsp.getSoLuong()+request.getSoLuong());
        hdctTonTai.setNgaySua(LocalDateTime.now());
        hdctTonTai.setTrangThai(2);
        return  hoaDonChiTietRepository.save(hdctTonTai);
    }

    public void deleteHDCTAndRollBackInSell(String idCTSP,String ma){
        String idHD = hoaDonRepository.getHDByMa(ma).getId();
        HoaDonChiTiet hdct = hoaDonChiTietRepository.getHDCTByCTSPAndHD(idCTSP,idHD);
        System.out.println("Hóa đơn chi tiết"+hdct);
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        int slt = ctsp.getSoLuong();
        int slh = hdct.getSoLuong();
        ctsp.setSoLuong(slt+slh);
        ctspRepository.save(ctsp);
        BigDecimal tong = new BigDecimal("0");
        HoaDon hoaDon = hoaDonRepository.getHoaDonByIDHD(idHD);
        List<HoaDonChiTiet> list = hoaDonChiTietRepository.getAllHDCTByIDHD(idHD);
        for (HoaDonChiTiet x : list) {
            if (x.getChiTietSanPham().getId().equals(idCTSP)){
               // tong = tong.add(x.getGiaSauGiam().multiply(BigDecimal.valueOf(soLuongCapNhat)));
                continue;
            }
            tong = tong.add(x.getGiaSauGiam().multiply(BigDecimal.valueOf(x.getSoLuong())));
        }
        BigDecimal giaGiam = hoaDon.getGiaGiamGia() == null ? new BigDecimal("0") : hoaDon.getGiaGiamGia();
        hoaDon.setGiaGoc(tong);
        hoaDon.setThanhTien(tong.subtract(giaGiam));
        hoaDonRepository.save(hoaDon);
        hoaDonChiTietRepository.delete(hdct);
    }

    public void huyDonHang(String idCTSP,String idHD){
        HoaDonChiTiet hdct = hoaDonChiTietRepository.getHDCTByCTSPAndHD(idCTSP,idHD);
        System.out.println("Hóa đơn chi tiết"+hdct);
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        int slt = ctsp.getSoLuong();
        int slh = hdct.getSoLuong();
        ctsp.setSoLuong(slt+slh);
        ctspRepository.save(ctsp);
    }
    public void updateGia(String idCTSP, BigDecimal giaGiam , BigDecimal giaSauGiam){
        List<HoaDonChiTiet> list = hoaDonChiTietRepository.getAllHDCTByCTSP(idCTSP);
        System.out.println("Gia giam"+giaGiam);
        System.out.println("gia sau giam"+giaSauGiam);
        System.out.println("List"+list.size());
        for (HoaDonChiTiet h : list){
            System.out.println("H"+h);
//            h.setGiaGiam(giaSauGiam.subtract(giaGiam));
//            h.setGiaSauGiam(giaGiam);
            h.setGiaGiam(giaGiam);
            h.setGiaSauGiam(giaSauGiam.subtract(giaGiam));
            hoaDonChiTietRepository.save(h);
            System.out.println( hoaDonChiTietRepository.save(h));
        }
    }

    public HoaDonChiTiet updateSL(String idCTSP,String ma,int soLuongCapNhat){
        String idHD = hoaDonRepository.getHDByMa(ma).getId();
        HoaDonChiTiet hdct = hoaDonChiTietRepository.getHDCTByCTSPAndHD(idCTSP,idHD);
        ChiTietSanPham ctsp = ctspRepository.getReferenceById(idCTSP);
        int slt = ctsp.getSoLuong();
        int slh = hdct.getSoLuong();
        int sltd = soLuongCapNhat-slh;
        hdct.setSoLuong(soLuongCapNhat);
        ctsp.setSoLuong(slt-sltd);
        System.out.println("HDCT sau update"+hdct);
        System.out.println("CTSP sau update"+ctsp);
        HoaDon hoaDon = hoaDonRepository.getHoaDonByIDHD(idHD);
        BigDecimal tong = new BigDecimal("0");
        List<HoaDonChiTiet> list = hoaDonChiTietRepository.getAllHDCTByIDHD(idHD);
        for (HoaDonChiTiet x : list) {
            if (x.getChiTietSanPham().getId().equals(idCTSP)){
                tong = tong.add(x.getGiaSauGiam().multiply(BigDecimal.valueOf(soLuongCapNhat)));

            } else {
                tong = tong.add(x.getGiaSauGiam().multiply(BigDecimal.valueOf(x.getSoLuong())));
            }
        }
        BigDecimal giaGiam = hoaDon.getGiaGiamGia() == null ? new BigDecimal("0") : hoaDon.getGiaGiamGia();
        hoaDon.setGiaGoc(tong);
        hoaDon.setThanhTien(tong.subtract(giaGiam));
        hoaDonRepository.save(hoaDon);
        ctspRepository.save(ctsp);
       return hoaDonChiTietRepository.save(hdct);
    }

    public List<HoaDonChiTiet> getAllHDCTByIDHD(String idHD){
        List<HoaDonChiTiet> list = hoaDonChiTietRepository.findHoaDonChiTietByHoaDon_Id(idHD);
        return list;
    }

    public HoaDonChiTiet saveHDCT(HoaDonChiTiet hdct){
       return hoaDonChiTietRepository.save(hdct);
    }

    public List<HoaDonChiTiet> getAllHDCTByIDCTSP(String idCTSP){
        List<HoaDonChiTiet> list = hoaDonChiTietRepository.getAllHDCTByCTSP(idCTSP);
        return list;
    }

    public HoaDonChiTiet getHDCTByID(String idHDCT){
        return hoaDonChiTietRepository.findById(idHDCT).get();
    }
}
