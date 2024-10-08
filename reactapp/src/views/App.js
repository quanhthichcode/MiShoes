import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppConfig } from "./AppConfig";
import { Suspense } from "react";
import AuthGuard from "../guard/AuthGuard";
import DashboardCensor from "../layout/censor/DashboardCensor";
import NotFoud from "../pages/404/NotFoud";
import NotAccess from "../pages/403/NotAccess";
import { DashboardClient } from "../layout/user/DashboardClient";
import { GetLoading } from "../store/reducer/Loading.reducer";
import { useAppSelector } from "../store/redux/hook";
import loading from "../assets/images/logo.png";

// quanh nguu
import DanhMuc from "../pages/censor/sanPham-management/DanhMuc";
import DeGiay from "../pages/censor/sanPham-management/DeGiay";
import ChatLieu from "../pages/censor/sanPham-management/ChatLieu";
import KichThuoc from "../pages/censor/sanPham-management/KichThuoc";
import MauSac from "../pages/censor/sanPham-management/MauSac";
import Hang from "../pages/censor/sanPham-management/Hang";
import SanPham from "../pages/censor/sanPham-management/SanPham";
import ChiTietSanPham from "../pages/censor/sanPham-management/CTSP";
import AddSanPham from "../pages/censor/sanPham-management/AddSanPham";
import CTSP from "../pages/censor/sanPham-management/CTSP";
//hoa don
import HoaDon from "../pages/censor/hoaDon-management/HoaDon2";
import HoaDonDetail from "../pages/censor/hoaDon-management/HoaDonDetail";

//khachhang
import KhachHang from "../pages/censor/khachHang-management/KhachHang";
import UpdateKhachHang from "../pages/censor/khachHang-management/UpdateKhachHang";
import DetailKhachHang from "../pages/censor/khachHang-management/DetailKhachHang";
import AddKhachHang from "../pages/censor/khachHang-management/AddKhachHang";

//nhanvien
import NhanVien from "../pages/censor/nhanVien-management/NhanVien";
import DetailNhanVien from "../pages/censor/nhanVien-management/DetailNhanVien";
import AddNhanVien from "../pages/censor/nhanVien-management/AddNhanVien";
import UpdateNhanVien from "../pages/censor/nhanVien-management/UpdateNhanVien";
//khuyenmai
import KhuyenMai from "../pages/censor/khuyenmai-management/KhuyenMai";
import ThemKhuyenMai from "../pages/censor/khuyenmai-management/ThemKhuyenMai";
import SuaKhuyenMai from "../pages/censor/khuyenmai-management/SuaKhuyenMai";
//voucher
import Voucher from "../pages/censor/voucher-management/Voucher";
import AddVoucher from "../pages/censor/voucher-management/AddVoucher";
import ModalDetailVoucher from "../pages/censor/voucher-management/ModalDetailVoucher";
import ModelUpdateVoucher from "../pages/censor/voucher-management/ModelUpdateVoucher";
// thong ke
import ThongKe from "../pages/censor/thongKe-management/ThongKe";
// ban hang
import BanHang from "../pages/censor/banHang-management/BanHang";
import GuestGuard from "../guard/GuestGuard";
import { Home } from "../layout/user/home";
import { Login } from "../layout/login/login";
import { GioHang } from "../layout/user/cart/gioHang";
import { Shop } from "../layout/user/shop/shop";
import ChiTietDonHang from "../layout/user/history/ChiTietDonHang";
import ALLTabHistoryClient from "../layout/user/history/ALLTabHistoryClient";
import TraCuuDonHangClient from "../layout/user/history/TraCuuDonHangClient";
import DetailTraCuuDonHang from "../layout/user/history/DetailTraCuuDonHang";
import { SignUp } from "../layout/login/signUp";
import { ForgotPass } from "../layout/login/forgotPassword";
import AccountProfile from "../layout/user/profile/profile";
import ThanhToanThanhCong from "../layout/user/thongBaoThanhToan/thanhToanThanhCong";
import ThanhToanThatBai from "../layout/user/thongBaoThanhToan/thanhToanThatBai";
import { CartProvider } from "../layout/user/cart/CartContext";
import TraHang from "../pages/censor/traHang-managenment/traHang";
import DetailHoaDonTraHang from "../pages/censor/traHang-managenment/DetailHoaDonTraHang";
import PhieuGiamGiaCLient from "../layout/user/phieugiamgia/PhieuGiamGiaClient";

