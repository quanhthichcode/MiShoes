package com.example.backend.infrastructure.exportPdf;


import com.example.backend.dto.request.HoaDonChiTietSendMailRequest;
import com.example.backend.dto.response.HoaDonChiTietBanHangRespone;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.Voucher;
import com.example.backend.model.BienLaiHoaDon;
import com.example.backend.repository.DiaChiRepository;
import com.example.backend.repository.HoaDonChiTietRepository;
import com.example.backend.repository.VoucherRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
public class ExportFilePdfFormHtml {

    @Autowired
    HoaDonChiTietRepository hdctRepo ;

    @Autowired
    DiaChiRepository khDiaChiRepo;

    @Autowired
    VoucherRepository khVoucherRepo;

    public Context setDataSendMail(BienLaiHoaDon invoice, String url) {

        Context context = new Context();

        Map<String, Object> data = new HashMap<>();

        data.put("invoice", invoice);
        data.put("url", url);
        context.setVariables(data);
        return context;
    }
    public Context setVoucherSendMail(Voucher voucher, String url) {

        Context context = new Context();

        Map<String, Object> data = new HashMap<>();

        data.put("voucher", voucher);
        data.put("url", url);
        context.setVariables(data);
        return context;
    }

    public  NumberFormat formatCurrency() {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(Locale.forLanguageTag("vi-VN"));
        formatter.setCurrency(Currency.getInstance("VND"));
        return formatter;
    }
    public BienLaiHoaDon getInvoiceResponse(HoaDon hoaDon) {

        List<HoaDonChiTietBanHangRespone> billDetailResponses = hdctRepo.getAllHDCTByHD(hoaDon.getId());

        NumberFormat formatter = formatCurrency();
     //   DiaChi diaChi = khDiaChiRepo.findAllById(hoaDon.getDiaChi().getId());
           // Voucher voucher = khVoucherRepo.findAllById(hoaDon.getVoucher().getId()).get();
          //  BigDecimal giaGiam = hoaDon.getTongTien().multiply(BigDecimal.valueOf(voucher.getGiaTriGiam()).divide(BigDecimal.valueOf(100)));

        String giamGiaText;
        BigDecimal giaGiam;

        if (hoaDon.getVoucher()!= null) {
        //    Voucher voucher = khVoucherRepo.findAllById(hoaDon.getVoucher().getId()).get();
            BigDecimal giaTriGiam = hoaDon.getGiaGiamGia();

         if (giaTriGiam.compareTo(BigDecimal.ZERO) > 0) {


                // Giảm giá theo phần trăm
                giaGiam = hoaDon.getGiaGoc().multiply(giaTriGiam.divide(BigDecimal.valueOf(100)));

                if(giaGiam.compareTo(hoaDon.getVoucher().getGiamToiDa()) > 0){
                    giaGiam = hoaDon.getVoucher().getGiamToiDa();
                }
//                giamGiaText = formatter.format(giaGiam) + " - " + giaTriGiam + "%";
             giamGiaText = formatter.format(giaGiam);
            } else {

                giamGiaText = "Không có giảm giá";
            }
        } else {

            giamGiaText = "Không có giảm giá";
        }


        if(hoaDon.getThanhTien() == null || hoaDon.getThanhTien().equals("")){
            hoaDon.setThanhTien(hoaDon.getTienVanChuyen().add(hoaDon.getGiaGoc()));
        }

        BienLaiHoaDon invoice = BienLaiHoaDon.builder()
                .sdt(hoaDon.getSoDienThoai())
                .diaChi(hoaDon.getDiaChi())
                .ten(hoaDon.getTenNguoiNhan())
                .ma(hoaDon.getMa())
                .phiShip(formatter.format(hoaDon.getTienVanChuyen()))
                .tongTien(formatter.format(hoaDon.getGiaGoc()))
                .giamgia(giamGiaText )
                .tongThanhToan(formatter.format(hoaDon.getGiaGoc().add(hoaDon.getTienVanChuyen())))
                .date(hoaDon.getNgayMua())
                .build();

        if (hoaDon.getVoucher()== null) {

            invoice.setTongThanhToan(formatter.format(hoaDon.getGiaGoc().add(hoaDon.getTienVanChuyen())));
        }else{
            invoice.setTongThanhToan(formatter.format(hoaDon.getThanhTien().add(hoaDon.getTienVanChuyen())));
        }
        List<HoaDonChiTietSendMailRequest> items = billDetailResponses.stream()
                .map(billDetailRequest -> {
                    String donGia = "";

                    HoaDonChiTietSendMailRequest invoiceItemResponse = HoaDonChiTietSendMailRequest.builder()
                            .ma(billDetailRequest.getTenSP())
                            .donGia(String.valueOf(billDetailRequest.getGiaSauGiam()))
                            .soLuong(String.valueOf(billDetailRequest.getSoLuong()))
                            .anh(billDetailRequest.getLinkAnh())
                            .build();

                    return invoiceItemResponse;
                })
                .collect(Collectors.toList());

        invoice.setItems(items);

        return invoice;
    }
}
