package com.example.backend.service;

import com.example.backend.dto.request.VoucherRequest;
import com.example.backend.dto.response.AdminVoucher;
import com.example.backend.dto.response.VoucherRespone;
import com.example.backend.entity.NguoiDungVoucher;
import com.example.backend.entity.Voucher;
import com.example.backend.dto.request.VoucherSearch;
import com.example.backend.repository.VoucherRepository;
import com.example.backend.util.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VoucherService {
    @Autowired
    VoucherRepository vr;
    @Autowired
    NguoiDungVoucherService nguoiDungVoucherService;
    public List<Voucher> getAll(){
        Sort sort=Sort.by(Sort.Order.desc("ngayTao"));
//        return vr.findAll(sort);
        return vr.findAllByOrderByNgayTaoDesc();
    }
    public Voucher update(Voucher v){
        return vr.save(v);
    }
    public Voucher detail (String id){
        return  vr.findById(id).get();
    }
    public List<VoucherRespone> noLimited(){
        Sort sort=Sort.by(Sort.Order.desc("ngayTao"));
        return   vr.getVoucherTatCa();
    }
    public List<Voucher> getTim(String key, Date ngayBD,Date ngayKT){
        return vr.search(key,ngayBD,ngayKT);
    }
    public Voucher addVoucher(VoucherRequest request){
        Voucher v=request.map(new Voucher());
        return vr.save(v);
    }
    public Voucher updateTTNgung(String id,VoucherRequest request){
        Voucher v=request.map(new Voucher());
        v.setId(id);
        v.setTrangThai(Status.NGUNG_HOAT_DONG);
        List<String> listIDKH = nguoiDungVoucherService.getAllByVoucher(id);
        if (listIDKH.size() > 0) {
            for (String x : listIDKH) {
                nguoiDungVoucherService.updateTrangThai_DaKetThuc(x, id);
            }
        }
        return vr.save(v);
    }
    public Voucher updateTTHD(String id,VoucherRequest request){
        System.out.println("Vào update TTHD");
        Voucher v=request.map(new Voucher());
        System.out.println("V"+v);
        v.setId(id);
        v.setTrangThai(Status.DANG_HOAT_DONG);
        return vr.save(v);
    }
    public Voucher updateTTSap(String id,VoucherRequest request){
        Voucher v=request.map(new Voucher());
        v.setId(id);
        v.setTrangThai(Status.SAP_DIEN_RA);
        return vr.save(v);
    }


    public Voucher updateTTTamDung(String id,VoucherRequest request){
        Voucher v=request.map(new Voucher());
        v.setId(id);
        v.setTrangThai(Status.TAM_DUNG);
        return vr.save(v);
    }
    public Voucher detailVoucher(String id){return vr.findById(id).get();}


    public Voucher add (Voucher v){
        return vr.save(v);
    }
    public List<AdminVoucher> getSearch(VoucherSearch voucherSearch) {
        return vr.searchVoucher(voucherSearch);
    }
    public Voucher getVoucherHopLe(BigDecimal tien){
        return vr.getVoucherHopLe(tien);
    }
    public LocalDateTime convertTime(LocalDateTime ldt0){
        ZoneId utc = ZoneId.of("UTC");
        ZoneId plus7Zone = ZoneId.of("Asia/Bangkok");
        ZonedDateTime utcZonedDateTime = ZonedDateTime.of(ldt0, utc);
        ZonedDateTime plus7ZonedDateTime = utcZonedDateTime.withZoneSameInstant(plus7Zone);
        LocalDateTime plus7DateTime = plus7ZonedDateTime.toLocalDateTime();
        return plus7DateTime;
    }
    public List<VoucherRespone> getVoucherBanHang(String id){
        List<VoucherRespone> listAll=vr.getVoucherTatCa();
        List<VoucherRespone> listVoucherNguoiDung=nguoiDungVoucherService.getVoucherByNguoiDung(id);
        List<VoucherRespone> list=new ArrayList<>();
        list.addAll(listAll);
        list.addAll(listVoucherNguoiDung);
        System.out.println(list+">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        return list;
    }
    public Voucher updateTruSL(String id){
        Voucher v=vr.findById(id).get();
        v.setSoLuong(v.getSoLuong()-1);
        if(v.getSoLuong()==0){
            v.setTrangThai(Status.DA_DUNG_HET);
        }
        return vr.save(v);
    }
    public Voucher updateCongSL(String id){
        Voucher v=vr.findById(id).get();
        v.setSoLuong(v.getSoLuong()+1);
        if(v.getTrangThai()==Status.DA_DUNG_HET){
            v.setTrangThai(Status.DANG_HOAT_DONG);
        }
        return vr.save(v);
    }

    public Voucher getVoucherByID(String idV){
        return vr.detail(idV);
    }
}
