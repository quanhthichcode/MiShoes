package com.example.backend.scheduled_tasks;

import com.example.backend.entity.*;
import com.example.backend.service.*;
import com.example.backend.util.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ScheduledTasks {
    @Autowired
    HoaDonServicee hoaDonServicee;
    @Autowired
    VoucherService voucherService;
    @Autowired
    KhuyenMaiService khuyenMaiService;
    @Autowired
    NguoiDungVoucherService nguoiDungVoucherService;
    @Autowired
    KhuyenMaiSanPhamService khuyenMaiSanPhamService;
    @Autowired
    CTSPService ctspService;
    @Autowired
    HoaDonChiTietService hoaDonChiTietService;

    @Scheduled(cron = "0 0 3 * * *") // Lịch chạy vào 3 giờ sáng hàng ngày
    public void deleteBill3AM() {
        List<HoaDon> listHoaDon = hoaDonServicee.getAllBillToday();
        for (HoaDon x : listHoaDon){
            if (x.getTrangThai() == 0){
                hoaDonServicee.deleteHoaDon(x.getId());
                for (HoaDonChiTiet hdct : hoaDonChiTietService.getAllHDCTByIDHD(x.getId())) {
                    hoaDonChiTietService.deleteHDCTAndRollBackInSell(hdct.getId(), x.getMa());
                }

            }
        }
    }


    @Scheduled(fixedRate = 60000) // Chạy mỗi giây
  public void taskVoucher() {
        LocalDateTime now = LocalDateTime.now();
        List<Voucher> listVoucher = voucherService.getAll();
        for (Voucher x : listVoucher){
            if (x.getTrangThai() == Status.SAP_DIEN_RA && x.getNgayBatDau().isBefore(now)) {
                System.out.println("Ngày bắt đầu :"+x.getNgayBatDau());
                System.out.println("Ngày hiện tại :"+now);
                x.setTrangThai(Status.DANG_HOAT_DONG);
                List<NguoiDungVoucher> listNDV = nguoiDungVoucherService.getALL();
                for (NguoiDungVoucher v : listNDV){
                    if (v.getVoucher().getId().equals(x.getId())){
                        v.setTrangThai(Status.DANG_SU_DUNG);
                        nguoiDungVoucherService.update(v);
                    }
                }
                voucherService.update(x);
            }
            if (x.getTrangThai() == Status.NGUNG_HOAT_DONG && x.getNgayKetThuc().isAfter(now)) {
                x.setTrangThai(Status.DANG_HOAT_DONG);
                List<NguoiDungVoucher> listNDV = nguoiDungVoucherService.getALL();
                for (NguoiDungVoucher v : listNDV){
                    if (v.getVoucher().getId().equals(x.getId())){
                        v.setTrangThai(Status.DANG_SU_DUNG);
                        nguoiDungVoucherService.update(v);
                    }
                }
                voucherService.update(x);
            }
            if (x.getTrangThai() == Status.DANG_HOAT_DONG && x.getNgayKetThuc().isBefore(now)){
                x.setTrangThai(Status.NGUNG_HOAT_DONG);
                List<NguoiDungVoucher> listNDV = nguoiDungVoucherService.getALL();
                for (NguoiDungVoucher v : listNDV){
                    if (v.getVoucher().getId().equals(x.getId())){
                        v.setTrangThai(Status.NGUNG_HOAT_DONG);
                        nguoiDungVoucherService.update(v);
                    }
                }
                voucherService.update(x);
            }
        }
    }




    @Scheduled(fixedRate = 60000) // Chạy mỗi giây
    public void taskPromotion() {
        LocalDateTime now = LocalDateTime.now();
        List<KhuyenMai>  listKM = khuyenMaiService.getAllKhuyenMai();
        for (KhuyenMai x : listKM){
            if (x.getTrangThai() == 0 && x.getNgay_bat_dau().isBefore(now)) {
                x.setTrangThai(1);
                List<KhuyenMaiSanPham> listKMSP = khuyenMaiSanPhamService.getAll();
                for (KhuyenMaiSanPham v : listKMSP){
                    if (v.getKhuyenMai().getId().equals(x.getId())){
                        v.setTrangThai(1);
                        khuyenMaiSanPhamService.add(v);
                    }
                    ChiTietSanPham ctsp = ctspService.findChiTietSanPhamByID(v.getChiTietSanPham().getId());
                    ctsp.setKhuyenMai(v.getKhuyenMai());
                    ctspService.updateCTSP(ctsp);
                }
                khuyenMaiService.addKhuyenMai(x);
            }
            if (x.getTrangThai() == 1 && x.getNgay_ket_thuc().isBefore(now)){
                x.setTrangThai(2);
                List<KhuyenMaiSanPham> listKMSP = khuyenMaiSanPhamService.getAll();
                for (KhuyenMaiSanPham v : listKMSP){
                    if (v.getKhuyenMai().getId().equals(x.getId())){
                        v.setTrangThai(2);
                        khuyenMaiSanPhamService.add(v);
                    }
                    ChiTietSanPham ctsp = ctspService.findChiTietSanPhamByID(v.getChiTietSanPham().getId());
                    ctsp.setKhuyenMai(null);
                    ctspService.updateCTSP(ctsp);
                }
                khuyenMaiService.addKhuyenMai(x);
            }
        }
    }

}
