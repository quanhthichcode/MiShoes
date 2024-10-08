package com.example.backend.controller.user;


import com.example.backend.dto.request.HoaDonCLient.SearchHDByMaAndSdtRequest;
import com.example.backend.dto.request.HoaDonCLient.TrangThaiRequest;
import com.example.backend.dto.request.LichSuHoaDonRequest;
import com.example.backend.entity.HoaDon;
import com.example.backend.service.Client.HoaDonClientService;
import com.example.backend.service.HoaDonChiTietService;
import com.example.backend.service.HoaDonServicee;
import com.example.backend.service.LichSuHoaDonService;
import com.example.backend.service.ThongBaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/client-hoa-don")
@RequiredArgsConstructor
public class HoaDonClientController {

    @Autowired
    HoaDonClientService hoaDonClientService;
    @Autowired
    HoaDonServicee hoaDonService;
    @Autowired
    LichSuHoaDonService lichSuHoaDonService;
    @Autowired
    ThongBaoService thongBaoService;
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;
    @PostMapping("")
    public ResponseEntity<?> getALLHoaDonOL(@RequestBody TrangThaiRequest request) {
        System.out.println("tttttttt" + request.getTrangThai());
        return ResponseEntity.ok(hoaDonClientService.getALLHDClientByIDKH(request));
    }

    @GetMapping("hoa-don/{id}")
    public ResponseEntity<?> getALLHoaDonOLByIDHD(@PathVariable("id") String id) {
        return ResponseEntity.ok(hoaDonClientService.detailHDSanPham(id));
    }

    @GetMapping("detail-hoa-don/{idHD}")
    public ResponseEntity<?> detailHD(@PathVariable("idHD") String id) {
        return ResponseEntity.ok(hoaDonClientService.detailHoaDonClienByIdHD(id));
    }
    @PostMapping("search")
    public ResponseEntity<?> detailHD(@RequestBody SearchHDByMaAndSdtRequest request ) {
        return ResponseEntity.ok(hoaDonClientService.search(request));
    }
    @PutMapping("/xoa-hoa-don/{id}/{maNV}")
    public ResponseEntity<?> HuyHoaDonQuanLyHoaDon(@PathVariable("id") String id, @RequestBody LichSuHoaDonRequest ls, @PathVariable("maNV") String maNV) {
        HoaDon hoaDon=hoaDonService.findHoaDonbyID(id);
        hoaDon.setNgaySua(LocalDateTime.now());
        ls.setNgayTao(LocalDateTime.now());
        ls.setIdHD(id);
        ls.setNguoiTao(maNV);
        ls.setMoTaHoatDong(ls.getMoTaHoatDong());
        ls.setTrangThai(-1);
        lichSuHoaDonService.addLichSuHoaDon(ls);
        this.thongBaoService.thanhToan(id);
        return  ResponseEntity.ok(hoaDonService.deleteHoaDon(id));
    }
    @GetMapping("/detail-lich-su-hoa-don/{idHD}")
    public ResponseEntity<?> detailLSHD(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(lichSuHoaDonService.getLichHoaDon(id));
    }
    @GetMapping("/hoa-don-san-pham/{idHD}")
    public ResponseEntity<?> SanPhamHoaDon(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.detailHDSanPham(id));
    }
    @DeleteMapping("/delete-hoa-don-chi-tiet/{idCTSP}/{id}")
    public void  deleteHoaDonChiTiet (@PathVariable("idCTSP") String idCTSP,@PathVariable("id")String id) {
        hoaDonChiTietService.huyDonHang(idCTSP,id); //  roll backed
    }
}
