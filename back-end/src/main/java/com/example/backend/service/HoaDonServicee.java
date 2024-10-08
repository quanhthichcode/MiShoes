package com.example.backend.service;
import com.example.backend.dto.request.GioHangRequest;
import com.example.backend.dto.request.HoaDonRequest;
import com.example.backend.dto.request.hoadonsearch.HoaDonSearch;
import com.example.backend.dto.request.sanphamsearch.BangConSearch;
import com.example.backend.dto.response.AdminHoaDonDetailRespon;
import com.example.backend.dto.response.AdminHoaDonResponn;
import com.example.backend.dto.response.DetailUpdateDiaChiHoaDonRespon;
import com.example.backend.dto.response.sanpham.DanhMucRespone;
import com.example.backend.entity.HoaDon;
import com.example.backend.entity.HoaDonChiTiet;
import com.example.backend.entity.NguoiDung;
import com.example.backend.entity.Voucher;
import com.example.backend.model.AdminBillForSellRespon;
import com.example.backend.model.AdminHoaDonSanPham;
import com.example.backend.repository.HoaDonChiTietRepository;
import com.example.backend.repository.HoaDonRepository;
import com.example.backend.repository.NguoiDungRepository;
import com.example.backend.repository.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HoaDonServicee {
    @Autowired
    HoaDonRepository hoaDonRepository;

    @Autowired
    NguoiDungRepository nguoiDungRepository;

    @Autowired
    VoucherRepository voucherRepository;
    @Autowired
    ThongBaoService thongBaoService;
    @Autowired
    HoaDonChiTietRepository hoaDonChiTietRepository;
    public List<AdminHoaDonResponn> getALL() {
        return hoaDonRepository.getALLHD();
    }
    public List<AdminHoaDonResponn> getHoaDonChoTaiQuay() {
        return hoaDonRepository.getHoaDonChoTaiQuay();
    }
    public List<AdminBillForSellRespon> getAllBill() {
        return hoaDonRepository.getAllBill();
    }

    public HoaDon deleteHoaDon(String idHD) {
        HoaDon hoaDon = hoaDonRepository.findById(idHD).get();
        hoaDon.setTrangThai(-1);
        thongBaoService.VanDon(idHD);
        return  hoaDonRepository.save(hoaDon);
    }
    public List<HoaDon> getAllBillToday() {
        return hoaDonRepository.getAllBillToday();
    }

    public List<AdminHoaDonResponn> getALLTT(int tt) {
        return hoaDonRepository.getALLHDTT(tt);
    }

    public AdminHoaDonDetailRespon getByID(String id){
        return hoaDonRepository.detailHD(id);
    }
    public DetailUpdateDiaChiHoaDonRespon detailUpdateDiaChiHoaDonRespon(String id){
        return hoaDonRepository.detailUpdateDiaChiHoaDon(id);
    }

    public HoaDon updateKH(String ma,String idKH){
        HoaDon hoaDon = hoaDonRepository.getHDByMa(ma);
        NguoiDung nguoiDung = nguoiDungRepository.findById(idKH).get();
        System.out.println("hoa don"+hoaDon);
        hoaDon.setNguoiDung(nguoiDung);
        return hoaDonRepository.save(hoaDon);
    }

    public HoaDon updateReturnKhachLe(String ma){
        HoaDon hoaDon = hoaDonRepository.getHDByMa(ma);
        hoaDon.setNguoiDung(null);
        System.out.println("hoa don"+hoaDon);
        return hoaDonRepository.save(hoaDon);
    }
    public HoaDon updateHD(HoaDon hoaDon,String id){
        thongBaoService.VanDon(id);
//        HoaDon hoaDon1= findHoaDonbyID(id);
        Optional<HoaDon> optional = hoaDonRepository.findById(id);
        return optional.map(o->{
//            o.setTrangThai((hoaDon1.getTrangThai())+1);
            return hoaDonRepository.save(o);
        }).orElse(null);
//         return hoaDonResponn.save(hoaDon);

    }

    public HoaDon updateTraSau(String ma,String idNV){
        HoaDon hoaDon = findHoaDonByMa(ma);
        hoaDon.setTraSau(1);
        hoaDon.setNhanVien(idNV);
        hoaDon.setNgayMua(LocalDateTime.now());
        return hoaDonRepository.save(hoaDon);
    }

    public HoaDon update(HoaDon hd,String idHD){
        HoaDon hoaDon = findHoaDonbyID(idHD);
        hoaDon.setDiaChi(hd.getDiaChi());
        hoaDon.setNgayDuKienNhan(hd.getNgayDuKienNhan());
        hoaDon.setTenNguoiNhan(hd.getTenNguoiNhan());
        hoaDon.setSoDienThoai(hd.getSoDienThoai());
        hoaDon.setEmail(hd.getEmail());
        hoaDon.setTienVanChuyen(hd.getTienVanChuyen());
        hoaDon.setNgayMua(LocalDateTime.now());
        hoaDon.setTrangThai(4);
        hoaDon.setGhiChu(hd.getGhiChu());
        return hoaDonRepository.save(hoaDon);
    }

    public HoaDon update1(HoaDon hd,String ma){
        HoaDon hoaDon = findHoaDonByMa(ma);
        hoaDon.setDiaChi(hd.getDiaChi());
        hoaDon.setNgayDuKienNhan(hd.getNgayDuKienNhan());
        hoaDon.setTenNguoiNhan(hd.getTenNguoiNhan());
        hoaDon.setSoDienThoai(hd.getSoDienThoai());
        hoaDon.setEmail(hd.getEmail());
        hoaDon.setTienVanChuyen(hd.getTienVanChuyen());
        return hoaDonRepository.save(hoaDon);
    }

    public HoaDon deleteVanChuyen(String ma){
        HoaDon hoaDon = findHoaDonByMa(ma);
        hoaDon.setDiaChi("");
        hoaDon.setNgayDuKienNhan(null);
        hoaDon.setTenNguoiNhan("");
        hoaDon.setSoDienThoai("");
        hoaDon.setEmail("");
        hoaDon.setTienVanChuyen(null);
        return hoaDonRepository.save(hoaDon);
    }

    public HoaDon addVoucherToHD(String idHD, String idVoucher) {
        HoaDon hoaDon = hoaDonRepository.getHoaDonByIDHD(idHD);
        Voucher voucher = voucherRepository.findById(idVoucher).get() ;
        System.out.println("Hóa đơn"+hoaDon);
        System.out.println("Voucherr"+voucher);
        hoaDon.setVoucher(voucher);
        BigDecimal giamToiDa = voucher.getGiamToiDa();
        BigDecimal giam = voucher.getLoaiVoucher().equals("Tiền mặt") ?
                ( BigDecimal.valueOf(voucher.getMucDo()).compareTo(giamToiDa) < 0 ?  BigDecimal.valueOf(voucher.getMucDo()) : giamToiDa ) :
                ((hoaDon.getThanhTien().multiply(BigDecimal.valueOf(voucher.getMucDo())).divide(new BigDecimal(100))).compareTo(giamToiDa) < 0 ? (hoaDon.getThanhTien().multiply(BigDecimal.valueOf(voucher.getMucDo())).divide(new BigDecimal(100))) : giamToiDa);
        System.out.println("Giảm"+giam);
        hoaDon.setGiaGiamGia(giam);
        hoaDon.setThanhTien(hoaDon.getGiaGoc().subtract(giam));
        return hoaDonRepository.save(hoaDon);
    }

    public HoaDon updateThanhTien(String idHD) { // khi chưa sử dụng voucher
        List<HoaDonChiTiet> list = hoaDonChiTietRepository.getAllHDCTByIDHD(idHD);
        HoaDon hoaDon = hoaDonRepository.findById(idHD).get();
        System.out.println("List"+list.size());
        System.out.println("Hóa đơn tiền"+hoaDon);
        BigDecimal tong = new BigDecimal("0");
        for (HoaDonChiTiet x : list) {
           tong =  tong.add(x.getGiaSauGiam());
        }
        hoaDon.setGiaGoc(tong);
        hoaDon.setThanhTien(tong);
        hoaDon.setGiaGiamGia(new BigDecimal("0"));
        return hoaDonRepository.save(hoaDon);
    }
    public HoaDon findHoaDonbyID(String id){
        return  hoaDonRepository.findById(id).get();
    }

    public HoaDon findHoaDonByMa(String ma){
        return hoaDonRepository.getHDByMa(ma);
    }
    public List<AdminHoaDonSanPham> detailHDSanPham(String  key){
        return  hoaDonRepository.detailHDSanPham(key);
    }
    public List<AdminHoaDonSanPham> detailHDSanPham1(String  key){
        return  hoaDonRepository.detailHDSanPham1(key);
    }
    public List<AdminHoaDonSanPham> detailHDSanPhamTra(String  key){
        return  hoaDonRepository.detailHDSanPhamTra(key);
    }
    public HoaDon add(HoaDonRequest hoaDonRequest){
        HoaDon hoaDon= hoaDonRequest.map(new HoaDon());
        return  hoaDonRepository.save(hoaDon);

    }

    public HoaDon thanhToanHoaDon(String maHD) {
        HoaDon hoaDonCT=hoaDonRepository.getHDByMa(maHD);
        hoaDonCT.setNgayMua(LocalDateTime.now());
      return  hoaDonRepository.save(hoaDonCT);
    }

    public HoaDon updateTrangThaiHoaDon(HoaDon hd){
        return  hoaDonRepository.save(hd);

    }
    public HoaDon addHoaDon (HoaDon hd){

        hd.setTraSau(0);
        return  hoaDonRepository.save(hd);
    }

    public List<AdminHoaDonResponn> getTim(HoaDonSearch hoaDonSearch)
    {
        return hoaDonRepository.timKiemHoaDon(hoaDonSearch);
    }
//    public HoaDon addHoaDonClient(GioHangRequest request){
//        HoaDon hd=new HoaDon();
//        hd.setLoaiHoaDon(0);
//        hd.setNguoiDung(NguoiDung.builder().id(request.getKhachHang()).build());
//        return hoaDonRepository.save(hd);
//    }
//    public LichSuHoaDon update(LichSuHoaDon kh, String ma){
//        Optional<LichSuHoaDon> optional =khachHangRespon.findById(ma);
//        return optional.map(o->{
//            o.setTenKhachHang(kh.getTenKhachHang());
//            o.setSinhNhat(kh.getSinhNhat());
//            o.setGioiTinh(kh.getGioiTinh());
//            o.setSoDienThoai(kh.getSoDienThoai());
//            o.setDiaChi(kh.getDiaChi());
//            return khachHangRespon.save(o);
//        }).orElse(null);
//    }
//    public LichSuHoaDon delete(String ma){
//        Optional<LichSuHoaDon> optional=khachHangRespon.findById(ma);
//        return optional.map(o->{
//             khachHangRespon.delete(o);
//             return o;
//        }).orElse(null) ;
//    }

    public HoaDon getHDByIDHD(String idHD){
        System.out.println("Hóa đơn service"+hoaDonRepository.getHoaDonByIDHD(idHD));
        return hoaDonRepository.getHoaDonByIDHD(idHD);
    }

    public HoaDon updateSample(HoaDon hd){
        return hoaDonRepository.save(hd);
    }

    public HoaDon getHDByMa(String ma){
        return  hoaDonRepository.getHDByMa(ma);
    }
}