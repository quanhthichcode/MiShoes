package com.example.backend.service;

import com.example.backend.dto.request.HoaDonCLient.HoaDonClientRequest;
import com.example.backend.dto.request.HoaDonCLient.KHHoaDonChiTietRequest;
import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.request.ThanhToanRequest;
import com.example.backend.dto.response.ChiTietSanPhamForBanHang;
import com.example.backend.dto.response.KhachHangRespon;
import com.example.backend.entity.*;
import com.example.backend.infrastructure.email.EmailSenderService;
import com.example.backend.repository.*;
import com.example.backend.util.Status;
import lombok.RequiredArgsConstructor;
import org.hibernate.type.descriptor.DateTimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class BanHangService {
    @Autowired
    HoaDonRepository hoaDonRepository;
    @Autowired
    CTSPRepository ctspRepository;
    @Autowired
    ThongBaoService thongBaoService;
    @Autowired
    NguoiDungRepository nguoiDungRepository;
    @Autowired
    LichSuHoaDonService lichSuHoaDonService;

    @Autowired
    private DiaChiRepository diaChiRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @Autowired
    private GioHangChiTietRepository gioHangChiTietRepository;
    @Autowired
    ThanhToanService thanhToanService;

    public List<ChiTietSanPhamForBanHang> getALLCTSPBanHang() {
        return ctspRepository.getALLCTSPBanHang();
    }

    public HoaDon addHoaDon(HoaDon hd) {
        return hoaDonRepository.save(hd);
    }

    public HoaDon addHoaDonClient(HoaDonRequest hoaDonRequest) {
        HoaDon hd = hoaDonRequest.map(new HoaDon());
        HoaDon hd2 = hoaDonRepository.save(hd);
        thongBaoService.thanhToan(hd2.getId());
        return hd2;
    }

    public Boolean createHoaDon(HoaDonClientRequest hoaDonRequest) {
        NguoiDung kh;

        if (hoaDonRequest.getIdUser() != "") {
            kh = this.nguoiDungRepository.findById(hoaDonRequest.getIdUser()).get();
        } else {
            kh = null;
        }

        BigDecimal tienSauGiam;
        if (hoaDonRequest.getTienSauGiam() == null || hoaDonRequest.getTienSauGiam().compareTo(BigDecimal.ZERO) == 0) {
            tienSauGiam = hoaDonRequest.getTongTien().add(hoaDonRequest.getTienShip());
        } else {
            tienSauGiam = hoaDonRequest.getTienSauGiam();
        }

        HoaDon hoaDon = HoaDon.builder()
                .nguoiDung(kh)
                .diaChi(hoaDonRequest.getDiaChi())
                .giaGoc(hoaDonRequest.getTongTien())
                .tenNguoiNhan(hoaDonRequest.getTenNguoiNhan())
                .ngayTao(LocalDateTime.now())
                .tienVanChuyen(hoaDonRequest.getTienShip())
                .email(hoaDonRequest.getEmail())
                .soDienThoai(hoaDonRequest.getSdt())
                .ngayMua(LocalDateTime.now())
                .ngayDuKienNhan(hoaDonRequest.getNgayDuKienNhan())
                .giaGiamGia(hoaDonRequest.getGiaGiamGia())
                .thanhTien(tienSauGiam)
                .trangThai(0)
                .build();

        System.out.println("Hóa đơn sau builder :"+hoaDon);
        if (hoaDonRequest.getIdVoucher() != null) {
            Voucher voucher = voucherRepository.findAllById(hoaDonRequest.getIdVoucher()).get();
            hoaDon.setVoucher(voucher);
        }
        for (KHHoaDonChiTietRequest request : hoaDonRequest.getListHDCT()) {

            ChiTietSanPham spct = ctspRepository.findById(request.getIdCTSP()).get();

            if (spct.getSoLuong() < request.getSoLuong()) {
                //   throw new RuntimeException("So luong khong du");
                return false;
            }
        }


        HoaDon saveHoaDon = hoaDonRepository.save(hoaDon);
        Random random1 = new Random();
        int randomNumber1 = random1.nextInt(9000) + 1000;
        saveHoaDon.setMa("HD" + randomNumber1);
        hoaDonRepository.save(saveHoaDon);

        if (hoaDonRequest.getIdVoucher() != null) {
            Voucher voucher = voucherRepository.findAllById(hoaDonRequest.getIdVoucher()).get();
            voucher.setSoLuong(voucher.getSoLuong() - 1);
            if (voucher.getSoLuong() == 0) {
                voucher.setTrangThai(Status.NGUNG_HOAT_DONG);
            }
            voucherRepository.save(voucher);
        }

        for (KHHoaDonChiTietRequest request : hoaDonRequest.getListHDCT()) {

            ChiTietSanPham spct = ctspRepository.findById(request.getIdCTSP()).get();

            HoaDonChiTiet hdct = HoaDonChiTiet.builder()
                    .chiTietSanPham(spct)
                    .soLuong(request.getSoLuong())
                    .giaSauGiam(request.getDonGia())
                    .trangThai(0)
                    .hoaDon(hoaDon)
                    .ngayTao(LocalDateTime.now())
                    .build();
            System.out.println("Hóa đơn chi tiết :"+hdct);
            hoaDonChiTietRepository.save(hdct);
            spct.setSoLuong(spct.getSoLuong() - request.getSoLuong());

            if (spct.getSoLuong() == 0) {
                spct.setTrangThai(1);
            }

            ctspRepository.save(spct);


        }
        for (KHHoaDonChiTietRequest x : hoaDonRequest.getListHDCT()) {
            if (hoaDonRequest.getIdUser() == "") {
                GioHangChiTiet gioHangChiTiet = gioHangChiTietRepository.listGHCTByIdGioHangAndSanPham(x.getIdGioHang(), x.getIdCTSP());
                System.out.println("gio hang: " + gioHangChiTiet.getId());
                if (gioHangChiTiet != null) {
                    gioHangChiTietRepository.deleteById(gioHangChiTiet.getId());
                }
            } else {
                GioHangChiTiet gioHangChiTiet = gioHangChiTietRepository.listGHCTByID(hoaDonRequest.getIdUser(), x.getIdCTSP());
                if (gioHangChiTiet != null) {
                    gioHangChiTietRepository.deleteById(gioHangChiTiet.getId());
                }
            }


        }


        ///Thanh toánif

        ThanhToanRequest thanhToanRequest = new ThanhToanRequest();
        thanhToanRequest.setHoaDon(saveHoaDon.getId());
        thanhToanRequest.setNgayTao(LocalDateTime.now());
        thanhToanRequest.setTongTien(saveHoaDon.getThanhTien());
        System.out.println("Thanh toán requesst "+thanhToanRequest);
        if (hoaDonRequest.getIdPayMethod() == 0) {
            System.out.println("Vào 0");
            thanhToanRequest.setTienMat(saveHoaDon.getThanhTien());
            thanhToanRequest.setPhuongThuc(0);
        } else {
            System.out.println("Vào 1");
            thanhToanRequest.setChuyenKhoan(saveHoaDon.getThanhTien());
            thanhToanRequest.setPhuongThuc(1);
            thanhToanRequest.setPhuongThucVnp(hoaDonRequest.getMaGiaoDich());

            LichSuHoaDon lichSuHoaDonTT = new LichSuHoaDon();
//        lichSuHoaDon.setId(saveHoaDon.getId());
            lichSuHoaDonTT.setHoaDon(saveHoaDon);
            lichSuHoaDonTT.setNguoiTao(hoaDonRequest.getTenNguoiNhan());
            lichSuHoaDonTT.setTrangThai(4);
            lichSuHoaDonTT.setNgayTao(LocalDateTime.now());
            lichSuHoaDonService.save(lichSuHoaDonTT);
        }
        System.out.println("Save xong lịch sử");
        thanhToanService.thanhToan(thanhToanRequest);
        System.out.println("thanh toán xong thanh toán service");
        this.thongBaoService.thanhToan(saveHoaDon.getId());
        System.out.println("Chạy qua thanh toán");
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
//        lichSuHoaDon.setId(saveHoaDon.getId());
        lichSuHoaDon.setHoaDon(saveHoaDon);
        lichSuHoaDon.setNguoiTao(hoaDonRequest.getTenNguoiNhan());
        lichSuHoaDon.setTrangThai(0);
        lichSuHoaDon.setNgayTao(LocalDateTime.now());
        lichSuHoaDonService.save(lichSuHoaDon);
        System.out.println("Hoàn thành");
//          sendMailOnline(hoaDon.getId());
        return true;
    }
}
