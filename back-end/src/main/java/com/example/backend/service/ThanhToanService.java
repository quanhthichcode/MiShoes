package com.example.backend.service;

import com.example.backend.dto.request.ThanhToanRequest;
import com.example.backend.dto.response.LichSuThanhToanRespon;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.ThanhToan;
import com.example.backend.infrastructure.email.EmailSenderService;
import com.example.backend.infrastructure.exportPdf.ExportFilePdfFormHtml;
import com.example.backend.model.BienLaiHoaDon;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.repository.NguoiDungRepository;
import com.example.backend.repository.ThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.List;

@Service
public class ThanhToanService {

    private static String BASE_FRONTEND_ENDPOINT = "http://localhost:3000";
    @Autowired
    ThanhToanRepository thanhToanRepository;

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    ExportFilePdfFormHtml exportFilePdfFormHtml;

    @Autowired
    private SpringTemplateEngine springTemplateEngine;

@Autowired
private EmailSenderService emailSenderService;
    public ThanhToan thanhToan(ThanhToanRequest request) {
        ThanhToan tt = request.map(new ThanhToan());
        System.out.println("TT :"+tt);
//        List<ThanhToan> listTT = thanhToanRepository.getThanhToanByIdHD(tt.getHoaDon().getId());
//
//        if (listTT!= null && listTT.size() > 0) {
//            for (ThanhToan t : listTT) {
//                System.out.println("T"+t.toString());
//                if (t.getPhuongThuc() == 0 && t.getTrangThai() != 1 && t.getPhuongThuc() ==tt.getPhuongThuc()){
//                    t.setTienMat(t.getTienMat().add(tt.getTienMat()));
//                    t.setTongTien(t.getTongTien().add(tt.getTienMat()));
//                    return thanhToanRepository.save(t);
//                } else if (t.getPhuongThuc() == 1 && t.getTrangThai() != 1 && t.getPhuongThuc() == tt.getPhuongThuc()) {
//                    t.setTongTien(t.getTongTien().add(tt.getTongTien()));
//                    return thanhToanRepository.save(t);
//                }
//            }
//        }
        sendMailOnline(tt.getHoaDon().getId());
        System.out.println("Send mail done!");
        return thanhToanRepository.save(tt);
 //      ThanhToan thanhToan =  thanhToanRepository.save(tt);

 //       return thanhToan;
    }

    public List<LichSuThanhToanRespon> getALLLLichSuThanhToanByIDHD(String id) {
        return thanhToanRepository.getALLLLichSuThanhToanByIDHD(id);
    }

    //    public ThanhToan thanhToanTienMat(ThanhToanRequest request){
//        ThanhToan tt = request.map(new ThanhToan())
//    }
    public List<ThanhToan> getThanhToanByIdHD(String idHD) {
        return thanhToanRepository.getThanhToanByIdHD(idHD);
    }


    public ThanhToan save(ThanhToan tt){
        return thanhToanRepository.save(tt);
    }

    public void sendMailOnline(String idHoaDon) {
        String finalHtml = null;
        HoaDon hoaDon = hoaDonRepository.findAllById(idHoaDon);
        System.out.println("Hóa đơn trong send mail :"+hoaDon);
        BienLaiHoaDon invoice = exportFilePdfFormHtml.getInvoiceResponse(hoaDon);
        System.out.println("invoice :"+invoice);
        if(hoaDon.getNguoiDung()!=null){
       NguoiDung user = nguoiDungRepository.findAllById(hoaDon.getNguoiDung().getId());
            System.out.println("Người dùng :"+user);
            sendMail(invoice,  user.getEmail(),BASE_FRONTEND_ENDPOINT + "/hd/"+hoaDon.getId());
    }else{
            sendMail(invoice,  hoaDon.getEmail(),BASE_FRONTEND_ENDPOINT + "/hd/"+hoaDon.getId());
        }
//        sendMail(invoice, user.getEmail());
        //}
    }

    public void sendMail(BienLaiHoaDon invoice,String email,String url) {

        String finalHtmlSendMail = null;
        Context dataContextSendMail = exportFilePdfFormHtml.setDataSendMail(invoice, url);
        finalHtmlSendMail = springTemplateEngine.process("BillMail", dataContextSendMail);
        String subject = "Biên lai ";
        emailSenderService.sendSimpleEmail(email, subject, finalHtmlSendMail);
    }


    public ThanhToan thanhToanAdmin(ThanhToanRequest request) {
        ThanhToan tt = request.map(new ThanhToan());
        return thanhToanRepository.save(tt);
    }

    public void xoaThanhToanAdmin(String maHD,int phuongThuc){
        HoaDon hd = hoaDonRepository.getHDByMa(maHD);
        ThanhToan tt = thanhToanRepository.getTT(hd.getId(),phuongThuc);
        thanhToanRepository.delete(tt);
    }
}
