package com.example.backend.controller.admin;


import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.request.LichSuHoaDonRequest;
import com.example.backend.dto.request.hoadonsearch.HoaDonSearch;
import com.example.backend.entity.*;
import com.example.backend.model.AdminHoaDonSanPham;
import com.example.backend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/admin/hoa-don")
@RequiredArgsConstructor
public class HoaDonControllerr {
    @Autowired
    private HoaDonServicee hoaDonService;
    @Autowired
    private LichSuHoaDonService lichSuHoaDonService;
    @Autowired
    private VoucherService voucherService;
    @Autowired
    private ThanhToanService thanhToanService;
    @Autowired
    private HoaDonChiTietService hoaDonChiTietService;
    @Autowired
    ThongBaoService thongBaoService;
    @Autowired
    KhuyenMaiService khuyenMaiService;
    @Autowired
    CTSPService ctspService;
    @GetMapping()
    public ResponseEntity<?> getALL(){
        return  ResponseEntity.ok(hoaDonService.getALL());
    }
    @GetMapping("/{tt}")
    public ResponseEntity<?> getALLTT(@PathVariable("tt") int tt){
        return  ResponseEntity.ok(hoaDonService.getALLTT(tt));
    }
    @GetMapping("/detail-hoa-don/{idHD}")
    public ResponseEntity<?> detailHD(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.getByID(id));
    }
    @GetMapping("/detail-update-dia-chi-hoa-don/{idHD}")
    public ResponseEntity<?> detailUpdateDiaChiHoaDon(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.detailUpdateDiaChiHoaDonRespon(id));
    }
    @GetMapping("/detail-hoa-don-theo-ma/{ma}")
    public ResponseEntity<?> detailHDByMa(@PathVariable("ma") String ma){
        return  ResponseEntity.ok(hoaDonService.getHDByMa(ma));
    }
    @PostMapping("/search")
    public ResponseEntity<?> timHoaDon(@RequestBody HoaDonSearch hoaDonSearch)  {
        System.out.println(hoaDonSearch.toString());
        return  ResponseEntity.ok(hoaDonService.getTim(hoaDonSearch));
    }
    @PutMapping("/update-hoa-don/{idHD}/{maNV}")
    public ResponseEntity<?> updateTTHDvaADDLSHD(@RequestBody LichSuHoaDonRequest ls, @PathVariable("idHD") String id, @PathVariable("maNV") String maNV ){

        HoaDon hoaDon=hoaDonService.findHoaDonbyID(id);
        hoaDon.setNgaySua(LocalDateTime.now());
        ls.setNgayTao(LocalDateTime.now());
        ls.setIdHD(id);
        ls.setNguoiTao(maNV);
        ls.setMoTaHoatDong(ls.getMoTaHoatDong());
        System.out.println("trang thai ban dau hd"+hoaDon.getTrangThai());
        System.out.println("trang thai ban dau hoadon"+hoaDon.getTrangThai());
        List<ThanhToan> listThanhToan= thanhToanService.getThanhToanByIdHD(id);
        for (ThanhToan thanhToan : listThanhToan) {
            if (hoaDon.getLoaiHoaDon() == 0) {
                if (hoaDon.getTrangThai() == 0 && thanhToan.getPhuongThucVnp() != null) {
                    hoaDon.setTrangThai(1);
                    ls.setTrangThai(1);
                    System.out.println("if 1");
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon, id)
                    );
                } else if (hoaDon.getTrangThai() == 1 && thanhToan.getPhuongThucVnp() != null) {
                    ls.setTrangThai(2);
                    hoaDon.setTrangThai(2);
                    System.out.println("if 2");
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon, id)
                    );
                } else if (hoaDon.getTrangThai() == 2 && thanhToan.getPhuongThucVnp() != null) {
                    ls.setTrangThai(3);
                    hoaDon.setTrangThai(3);
                    System.out.println("if 2");
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon, id)
                    );
                } else if (hoaDon.getTrangThai() == 3 && thanhToan.getPhuongThucVnp() != null) {
                    ls.setTrangThai(5);
                    hoaDon.setTrangThai(5);
                    System.out.println("if 2");
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon, id)
                    );
                } else if (hoaDon.getTrangThai() == -1 && thanhToan.getPhuongThucVnp() != null) {
                    ls.setTrangThai(-2);
                    hoaDon.setTrangThai(-2);
                    System.out.println("if 2");
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon, id)
                    );
                }
                if (thanhToan.getPhuongThucVnp() == null) {
                    ls.setTrangThai(hoaDon.getTrangThai() + 1);
                    hoaDon.setTrangThai(hoaDon.getTrangThai() + 1);
                }
            }
        }
       if(hoaDon.getLoaiHoaDon()==1){
           if(hoaDon.getTraSau()==1){
               ls.setTrangThai(hoaDon.getTrangThai()+1);
               hoaDon.setTrangThai(hoaDon.getTrangThai()+1);
           }
           if(hoaDon.getTraSau()==0&&hoaDon.getDiaChi()!=null){
               if(hoaDon.getTrangThai()==4){
                   hoaDon.setTrangThai(2);
                   ls.setTrangThai(2);
                   lichSuHoaDonService.addLichSuHoaDon(ls);
                   return ResponseEntity.ok(
                           hoaDonService.updateHD(hoaDon,id)
                   );
               }
               if(hoaDon.getTrangThai()==2){
                   hoaDon.setTrangThai(3);
                   ls.setTrangThai(3);
                   lichSuHoaDonService.addLichSuHoaDon(ls);
                   return ResponseEntity.ok(
                           hoaDonService.updateHD(hoaDon,id)
                   );
               }
               if(hoaDon.getTrangThai()==3){
                   hoaDon.setTrangThai(5);
                   ls.setTrangThai(5);
                   lichSuHoaDonService.addLichSuHoaDon(ls);
                   return ResponseEntity.ok(
                           hoaDonService.updateHD(hoaDon,id)
                   );
               }
               else if (hoaDon.getTrangThai() == -1) {
                   ls.setTrangThai(-2);
                   System.out.println("if 2");
                   lichSuHoaDonService.addLichSuHoaDon(ls);
                   return ResponseEntity.ok(
                           hoaDonService.updateHD(hoaDon, id)
                   );
               }
           }
       }



        lichSuHoaDonService.addLichSuHoaDon(ls);
        return ResponseEntity.ok(hoaDonService.updateHD(hoaDon,id));
    }
    @PutMapping("/back-hoa-don/{idHD}/{maNV}")
    public ResponseEntity<?> rollBackHD(@RequestBody LichSuHoaDonRequest ls, @PathVariable("idHD") String id, @PathVariable("maNV") String maNV ){

        HoaDon hoaDon=hoaDonService.findHoaDonbyID(id);
        hoaDon.setNgaySua(LocalDateTime.now());
        ls.setNgayTao(LocalDateTime.now());
        ls.setIdHD(id);
        ls.setNguoiTao(maNV);
        ls.setMoTaHoatDong(ls.getMoTaHoatDong());
        System.out.println("trang thai ban dau hd"+hoaDon.getTrangThai());
        System.out.println("trang thai ban dau hoadon"+hoaDon.getTrangThai());
        List<ThanhToan> listThanhToan= thanhToanService.getThanhToanByIdHD(id);
        for (ThanhToan thanhToan : listThanhToan) {
            if (hoaDon.getLoaiHoaDon() == 0) {
                if (hoaDon.getTrangThai() == 1 && thanhToan.getPhuongThucVnp() != null) {
                    hoaDon.setTrangThai(0);
                    ls.setTrangThai(0);
                    System.out.println("if 1");
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon, id)
                    );
                } else if (hoaDon.getTrangThai() == 2 && thanhToan.getPhuongThucVnp() != null) {
                    ls.setTrangThai(1);
                    hoaDon.setTrangThai(1);
                    System.out.println("if 2");
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon, id)
                    );
                } else if (hoaDon.getTrangThai() == 3 && thanhToan.getPhuongThucVnp() != null) {
                    ls.setTrangThai(2);
                    hoaDon.setTrangThai(2);
                    System.out.println("if 2");
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon, id)
                    );
                } else if (hoaDon.getTrangThai() == 5 && thanhToan.getPhuongThucVnp() != null) {
                    ls.setTrangThai(3);
                    hoaDon.setTrangThai(3);
                    System.out.println("if 2");
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon, id)
                    );
                }
                else if (hoaDon.getTrangThai() == -2 && thanhToan.getPhuongThucVnp() != null) {
                    ls.setTrangThai(-1);
                    hoaDon.setTrangThai(-1);
                    System.out.println("if 2");
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon, id)
                    );
                }
                if (thanhToan.getPhuongThucVnp() == null) {
                    ls.setTrangThai(hoaDon.getTrangThai()  -1);
                    hoaDon.setTrangThai(hoaDon.getTrangThai() - 1);
                }
            }
        }
        if(hoaDon.getLoaiHoaDon()==1){
            if(hoaDon.getTraSau()==1){
                ls.setTrangThai(hoaDon.getTrangThai()-1);
                hoaDon.setTrangThai(hoaDon.getTrangThai()-1);
            }
            if(hoaDon.getTraSau()==0&&hoaDon.getDiaChi()!=null){
                if(hoaDon.getTrangThai()==2){
                    hoaDon.setTrangThai(1);
                    ls.setTrangThai(1);
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon,id)
                    );
                }
                if(hoaDon.getTrangThai()==3){
                    hoaDon.setTrangThai(2);
                    ls.setTrangThai(2);
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon,id)
                    );
                }
                if(hoaDon.getTrangThai()==5){
                    hoaDon.setTrangThai(3);
                    ls.setTrangThai(3);
                    lichSuHoaDonService.addLichSuHoaDon(ls);
                    return ResponseEntity.ok(
                            hoaDonService.updateHD(hoaDon,id)
                    );
                }
            }
        }
        lichSuHoaDonService.addLichSuHoaDon(ls);
        return ResponseEntity.ok(hoaDonService.updateHD(hoaDon,id));
    }
    @GetMapping("/detail-lich-su-hoa-don/{idHD}")
    public ResponseEntity<?> detailLSHD(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(lichSuHoaDonService.getLichHoaDon(id));
    }
    @GetMapping("/ngay-hoa-don-time-line/{idHD}")
    public ResponseEntity<?> ngayTimeLine(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(lichSuHoaDonService.HoaDonTimeLine(id));
    }
    @GetMapping("/hoa-don-san-pham/{idHD}")
    public ResponseEntity<?> SanPhamHoaDon(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.detailHDSanPham(id));
    }

    @GetMapping("/san-pham-theo-ma/{ma}")
    public ResponseEntity<?> SanPhamTheoMa(@PathVariable("ma") String ma){
        System.out.println("Mã HĐ "+ma);
        HoaDon hd = hoaDonService.getHDByMa(ma);
        if (hd == null) return ResponseEntity.ok(null);
        System.out.println("Hóa đơn được tìm thấy"+hd);
        return  ResponseEntity.ok(hoaDonService.detailHDSanPham1(hd.getId()));
    }
    @GetMapping("/hoa-don-san-pham-tra/{idHD}")
    public ResponseEntity<?> SanPhamHoaDonTra(@PathVariable("idHD") String id){
        return  ResponseEntity.ok(hoaDonService.detailHDSanPhamTra(id));
    }
    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody HoaDonRequest hoaDonRequest){
        hoaDonRequest.setNgayMua(LocalDateTime.now());
        hoaDonRequest.setNgayTao(LocalDateTime.now());
        return  ResponseEntity.ok(hoaDonService.add(hoaDonRequest));
    }

    @PutMapping("/huy-hoa-don/{ma}")
    public ResponseEntity<?> HuyHoaDon(@PathVariable("ma") String ma) {
        String idHD = hoaDonService.findHoaDonByMa(ma).getId();
        return  ResponseEntity.ok(hoaDonService.deleteHoaDon(idHD));
    }

    // xóa hóa đơn và  roll back sản phẩm
    @DeleteMapping("/delete-hoa-don-chi-tiet/{idCTSP}/{id}")
    public void  deleteHoaDonChiTiet (@PathVariable("idCTSP") String idCTSP,@PathVariable("id")String id) {
        hoaDonChiTietService.huyDonHang(idCTSP,id); //  roll backed
    }
    // xóa hóa đơn và  roll back sản phẩm
    @PutMapping("/xoa-hoa-don/{id}/{maNV}")
    public ResponseEntity<?> HuyHoaDonQuanLyHoaDon(@PathVariable("id") String id,@RequestBody LichSuHoaDonRequest ls, @PathVariable("maNV") String maNV) {
        HoaDon hoaDon=hoaDonService.findHoaDonbyID(id);
        hoaDon.setNgaySua(LocalDateTime.now());
        ls.setNgayTao(LocalDateTime.now());
        ls.setIdHD(id);
        ls.setNguoiTao(maNV);
        ls.setMoTaHoatDong(ls.getMoTaHoatDong());
        ls.setTrangThai(-1);
        lichSuHoaDonService.addLichSuHoaDon(ls);

        return  ResponseEntity.ok(hoaDonService.deleteHoaDon(id));
    }
