package com.example.backend.service;

import com.example.backend.dto.response.AdminHoaDonTimeLineRespon;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.LichSuHoaDon;
import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.ThongBao;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.repository.LichSuHoaDonRepository;
import com.example.backend.repository.NguoiDungRepository;
import com.example.backend.repository.ThongBaoRepository;
import com.example.backend.util.LoaiThongBao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ThongBaoService {
    @Autowired
    ThongBaoRepository thongBaoRepository;
    @Autowired
    HoaDonRepository hoaDonRepository;
    @Autowired
    LichSuHoaDonRepository lichSuHoaDonRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    public List<ThongBao> getAllAdmin() {
        return thongBaoRepository.findAllAdmin();
    }

    public List<ThongBao> getAllKH(String token) {
        if (tokenService.getUserNameByToken(token) == null) {
            return null;
        }

        String userName = tokenService.getUserNameByToken(token);
        NguoiDung nguoiDung = nguoiDungRepository.findNguoiDungByEmail(userName);
        return thongBaoRepository.findAllKH(nguoiDung.getId());
    }

    public Integer countAdmin() {
        return thongBaoRepository.countAdmin();
    }

    public Integer countKH(String token) {
        if (tokenService.getUserNameByToken(token) == null) {
            return null;
        }

        String userName = tokenService.getUserNameByToken(token);
        NguoiDung nguoiDung = nguoiDungRepository.findNguoiDungByEmail(userName);
        return thongBaoRepository.countKH(nguoiDung.getId());
    }

    // hàm gửi thông báo cho admin
    public void thanhToan(String idHD) {
        HoaDon hoaDon = hoaDonRepository.findById(idHD).get();
        ThongBao thongBao = new ThongBao();
        thongBao.setLoai(LoaiThongBao.THANH_TOAN);//thanh toán
        if (hoaDon.getNguoiDung() == null) {
            thongBao.setNguoiDung(null);
        } else {
            thongBao.setNguoiDung(NguoiDung.builder().id(hoaDon.getNguoiDung().getId()).build());
        }
        thongBao.setHoaDon(hoaDon);
        thongBao.setNoiDung("hóa đơn " + hoaDon.getMa() + " chờ xác nhận");
        thongBao.setTrangThai(0);//0 : chưa xem, 1: đã xem
        thongBao.setNgayTao(LocalDateTime.now());
        thongBaoRepository.save(thongBao);
        messagingTemplate.convertAndSend("/topic/admin/hoa-don", thongBao);
    }

    // hàm dùng gửi thông báo cho khách hàng
    public void VanDon(String idHD) {
        HoaDon hoaDon = hoaDonRepository.findById(idHD).get();
        List<AdminHoaDonTimeLineRespon> list = lichSuHoaDonRepository.detailLichSuHoaDon(idHD);
        ThongBao thongBao = new ThongBao();
        thongBao.setLoai(LoaiThongBao.XAC_NHAN_DON_HANG);//thanh toán
        if (hoaDon.getNguoiDung() == null) {
            thongBao.setNguoiDung(null);
        } else {
            thongBao.setNguoiDung(NguoiDung.builder().id(hoaDon.getNguoiDung().getId()).build());
        }
        thongBao.setHoaDon(hoaDon);
        thongBao.setNoiDung("hóa đơn " + hoaDon.getMa() + " đã xác nhận đơn hàng");
        thongBao.setTrangThai(0);//0 : chưa xem, 1: đã xem
        thongBao.setNgayTao(LocalDateTime.now());
        thongBaoRepository.save(thongBao);
        messagingTemplate.convertAndSend("/topic/KH/hoa-don", thongBao);
    }


    // hàm đổi trạng thái thông báo: chưa xem --> đã xem
    public ThongBao daxem(String id){
        ThongBao thongBao = thongBaoRepository.findById(id).get();
        if(thongBao != null){
            thongBao.setTrangThai(1);
            return  thongBaoRepository.save(thongBao);
        }
        return  thongBao;
    }
    public void socketLoadSanPham(String idSP) {

        ThongBao thongBao = new ThongBao();
        thongBao.setLoai(LoaiThongBao.XAC_NHAN_DON_HANG);//thanh toán
        thongBaoRepository.save(thongBao);
        messagingTemplate.convertAndSend("/topic/KH/hoa-don", thongBao);
    }
}
