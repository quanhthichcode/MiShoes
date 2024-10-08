import { Button, Modal, Space, Table, Tag, Image } from "antd";
import logo from "../../../assets/images/logo.png";
import { FormattedNumber, IntlProvider } from "react-intl";
import imgTicket from "../../../assets/images/discountTicket.png";
import { HoaDonAPI } from "../api/hoaDon/hoaDon.api";
import { ToastContainer, toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";


const ModalInHoaDon = (props) => {
  const componnentRef = useRef();
  const {openInHoaDon, setOpenInHoaDon , openThanhToan} = props;
  const [hoaDondetail, setHoaDondetail] = useState([]);
  const [trangThai, setTrangThai] = useState([]);
  const [listSanPhams, setlistSanPhams] = useState([]);
  const id = props.id;

  console.log("IDDDĐ ",id);
  console.log("in hóa đơn "+props.openInHoaDon);
  console.log("Hóa đơn detail ",hoaDondetail);
  const loadHoaDon =  () => {
    HoaDonAPI.chiTietHoaDonTheoMa(id).then((res) => {
      console.log("DATA :"+id);
      if (!res.data) return;
      setHoaDondetail(res.data);
      setTrangThai(res.data.trangThai);
      console.log("DATA IN BILL :",res);
    });
  }


  const handleCloseInHoaDon = () => {
    setOpenInHoaDon(false);
  };

  const loadListSanPhams =  () => {
    HoaDonAPI.hoaDonSanPhamTheoMa(id).then((res) => {
      if (!res.data) return;
      setlistSanPhams(res.data);
      console.log("DATA :",res)
  
    });
  };
  useEffect(() => {
    if (id) {
    loadHoaDon();
    loadListSanPhams();
    }
  },[id,openThanhToan]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Thực hiện công việc bạn muốn ở đây
  //     if (id && !hoaDondetail ) {
  //       loadHoaDon();
  //       loadListSanPhams();
  //       }
  //   }, 1000);

  //   // Đảm bảo dọn dẹp interval khi component unmount hoặc khi useEffect chạy lại
  //   return () => clearInterval(interval);
  // }, []);

  const handlePrint = useReactToPrint({
    content: () => componnentRef.current,
    documentTitle: "hoaDon",
    onAfterPrint: () =>
      toast("🦄 Thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }),
  });
    return (
        <Modal
        footer={[]}
        title="In hóa đơn"
        centered
        open={openInHoaDon}
        onOk={handleCloseInHoaDon}
        onCancel={handleCloseInHoaDon}
        width={1000}
        height={600}
        zIndex={20000}
      >
        <>
          <div ref={componnentRef} className="row">
            <div className="col-md-2">
              <img
                src={logo}
                style={{ width: 150, height: 150, marginLeft: 30 }}
              />
            </div>

            <h2 className=" my-5  py-2 col-md-10 " style={{ paddingLeft: 250 }}>
              {" "}
              MI SHOES
            </h2>
            <div className="col-md-3">
              <div style={{ marginLeft: 30 }}>
                <h6>Tên khách hàng:</h6>
              </div>
              <div className="mt-4" style={{ marginLeft: 30 }}>
                <h6>Số điện thoại:</h6>
              </div>
              <div className="mt-4" style={{ marginLeft: 30 }}>
                <h6>Địa chỉ:</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <p>{hoaDondetail?.tenKH}</p>
              </div>
              <div className="mt-4">
                <p>{hoaDondetail?.sdt}</p>
              </div>
              <div className="mt-4">
                <p>{hoaDondetail?.diaChi}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="ps-4">
                <h6>Trạng thái:</h6>
              </div>
              <div className="mt-4 ps-4">
                <h6>Loại:</h6>
              </div>
              <div className="mt-4 ps-4">
                <h6>Thành tiền:</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                {trangThai == 0 ? (
                  <Tag color="purple">Chờ xác nhận</Tag>
                ) : trangThai == 1 ? (
                  <Tag color="red">Xác nhận</Tag>
                ) : trangThai == 2 ? (
                  <Tag color="blue">Chờ vận chuyển</Tag>
                ) : trangThai == 3 ? (
                  <Tag color="cyan">Đang Vận chuyển</Tag>
                ) : trangThai == 4 ? (
                  <Tag color="orange">Đã Thanh toán</Tag>
                ) : (
                  <Tag color="green">Thành công</Tag>
                )}
              </div>
              <div className="mt-4">
                {hoaDondetail?.loaiHD == 0 ? (
                  <Tag color="orange">Online</Tag>
                ) : (
                  <Tag color="red">Tại quầy</Tag>
                )}
              </div>
              <div className="mt-4">
                <p>
                  {" "}
                  <IntlProvider locale="vi-VN">
                    <div>
                      <FormattedNumber
                        value={hoaDondetail?.thanhTien}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                      />
                    </div>
                  </IntlProvider>
                </p>
              </div>
            </div>
            <div className="container-fuild mt-3 row  radius">
              <div>
                {listSanPhams ? listSanPhams?.map((listSanPham) => (
                  <tr className="pt-3 row">
                    <div className="col-md-4">
                      <Image
                        cloudName="dtetgawxc"
                        publicId={listSanPham.urlHA}
                        width="100"
                        crop="scale"
                        href={listSanPham.urlHA}
                        src={listSanPham.urlHA}
                        style={{
                          width: 100,
                          height: 100,
                          marginLeft: 40,
                          zIndex:200000
                        }}
                      />
                      {/* <img src={listSanPham.tenHA} style={{ width: 100, height: 100, marginLeft: 40 }} />  */}
                    </div>
                    <div className="col-md-6 ">
                      <div className="mt-4">
                        <h6>
                          {listSanPham.tenHang} {listSanPham.tenSP}{" "}
                          {listSanPham.tenMauSac}
                        </h6>
                      </div>
                      <div className="text-danger">
                        <h6>
                          <IntlProvider locale="vi-VN">
                            <div>
                              <FormattedNumber
                                value={listSanPham.giaBanSP}
                                style="currency"
                                currency="VND"
                                minimumFractionDigits={0}
                              />
                            </div>
                          </IntlProvider>
                        </h6>
                      </div>
                      <div>Size:{listSanPham.tenKichThuoc}</div>
                      <div>x{listSanPham.soLuongSP}</div>
                    </div>

                    <div className="col-md-2 text-danger mt-5">
                      <h6>
                        <IntlProvider locale="vi-VN">
                          <div>
                            <FormattedNumber
                              value={(parseFloat(listSanPham.thanhTienSP) * parseFloat(listSanPham.soLuongSP))}
                              style="currency"
                              currency="VND"
                              minimumFractionDigits={0}
                            />
                          </div>
                        </IntlProvider>
                      </h6>
                    </div>
                  </tr>
                )) : ""}
              </div>
              <hr></hr>
              <tr className="pt-3 row">
                <div className="col-md-6">
                  <div className="row">
                    <h6 className="col-md-3 mt-2">Mã giảm giá:</h6>
                    <p className="col-md-6">
                      {hoaDondetail?.voucher == null ? "Không có voucher" : hoaDondetail?.voucher.ma}
                </p>
                  </div>
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3">
                  <div className="d-flex">
                    <h6 className="col-md-6">Tiền hàng:</h6>{" "}
                    <p className="col-md-6">
                      <IntlProvider locale="vi-VN">
                        <div>
                          <FormattedNumber
                            value={hoaDondetail?.thanhTien}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        </div>
                      </IntlProvider>
                    </p>{" "}
                  </div>
                  <div className="d-flex">
                    <h6 className="col-md-6">Phí vận chuyển:</h6>{" "}
                    <p className="col-md-6">
                    <IntlProvider locale="vi-VN">
                        <div>
                          <FormattedNumber
                            value={hoaDondetail?.tienVanChuyen == null ? 0 : hoaDondetail.tienVanChuyen}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        </div>
                      </IntlProvider>
                      </p>{" "}
                  </div>
                  <div className="d-flex">
                    <h6 className="col-md-6">Tổng tiền giảm:</h6>{" "}
                    <p className="col-md-6">0 VND</p>{" "}
                  </div>
                  <div className="d-flex">
                    <h6 className="col-md-6">Tổng giảm:</h6>{" "}
                    <p className="col-md-6">
                      <IntlProvider locale="vi-VN">
                        <div>
                          <FormattedNumber
                            value={hoaDondetail?.giaGiamGia == null ? 0 : hoaDondetail.giaGiamGia}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        </div>
                      </IntlProvider>
                    </p>
                  </div>
                </div>
              </tr>
            </div>
          </div>
          <button
            className="bg-primary text-light rounded-pill mt-5 fs-5"
            style={{ marginLeft: 420 }}
            onClick={handlePrint}
          >
            Xuất hóa đơn
          </button>
        </>
      </Modal>
            );
};
export default ModalInHoaDon;
