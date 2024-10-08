package com.example.backend.controller.admin;


import com.example.backend.dto.request.sanpham.ChiTietSanPhamRequest;
import com.example.backend.dto.request.sanpham.HinhAnhRequest;
import com.example.backend.dto.request.sanphamsearch.CTSPSearch;
import com.example.backend.dto.request.sanphamupdate.UpdateCTSPRequest;
import com.example.backend.entity.ChiTietSanPham;
import com.example.backend.entity.HoaDonChiTiet;
import com.example.backend.entity.KhuyenMai;
import com.example.backend.service.CTSPService;
import com.example.backend.service.HinhAnhService;
import com.example.backend.service.HoaDonChiTietService;
import com.example.backend.service.ThongBaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/ctsp")
public class CTSPController {
    @Autowired
    private CTSPService ctspService;
    @Autowired
    private HinhAnhService hinhAnhService;
    @Autowired
    ThongBaoService thongBaoService;
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;
    @GetMapping("/show")
    public ResponseEntity<?> getALLCTSP() {
        return new ResponseEntity<>(ctspService.getALL(), HttpStatus.OK);
    }

    @GetMapping("/detailsp")
    public ResponseEntity<?> getAllDetail() {
        return new ResponseEntity<>(ctspService.detail(), HttpStatus.OK);
    }

    @GetMapping("/showct/{idSP}")
    public ResponseEntity<?> getALLCTSP(@PathVariable("idSP") String id) {
        return new ResponseEntity<>(ctspService.getALLCTSP(id), HttpStatus.OK);
    }

    @GetMapping("/detail/{idCT}")
    public ResponseEntity<?> getDetail(@PathVariable("idCT") String id) {
        return new ResponseEntity<>(ctspService.detailCTSP(id), HttpStatus.OK);
    }
    @GetMapping("/QR/{idCT}")
    public ResponseEntity<?> QRCtsp(@PathVariable("idCT") String id) {
        return  ResponseEntity.ok(ctspService.detailCtspByQrRespon(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @RequestBody UpdateCTSPRequest request){
            return ResponseEntity.ok(ctspService.update(id,request));
    }

    @GetMapping("/showct")
    public ResponseEntity<?> getALLCTSP_1(@RequestParam String id) {
        return new ResponseEntity<>(ctspService.getALLCTSP(id), HttpStatus.OK);
    }

    @PostMapping ("/search-ctsp/{idSP}")
    public ResponseEntity<?> search(@PathVariable("idSP") String id, @RequestBody CTSPSearch ctspSearch){
        System.out.println(id);
        System.out.println(ctspSearch.toString());
        return ResponseEntity.ok(ctspService.getSearch(id,ctspSearch));
    }

    @PostMapping ("/search-ctsp-banhang")
    public ResponseEntity<?> searchBanHang(@RequestBody CTSPSearch ctspSearch){
        return ResponseEntity.ok(ctspService.getSearchBanHang(ctspSearch));
    }

    @PutMapping("/updateKM/{idCTSP}")
    public ResponseEntity<?> update(@PathVariable("idCTSP") String idCTSP, @RequestBody KhuyenMai khuyenMai) {
        System.out.println("Vào update");
        ChiTietSanPham ctsp = ctspService.findChiTietSanPhamByID(idCTSP);
        BigDecimal giaGiam = khuyenMai.getLoai().equals("Tiền mặt") ? khuyenMai.getGia_tri_khuyen_mai()
                    : (ctsp.getGiaBan().subtract(ctsp.getGiaBan().multiply(khuyenMai.getGia_tri_khuyen_mai().divide(new BigDecimal("100")))));
        BigDecimal giaSauGiam = ctsp.getGiaBan().subtract(giaGiam);
        hoaDonChiTietService.updateGia(idCTSP,giaGiam,giaSauGiam);
        return ResponseEntity.ok(ctspService.updateKM(idCTSP, khuyenMai));
    }


    @PutMapping("/deleteKM/{idCTSP}")
    public ResponseEntity<?> delete(@PathVariable("idCTSP")String idCTSP){
        ChiTietSanPham ctsp = ctspService.findChiTietSanPhamByID(idCTSP);
        for (HoaDonChiTiet h : hoaDonChiTietService.getAllHDCTByIDCTSP(idCTSP)) {
            if(h.getTrangThai() == 0) {
                hoaDonChiTietService.updateGia(idCTSP,new BigDecimal(0),ctsp.getGiaBan());

            }
        }

        return ResponseEntity.ok(ctspService.deleteKM(idCTSP));
    }


    @GetMapping("/showKM/{idKM}")
    public ResponseEntity<?> getALLCTSPByKM(@PathVariable("idKM") String id){
        System.out.println("id"+id);
        return  ResponseEntity.ok(ctspService.getALLCTSPByKM(id));
    }

    @GetMapping("/showCTSP/{idSP}")
    public ResponseEntity<?> getCTSPByIDSP(@PathVariable("idSP") String id){
        System.out.println("id "+id);
        return  ResponseEntity.ok(ctspService.getAllCTSPByIDSP(id));
    }


    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody ChiTietSanPhamRequest request, HinhAnhRequest ha) {

        request.setTrangThai(0);
        request.setNgayTao(LocalDateTime.now());
        request.setGioiTinh(true);
        ChiTietSanPham newct = ctspService.add(request);

        int maAnh = hinhAnhService.getALL().size();
        ha.setTrangThai(0);
        ha.setMa("HA-" + (maAnh + 1));
        ha.setChiTietSanPham(newct.getId());
        ha.setTen("P-"+newct.getTenCt());
        ha.setUrl(newct.getGhiChu());
        hinhAnhService.add(ha);
        return ResponseEntity.ok("Done");
    }
}