//    @PutMapping("/update/{ma}")
//    public ResponseEntity<?> update(@PathVariable String ma,@RequestBody LichSuHoaDon khachHang){
//        return   ResponseEntity.ok(khachHangService.update(khachHang,ma));
//    }
//    @DeleteMapping("/delete/{ma}")
//    public ResponseEntity<?> delete(@PathVariable String ma){
//        return  ResponseEntity.ok(khachHangService.delete(ma));
//    }
    @PutMapping("/thanh-toan-hoa-don/{iHD}")
    public ResponseEntity<?> ThanhToanHoaDon(@PathVariable("idHD") String idHD){
        HoaDon hoaDon = hoaDonService.findHoaDonbyID(idHD);
        hoaDon.setTrangThai(4);
        LichSuHoaDonRequest lichSuHoaDonRequest = new LichSuHoaDonRequest();
        lichSuHoaDonRequest.setIdHD(idHD);
        lichSuHoaDonRequest.setTrangThai(4);
        lichSuHoaDonRequest.setNgayTao(LocalDateTime.now());
        lichSuHoaDonRequest.setNguoiTao(hoaDon.getNguoiTao());
        lichSuHoaDonService.addLichSuHoaDon(lichSuHoaDonRequest);
        if (hoaDon.getVoucher() != null) {
            Voucher voucher = voucherService.detailVoucher(hoaDon.getVoucher().getId());
            voucher.setSoLuong(voucher.getSoLuong() -1 );
            voucherService.add(voucher);
        }
        return ResponseEntity.ok(hoaDonService.addHoaDon(hoaDon));
    }

    @PutMapping("/them-san-pham/{idHD}/{idCTSP}/{maNV}")
    public ResponseEntity<?> themSanPham(@PathVariable("idHD") String idHD, @PathVariable("idCTSP")String idCTSP  ,@PathVariable("maNV") String maNV){
        List<AdminHoaDonSanPham>  list = hoaDonService.detailHDSanPham(idHD); // danh sách hóa đơn chi tiết
        ChiTietSanPham ctsp = ctspService.findChiTietSanPhamByID(idCTSP); // chi tiết sản phẩm được chọn
        HoaDon hd = hoaDonService.findHoaDonbyID(idHD); // hóa đơn hiện tại
        KhuyenMai km = ctsp.getKhuyenMai() != null ? khuyenMaiService.detailKhuyenMai(ctsp.getKhuyenMai().getId()) : null; // khuyến mại nếu có
        // Kiểm tra xem phần tử được thêm vào có trùng hợp với phần tử đã có hay không
        for (AdminHoaDonSanPham x : list){
            if (km != null) {
                if (km.getLoai().equals("Tiền mặt")) {
                    if ((new BigDecimal(x.getGiaBanSP()).compareTo(ctsp.getGiaBan().subtract(km.getGia_tri_khuyen_mai())) == 0) && x.getIDCTSP().equals(ctsp.getId())) {
                        HoaDonChiTiet hdct = hoaDonChiTietService.getHDCTByID(x.getID());
                        hdct.setSoLuong(hdct.getSoLuong() + 1);
                        hd.setGiaGoc(hd.getGiaGoc().add(new BigDecimal(x.getGiaBanSP())));
                        hd.setThanhTien(hd.getThanhTien().add(new BigDecimal(x.getGiaBanSP())));
                        ResponseEntity.ok(hoaDonChiTietService.saveHDCT(hdct));
                        return ResponseEntity.ok(hoaDonService.updateSample(hd));
                    }
                }
                else {
                    if ((new BigDecimal(x.getGiaBanSP()).compareTo(ctsp.getGiaBan().subtract(ctsp.getGiaNhap().multiply(km.getGia_tri_khuyen_mai()).divide(new BigDecimal(100)))) == 0) && x.getIDCTSP().equals(ctsp.getId())) {
                        HoaDonChiTiet hdct = hoaDonChiTietService.getHDCTByID(x.getID());
                        hdct.setSoLuong(hdct.getSoLuong() + 1);
                        hd.setGiaGoc(hd.getGiaGoc().add(new BigDecimal(x.getGiaBanSP())));
                        hd.setThanhTien(hd.getThanhTien().add(new BigDecimal(x.getGiaBanSP())));
                        ResponseEntity.ok(hoaDonChiTietService.saveHDCT(hdct));
                        return ResponseEntity.ok(hoaDonService.updateSample(hd));
                    }
                }
            }
            else {
                if ((new BigDecimal(x.getGiaBanSP()).compareTo(ctsp.getGiaBan()) == 0) && x.getIDCTSP().equals(ctsp.getId())) {
                    HoaDonChiTiet hdct = hoaDonChiTietService.getHDCTByID(x.getID());
                    hdct.setSoLuong(hdct.getSoLuong() + 1);
                    hd.setGiaGoc(hd.getGiaGoc().add(new BigDecimal(x.getGiaBanSP())));
                    hd.setThanhTien(hd.getThanhTien().add(new BigDecimal(x.getGiaBanSP())));
                    ResponseEntity.ok(hoaDonChiTietService.saveHDCT(hdct));
                    return ResponseEntity.ok(hoaDonService.updateSample(hd));
                }
            }
        }
        // hết kiểm tra
        HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet();
        hoaDonChiTiet.setId(UUID.randomUUID().toString());
        hoaDonChiTiet.setHoaDon(hoaDonService.findHoaDonbyID(idHD));
        hoaDonChiTiet.setChiTietSanPham(ctspService.findChiTietSanPhamByID(ctsp.getId()));
        hoaDonChiTiet.setTrangThai(0);
        hoaDonChiTiet.setSoLuong(1);
        hoaDonChiTiet.setNgayTao(LocalDateTime.now());
        hoaDonChiTiet.setNguoiTao(maNV);
        if (ctsp.getKhuyenMai() != null){

            if (km.getLoai().equalsIgnoreCase("Tiền mặt")) {
                hoaDonChiTiet.setGiaSauGiam(ctsp.getGiaBan().subtract(km.getGia_tri_khuyen_mai()));
                hoaDonChiTiet.setGiaGiam(km.getGia_tri_khuyen_mai());
                hd.setGiaGoc(hd.getGiaGoc().add(ctsp.getGiaBan().subtract(km.getGia_tri_khuyen_mai())));
                hd.setThanhTien(hd.getThanhTien().add(ctsp.getGiaBan().subtract(km.getGia_tri_khuyen_mai())));
            } else {
                hoaDonChiTiet.setGiaSauGiam(ctsp.getGiaBan().subtract(ctsp.getGiaNhap().multiply(km.getGia_tri_khuyen_mai()).divide(new BigDecimal(100))));
                hoaDonChiTiet.setGiaGiam(ctsp.getGiaNhap().multiply(km.getGia_tri_khuyen_mai()).divide(new BigDecimal(100)));
                hd.setGiaGoc(hd.getGiaGoc().add(ctsp.getGiaBan().subtract(ctsp.getGiaNhap().multiply(km.getGia_tri_khuyen_mai()).divide(new BigDecimal(100)))));
                hd.setThanhTien(hd.getThanhTien().add(ctsp.getGiaBan().subtract(ctsp.getGiaNhap().multiply(km.getGia_tri_khuyen_mai()).divide(new BigDecimal(100)))));
            }
        } else {
            hoaDonChiTiet.setGiaSauGiam(ctsp.getGiaBan());
            hoaDonChiTiet.setGiaGiam(new BigDecimal(0));
            hd.setGiaGoc(hd.getGiaGoc().add(ctsp.getGiaBan()));
            hd.setThanhTien(hd.getThanhTien().add(ctsp.getGiaBan()));
        }
        ResponseEntity.ok(hoaDonChiTietService.saveHDCT(hoaDonChiTiet));
        return ResponseEntity.ok(hoaDonService.updateSample(hd));
    }
}
