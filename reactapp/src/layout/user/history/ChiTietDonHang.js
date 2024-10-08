import { Avatar, Flex, Button, Space, Tabs, Tag } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { BsShop } from "react-icons/bs";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { TfiPencil } from "react-icons/tfi";
import "./history.css";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { GiNotebook, GiPiggyBank, GiReturnArrow } from "react-icons/gi";
import { SlNotebook } from "react-icons/sl";
import { RiTruckFill } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import LogoGHN from "../../../assets/images/LogoGHN.png";
import { HoaDonClientAPI } from "../../../pages/censor/api/HoaDonClient/HoaDonClientAPI";
import { HoaDonAPI } from "../../../pages/censor/api/hoaDon/hoaDon.api";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { MdArrowBackIos } from "react-icons/md";
import { get, set } from "local-storage";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { ImCancelCircle } from "react-icons/im";
import ProfileMenu from "../profile/ProfileMenu";
const ChiTietDonHang = (props) => {
  const idHD = useParams();
    const storedData = get("userData");
      const [userName, setUserName] = useState("");
      const [AnhUser, setLinkAnhUser] = useState("");
  const nav = useNavigate();
  const [listBillHistory, setListBillHistory] = useState([]);
  const [listTimeLine, setlistTimeLine] = useState([]);
  const [statusPresent, setStatusPresent] = useState([]);
  const [bill, setBill] = useState({});
  console.log("bill",bill);
  const [paymentMethod, setPaymentMethod] = useState({});
       var stomp = null;
       const socket = new SockJS("http://localhost:8080/ws");
       stomp = Stomp.over(socket);

       useEffect(() => {
         stomp.connect({}, () => {
           console.log("connect websocket");

           stomp.subscribe("/topic/KH/hoa-don", (mes) => {
             try {
               const pare = JSON.parse(mes.body);
               console.log(pare);
               // ví du: bạn muốn khi khách hàng bấm đặt hàng mà load lại hóa đơn màn admin thì hãy gọi hàm load all hóa đơn ở đây
               // thí dụ: đây là hàm laod hóa đơn: loadHoaDon(); allThongBao(); CountThongBao();
               loadTimeLine();
         
             } catch (e) {
               console.log("lỗi mẹ ròi xem code di: ", e);
             }
           });
         });

         return () => {
           stomp.disconnect();
         };
       }, []);
       
  useEffect(() => {
       setUserName(storedData.ten);
       setLinkAnhUser(storedData.anh);
    HoaDonClientAPI.DetailHoaDonClient(idHD.idHD).then((res) => {
      setBill(res.data);
    });
loadTimeLine();

  }, []);
  const loadTimeLine = () => {
    HoaDonClientAPI.getAllLichSuHoaDon(idHD.idHD).then((res) => {
      setlistTimeLine(res.data);
      console.log(res);
    });
  };
    const goBack = () => {
      window.history.back(); // Quay lại trang trước đó trong lịch sử duyệt
    };

  const showIcon = (trangThai) => {
    if (trangThai === "0") {
      return GiNotebook;
    } else if (trangThai === "1") {
      return SlNotebook;
    } else if (trangThai === "2") {
      return RiTruckFill;
    } else if (trangThai === "3") {
      return FaTruckFast;
    } else if (trangThai === "4") {
      return GiPiggyBank;
    } else if (trangThai === "5") {
      return FaCheckCircle;
    } else if (trangThai === "10") {
      return GiReturnArrow;
    } else if (trangThai === "-1") {
      return ImCancelCircle;
    }
  };

  const showTitle = (trangThai) => {
    if (trangThai === "0") {
      return "Chờ xác nhận";
    } else if (trangThai === "1") {
      return "Đã xác Nhận";
    } else if (trangThai === "2") {
      return "Chờ vận chuyển";
    } else if (trangThai === "3") {
      return "Đang vận chuyển";
    } else if (trangThai === "4") {
      return "Đã thanh toán";
    } else if (trangThai === "5") {
      return "Thành công";
    } else if (trangThai === "10") {
      return "Trả hàng";
    } else if (trangThai === "-1") {
      return "Hủy";
    }
  };
  return (
    <div className="row pt-3 ">
      <ProfileMenu></ProfileMenu>

      {/* Tab */}
      <div className="col-md-10 ">
        <div className="row" style={{ borderBottom: "1px solid #000" }}>
          <div onClick={goBack} className="col button-back">
            <MdArrowBackIos /> <span className="fs-6">Trở lại</span>
          </div>
          <div className="col d-flex justify-content-end">
            <p className="me-4">Mã đơn hàng : {bill.ma}</p> |
            <span className="text-danger ms-4">
              {bill.trangThai === "0"
                ? "Chờ xác nhận"
                : bill.trangThai === "1"
                ? "Xác nhận"
                : bill.trangThai === "2"
                ? "Chờ vận chuyển"
                : bill.trangThai === "3"
                ? "Đang vận chuyển"
                : bill.trangThai === "4"
                ? "Đã thanh toán"
                : bill.trangThai === "5"
                ? "Thành công"
                : bill.trangThai === "6"
                ? "Trả hàng"
                : bill.trangThai === "-1"
                ? "Đã hủy"
                : "Đã"}
            </span>
          </div>
        </div>

        {/* hóa đơn time line */}
        <div className="scroll-hoa-don mt-5 mb-4">
          <div className="hoa-don-cuon-ngang">
            <Timeline
              minEvents={6}
              // maxEvents={10}
              style={{ borderBottom: "1px solid rgb(224, 224, 224)" }}
              placeholder
            >
              {listTimeLine.map((item, index) => (
                <TimelineEvent
                  minEvents={6}
                  key={index}
                  color={item.trangThai == -1 ? "#520808" : "#3d874d"}
                  icon={showIcon(item.trangThai)}
                  values={showTitle(item.trangThai)}
                  isOpenEnding={true}
                  title={showTitle(item.trangThai)}
                  subtitle={moment(item.ngayTao).format("hh:mm:ss DD/MM/YYYY")}
                />
              ))}
            </Timeline>
          </div>
        </div>

        <hr className="mt-5 mb-3"></hr>

        {/* địa chỉ giao hàng */}
        <div className="ms-4">
          <h4>Địa chỉ nhận hàng</h4>
          <p>{bill.tenNguoiNhan}</p>
          <p>{bill.sdt}</p>
          <p>{bill.diaChiShip}</p>
        </div>

        <hr className="mt-5 mb-3"></hr>
        {/* thanh toán */}
        <div className="ms-4">
          <h4>Thanh toán</h4>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 fs-6">
              <div className="row">
                <div className="col ">Tổng tiền hàng:</div>
                <div className="col">
                  {Intl.NumberFormat("en-US").format(bill.giaGoc)} VND
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">Phí vận chuyển:</div>
                <div className="col">
                  {Intl.NumberFormat("en-US").format(bill.tienVanChuyen)}
                  VND
                </div>
              </div>
              <div
                className="row mt-3"
                style={{ borderBottom: "1px solid #000" }}
              >
                <div className="col">Voucher cửa hàng:</div>
                <div className="col">
                  {Intl.NumberFormat("en-US").format(bill.giaGiamGia)} VND
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <b>Thành tiền</b>
                </div>
                <div className="col text-danger fs-5">
                  <b>{Intl.NumberFormat("en-US").format(bill.thanhTien)} VND</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-5 mb-3"></hr>
        {/* phương thức thanh toán */}
        <div className="ms-4 d-flex justify-content-start">
          <h5 className=" mt-4">Ngày dự kiến:</h5>
          <p className="ms-5 mt-1">
            <img src={LogoGHN} style={{ width: 200, height: 70 }}></img>
          </p>

          <p className="mt-4 ms-5 fs-5 text-danger ">
            <b> {bill.ngayDuKienNhan}</b>
          </p>
        </div>
        <hr className="mt-5 mb-3"></hr>
        {/* phương thức thanh toán */}
        <div className="ms-4 d-flex justify-content-start">
          <h5 className=" mt-1">Phương thức thanh toán :</h5>
          <p className="ms-5 mt-2">
            <b>
              {bill.vnp === null
                ? "Thanh toán khi nhận hàng"
                : "Thanh toán VNP"}
            </b>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default ChiTietDonHang;