function App() {
  const isLoading = useAppSelector(GetLoading);

  return (
    <div className="App">
      {/* {isLoading && (
        <div className="loading-overlay">
          <div className="loading-logo">
            <img src={loading} alt="Logo" />
          </div>
        </div>
      )} */}

      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense>
          <Routes>
            <Route path="*" element={<NotFoud />} />
            <Route path="/not-access" element={<NotAccess />} />
            <Route
              path="/"
              element={<Navigate replace to="/admin-thong-ke" />}
            />
            {/* Màn censor */}
            <Route
              path="/admin-thong-ke"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ThongKe />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-voucher"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <Voucher />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-add-voucher"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <AddVoucher />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-update-voucher/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ModelUpdateVoucher />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-detail-voucher/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ModalDetailVoucher />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-chi-tiet-san-phan"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ChiTietSanPham />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-nhan-vien"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <NhanVien />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-them-nhan-vien"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <AddNhanVien />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-update-nhan-vien/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <UpdateNhanVien />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-detail-nhan-vien/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <DetailNhanVien />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-khach-hang"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <KhachHang />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-them-khach-hang"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <AddKhachHang />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-update-khach-hang/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <UpdateKhachHang />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-detail-khach-hang/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <DetailKhachHang />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-danh-muc"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <DanhMuc />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-de-giay"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <DeGiay />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-chat-lieu"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ChatLieu />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-hang"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <Hang />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-kich-thuoc"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <KichThuoc />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-mau-sac"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <MauSac />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-san-pham"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <SanPham />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-showct/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <CTSP />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-them-san-pham"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <AddSanPham />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-hoa-don"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <HoaDon />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-detail-hoa-don/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <HoaDonDetail />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-khuyen-mai"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <KhuyenMai />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-them-khuyen-mai"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <ThemKhuyenMai />
                  </DashboardCensor>
                </AuthGuard>
              }
            />

            <Route
              path="/admin-sua-khuyen-mai/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <SuaKhuyenMai />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-ban-hang"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <BanHang />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-tra-hang"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <TraHang />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            <Route
              path="/admin-detail-tra-hang/:id"
              element={
                <AuthGuard>
                  <DashboardCensor>
                    <DetailHoaDonTraHang />
                  </DashboardCensor>
                </AuthGuard>
              }
            />
            {/* Màn client */}
            <Route
              path="/home"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <Home />
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            <Route
              path="/gio-hang"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <GioHang />
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            <Route
              path="/san-pham"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <Shop />
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            <Route
              path="/history"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <ALLTabHistoryClient />
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            <Route
              path="/chi-tiet-don-hang/:idHD"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <ChiTietDonHang />
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            <Route
              path="/tra-cuu-don-hang"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <TraCuuDonHangClient />
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            <Route
              path="/hd/:idHD"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <DetailTraCuuDonHang />
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            <Route
              path="/tai-khoan-cua-toi"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <AccountProfile />
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            <Route
              path="/phieu-giam-gia-cua-toi"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <PhieuGiamGiaCLient/>
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            <Route
              path="/thanh-toan-thanh-cong"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <ThanhToanThanhCong />
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            <Route
              path="/thanh-toan-that-bai"
              element={
                <GuestGuard>
                  <CartProvider>
                    <DashboardClient>
                      <ThanhToanThatBai />
                    </DashboardClient>
                  </CartProvider>
                </GuestGuard>
              }
            />
            {/* Màn login */}

            <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
            <Route
              path="/sign-up"
              element={
                <GuestGuard>
                  <SignUp />
                </GuestGuard>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <GuestGuard>
                  <ForgotPass />
                </GuestGuard>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
