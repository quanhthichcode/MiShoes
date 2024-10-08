package com.example.backend.controller.user;

import com.example.backend.dto.request.HoaDonCLient.HoaDonClientRequest;
import com.example.backend.dto.response.VoucherRespone;
import com.example.backend.entity.*;
import com.example.backend.repository.CTSPRepository;
import com.example.backend.repository.CongThucRepository;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.service.*;
import com.example.backend.vnp_1.PayService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.*;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ban-hang-client")
@RequiredArgsConstructor
public class BanHangClient {

    @Autowired
    BanHangService banHangService;
    @Autowired
    HoaDonChiTietService hoaDonChiTietService;
    @Autowired
    CTSPRepository ctspRepository;
    @Autowired
    CongThucRepository congThucRepository;
    @Autowired
    VoucherService voucherService;
    @Autowired
    PayService payService;
    @Autowired
    HoaDonServicee hoaDonServicee;
    @Autowired
    NguoiDungService nguoiDungService;
    @Autowired
    LichSuHoaDonService lichSuHoaDonService;
    @Autowired
    ThanhToanService thanhToanService;
    @Autowired
    HoaDonRepository hoaDonRepository;
    @Autowired
    KhachHangService khachHangService;

    private  String  BASE_FRONTEND_ENDPOINT = "http://localhost:3000";



    @PutMapping("/them-voucher/{idHD}/{idVoucher}")
    public ResponseEntity<?> updateVoucherToHD(@PathVariable("idHD") String idHD, @PathVariable("idVoucher") String idVoucher) {
        return ResponseEntity.ok(hoaDonServicee.addVoucherToHD(idHD,idVoucher));
    }


    @GetMapping("/payment-callback")
    public ResponseEntity<Boolean> paymentCallback(@RequestParam Map<String, String> queryParams, HttpServletResponse response) throws IOException {
        String vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        if ("00".equals(vnp_ResponseCode)) {
            response.sendRedirect(BASE_FRONTEND_ENDPOINT + "/thanh-toan-thanh-cong");
            return ResponseEntity.ok(true);
        } else{
            response.sendRedirect(BASE_FRONTEND_ENDPOINT + "/thanh-toan-that-bai");
        }
        return ResponseEntity.ok(false);
    }


    @PostMapping("/check-out")
    public  Boolean create(@RequestBody HoaDonClientRequest hoaDonClientRequest){
        System.out.println("Hóa đơn client request :"+hoaDonClientRequest);
        return banHangService.createHoaDon(hoaDonClientRequest);
    }
    @GetMapping("/voucher-tot-nhat/{idKH}/{money}")
    public ResponseEntity<?> getVoucherTotNhat(@PathVariable("money")String money,@PathVariable("idKH")String idKH){
        String idV = "";
        BigDecimal tienDuocKM = new BigDecimal("0");
        if (!idKH.isEmpty()){
            // NguoiDung kh = nguoiDungService.findByID(idKH);
            List<VoucherRespone> listV = voucherService.getVoucherBanHang(idKH);
            for (VoucherRespone v : listV){
                BigDecimal mucDoKM = v.getLoaiVoucher().equalsIgnoreCase("Tiền mặt") ? new BigDecimal(v.getMucDo()) : new BigDecimal(money).multiply(new BigDecimal((v.getMucDo()))).divide(new BigDecimal("100"));
                if (mucDoKM.compareTo(v.getGiamToiDa()) > 0){
                    mucDoKM = v.getGiamToiDa();
                }
                if (new BigDecimal(money).compareTo(v.getDieuKien())>=0 && mucDoKM.compareTo(tienDuocKM)>0) {
                    tienDuocKM = mucDoKM;
                    idV = v.getId();
                }
            }
        } else {
            List<VoucherRespone> list = voucherService.noLimited();
            for (VoucherRespone v : list){
                BigDecimal mucDoKM = v.getLoaiVoucher().equalsIgnoreCase("Tiền mặt") ? new BigDecimal(v.getMucDo()) : new BigDecimal(money).multiply(new BigDecimal((v.getMucDo()))).divide(new BigDecimal("100"));
                if (mucDoKM.compareTo(v.getGiamToiDa()) > 0){
                    mucDoKM = v.getGiamToiDa();
                }
                if (new BigDecimal(money).compareTo(v.getDieuKien())>=0 && mucDoKM.compareTo(tienDuocKM)>0) {
                    tienDuocKM = mucDoKM;
                    idV = v.getId();
                }
            }
        }
        if(idV.equals("")) return null;
        return ResponseEntity.ok(voucherService.detailVoucher(idV));
    }

    @GetMapping("/khuyen-mai-sap-dat-duoc/{idKH}/{money}/{idV}")
    public List<BigDecimal> khuyenMaiSapDatDuoc (@PathVariable("idKH")String idKH, @PathVariable("money")String money,@PathVariable("idV")String idV){
        BigDecimal soTienConThieu = new BigDecimal("0");
        BigDecimal soTienDuocGiam = new BigDecimal("0");

        Voucher vc = new Voucher();
        if(idV != null) {
            vc = voucherService.getVoucherByID(idV);
        }

        BigDecimal soTienDangDuocGiam = new BigDecimal("0");
        if (vc != null) {
            soTienDangDuocGiam = vc.getLoaiVoucher().equalsIgnoreCase("Tiền mặt") ?
                    new BigDecimal(vc.getMucDo()) :
                    (new BigDecimal(String.valueOf(vc.getMucDo()* Float.valueOf(money) / 100)).compareTo(vc.getGiamToiDa()) < 0)
                            ? new BigDecimal(String.valueOf(vc.getMucDo()* Float.valueOf(money) / 100)) : vc.getGiamToiDa();
        }

        if (!idKH.equalsIgnoreCase("null")){
            List<VoucherRespone> listV = voucherService.getVoucherBanHang(idKH);
            for (VoucherRespone v : listV){
                if (v.getDieuKien().compareTo(new BigDecimal(money)) <= 0) continue;  // loại bỏ những voucher đã hợp yêu cầu
                // giả sử vừa đủ điều kiện => giá được giảm
                BigDecimal mucDoKM = v.getLoaiVoucher().equalsIgnoreCase("Tiền mặt") ? new BigDecimal(v.getMucDo()) : v.getDieuKien().multiply(new BigDecimal((v.getMucDo()))).divide(new BigDecimal("100"));
                if (mucDoKM.compareTo(v.getGiamToiDa()) > 0){
                    mucDoKM = v.getGiamToiDa(); // trường hợp lớn hơn giá giảm tối đa
                }
                if (soTienConThieu.compareTo(new BigDecimal("0")) == 0 && soTienDuocGiam.compareTo(new BigDecimal("0")) ==0 && mucDoKM.compareTo(soTienDangDuocGiam) > 0) {
                    soTienConThieu = v.getDieuKien().subtract(new BigDecimal(money));
                    soTienDuocGiam = mucDoKM;
                } else if (soTienConThieu.compareTo(v.getDieuKien().subtract(new BigDecimal(money))) >= 0 && soTienDuocGiam.compareTo(mucDoKM) <= 0 && mucDoKM.compareTo(soTienDangDuocGiam) > 0) {
                    soTienConThieu = v.getDieuKien().subtract(new BigDecimal(money));
                    soTienDuocGiam = mucDoKM;
                }

            }
        } else {
            List<VoucherRespone> list = voucherService.noLimited();
            for (VoucherRespone v : list){
                if (v.getDieuKien().compareTo(new BigDecimal(money)) <= 0) continue;  // loại bỏ những voucher đã hợp yêu cầu
                // giả sử vừa đủ điều kiện => giá được giảm
                BigDecimal mucDoKM = v.getLoaiVoucher().equalsIgnoreCase("Tiền mặt") ? new BigDecimal(v.getMucDo()) : v.getDieuKien().multiply(new BigDecimal((v.getMucDo()))).divide(new BigDecimal("100"));
                 if (mucDoKM.compareTo(v.getGiamToiDa()) > 0){
                    mucDoKM = v.getGiamToiDa(); // trường hợp lớn hơn giá giảm tối đa

                }
                if ((soTienConThieu.compareTo(new BigDecimal("0")) == 0) && (soTienDuocGiam.compareTo(new BigDecimal("0")) ==0) && (mucDoKM.compareTo(soTienDuocGiam) > 0)) {
                    soTienConThieu = v.getDieuKien().subtract(new BigDecimal(money));
                    soTienDuocGiam = mucDoKM;
                } else if (soTienConThieu.compareTo(v.getDieuKien().subtract(new BigDecimal(money))) >= 0 && soTienDuocGiam.compareTo(mucDoKM) <= 0 && mucDoKM.compareTo(soTienDangDuocGiam) > 0)  {
                    soTienConThieu = v.getDieuKien().subtract(new BigDecimal(money));
                    soTienDuocGiam = mucDoKM;
                }
            }
        }
        List<BigDecimal> list = new ArrayList<>();
        list.add(soTienConThieu);
        list.add(soTienDuocGiam);
        return list;
    }
    @GetMapping("/voucher/{idND}")
    public ResponseEntity<?> getAllVoucherWithIDKH(@PathVariable("idND")String idND){
        return ResponseEntity.ok(voucherService.getVoucherBanHang(idND));
    }


    @GetMapping("/voucher/no-limited")
    public ResponseEntity<?> getAllVoucherNoLimited(){
        return ResponseEntity.ok(voucherService.noLimited());
    }
    @GetMapping("/khach-hang/dia-chi-mac-dinh/{idKH}")
    public  ResponseEntity<?> getDiaChiMacDinh(@PathVariable("idKH") String idKH){
        return ResponseEntity.ok(khachHangService.findDiaChiMacDinh(idKH));
    }
    @PostMapping("/chuyen-khoan/{money}")
    public  Map<String, String>  createPayment(@PathVariable("money")String money) throws UnsupportedEncodingException {
        try {
            return payService.payWithVNPAY(money);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

}
