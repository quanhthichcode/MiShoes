import { Button, Modal, Space, Table ,Tag ,Image} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  AddPayDetail,
  DeletePayDetail,
  GetPayDetail,
  RemovePayDetail,
} from "../../../store/reducer/PayDetail.reducer";
import { AddPay, DeletePay } from "../../../store/reducer/Pay.reducer";
import { SellAPI } from "../../censor/api/sell/sell.api";
import { RemoveBill } from "../../../store/reducer/Bill.reducer";
import { RemoveInvoiceByHoaDon } from "../../../../src/store/reducer/DetailInvoice.reducer";
import { ThanhToanAPI } from "../api/thanhToan/thanhToan.api";
import ModalInHoaDon from "./ModalInHoaDon";
import { HoaDonAPI } from "../api/hoaDon/hoaDon.api";
import { FormattedNumber, IntlProvider } from "react-intl";
import logo from "../../../assets/images/logo.png";
import { useReactToPrint } from "react-to-print";

const ModalThanhToan = ({total,hoaDon,voucher,openThanhToan,setOpenThanhToan,onInHoaDon}) => {
  // const { openThanhToan, setOpenThanhToan } = props;
  // const total = props.total;
  // const hoaDon = props.hoaDon;
  // const voucher = props.voucher;
  const dispatch = useDispatch();
  const payDetail = useSelector(GetPayDetail);
  const data = payDetail.filter((item) => item.hoaDon === hoaDon);
  const [storedData, setStoredData] = useState(null);

  console.log("Voucher tại thanh toán :",voucher);


  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được tạo ra
    const dataFromLocalStorage = localStorage.getItem("userData");

    // Kiểm tra xem có dữ liệu trong localStorage không
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      const nameFromData = parsedData.userID;

      if (nameFromData) {
        // Cập nhật state nếu có giá trị
        setStoredData(nameFromData);
      }
      // Nếu có, cập nhật state
      //setStoredData(dataFromLocalStorage);
    }
  }, []);



  useEffect(() => {
    if (hoaDon) {
  
      load();
    }
  }, [hoaDon]);

  const load = async () => {
    setTongThanhToan(0);
    dispatch(DeletePay());
    dispatch(DeletePayDetail());
    if (hoaDon) {
    const tt = await ThanhToanAPI.getThanhToan(hoaDon).then((res) => res.data);
    if (tt) {
    tt.map((res) =>
      res.phuongThuc === 0
        ? (dispatch(
            AddPayDetail({
              hoaDon: hoaDon,
              phuongThuc: 0,
              soTien: res.tongTien,
            })
          ),
          dispatch(
            AddPay({ hoaDon: hoaDon, phuongThuc: 0, tienMat: res.tongTien })
          ),
          setTongThanhToan(parseFloat(tongThanhToan) + res.tongTien))
        : (dispatch(
            AddPayDetail({
              hoaDon: hoaDon,
              phuongThuc: 1,
              soTien: res.tongTien,
            })
          ),
          dispatch(
            AddPay({
              hoaDon: hoaDon,
              phuongThuc: 1,
              chuyenKhoan: res.tongTien,
              phuongThucVNP: res.phuongThucVnp,
            })
          ),
          setTongThanhToan(parseFloat(tongThanhToan) + res.tongTien))
    );
  }
}
  };


  const handleClose = () => {
    setOpenThanhToan(false);
   
  };
  const [tongThanhToan, setTongThanhToan] = useState(0);

  const handleXoa = (record) => {
 
    Modal.confirm({
      title: "Thông báo",
      zIndex: 20000000000000,
      content:
        "Bạn có chắc chắn muốn xóa số tiền " +
        Intl.NumberFormat("en-US").format(record.soTien) +
        "VND này hay không ?",
      onOk: () => {
        dispatch(
          RemovePayDetail({ hoaDon: hoaDon, phuongThuc: record.phuongThuc })
        );
        setTongThanhToan(parseFloat(tongThanhToan) - parseFloat(record.soTien));
        ThanhToanAPI.xoaTT(record.hoaDon, record.phuongThuc);
      },
      onCancel: () => {
        return;
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  };

  const handleTienMat = () => {
    if (money <= 0) {
      return toast("Vui lòng nhập số tiền!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      dispatch(AddPayDetail({ hoaDon: hoaDon, phuongThuc: 0, soTien: money }));
      dispatch(AddPay({ hoaDon: hoaDon, phuongThuc: 0, tienMat: money }));
      const value = [
        {
          hoaDon: hoaDon,
          nguoiTao: storedData,
          tongTien: money,
          tienMat: money,
        },
      ];
      SellAPI.thanhToanTienMat(value[0]);
      setTongThanhToan(parseFloat(tongThanhToan) + parseFloat(money));
      setMoney(0);
    }
  };

  const handleChuyenKhoan = () => {
    if (money <= 0) {
      return toast("Vui lòng nhập số tiền!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      linkVNP();
      dispatch(AddPayDetail({ hoaDon: hoaDon, phuongThuc: 1, soTien: money }));
      setTongThanhToan(parseFloat(tongThanhToan) + parseFloat(money));
      setMoney(0);
    }
  };

  const loadHoaDon =  () => {
    HoaDonAPI.chiTietHoaDonTheoMa(hoaDon).then((res) => {
      console.log("DATA :"+hoaDon);
      if (!res.data) return;
     // setHoaDondetail(res.data);
      //setTrangThai(res.data.trangThai);
      console.log("DATA IN BILL :",res);
    });
  }




  const loadListSanPhams =  () => {
    HoaDonAPI.hoaDonSanPhamTheoMa(hoaDon).then((res) => {
      if (!res.data) return;
      //setlistSanPhams(res.data);
      console.log("DATA :",res)
  
    });
  };

  const handleThanhToan =  () => {
    if (parseFloat(total) <= parseFloat(!tongThanhToan ? 0 : tongThanhToan)) {
      if (voucher) {
         SellAPI.thanhToanHoaDon(
          hoaDon,
          storedData,
          voucher
        );
      }
       SellAPI.thanhToanHoaDonKhongVoucher(hoaDon, storedData);
      toast("Thanh toán thành công!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Xóa dữ liệu lưu trong reducer

      dispatch(RemoveInvoiceByHoaDon({ hoaDon: hoaDon }));
      dispatch(RemoveBill({ key: hoaDon }));
      setTongThanhToan(0);
      onInHoaDon(true);
      loadHoaDon();
      loadListSanPhams();
       setOpenThanhToan(false);

    } else {
      toast("Chưa đủ điều kiện thanh toán!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const linkVNP = () => {
    SellAPI.getLinkVnpay(hoaDon, money).then((res) => {
      const value = [
        {
          hoaDon: hoaDon,
          nguoiTao: storedData,
          tongTien: money,
          phuongThucVnp: res.data.url
            .substring(res.data.url.indexOf("vnp_TxnRef") + 11)
            .substring(0, 8),
        },
      ];
      dispatch(
        AddPay({
          hoaDon: hoaDon,
          phuongThuc: 1,
          chuyenKhoan: money,
          phuongThucVNP: res.data.url,
        })
      );
      SellAPI.thanhToanChuyenKhoan(value[0]);
      window.open(res.data.url, "_blank");
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (stt, record, index) => {
        ++index;
        return index;
      },
      showSortTooltip: false,
    },
    // {
    //     title: 'Mã giao dịch',
    //     dataIndex: 'trangThai',
    //     key: 'trangThai',
    // },
    {
      title: "Số tiền",
      dataIndex: "soTien",
      key: "soTien",
      render: (text, record) => {
        return (
          <>
            {
              <span>{`${Intl.NumberFormat("en-US").format(
                record.soTien
              )} VNĐ`}</span>
            }
          </>
        );
      },
    },
    {
      title: "Phương thức",
      dataIndex: "phuongThuc",
      key: "phuongThuc",
      render: (phuongThuc) => (
        <>{phuongThuc === 0 ? "Tiền mặt" : "Chuyển khoản"}</>
      ),
    },
    {
      title: "Hành động",
      // dataIndex: 'motaHoatDong',
      render: (record) => (
        <Space size="middle">
          <button className="btn btn-warning" onClick={() => handleXoa(record)}>
            Xóa
          </button>
        </Space>
      ),
      center: "true",
    },
  ];
  const [money, setMoney] = useState(0);
  const hanldeMoneyChange = (event) => {
    const value = event.target.value;
   
    setMoney(value);
  };
  return (
    
    <Modal
      title="Thanh toán"
      centered
      open={openThanhToan}
      onOk={handleThanhToan}
      onCancel={handleClose}
      okText="Thanh toán"
      cancelText="Hủy bỏ"
      height={300}
      width={700}
      zIndex={10000}
      style={{ top: -200 }}
    >

      <div className="row mt-4">
        <h6 className="col-md-2 mt-2 fw-bold">Số tiền</h6>
        <input
          className="col-md-9"
          type="number"
          value={money}
          onChange={hanldeMoneyChange}
        ></input>
      </div>
      <div className="row mt-5 fw-bold ">
        <Button
          className="col-md-6 rounded-pill"
          type="primary"
          onClick={handleTienMat}
        >
          {" "}
          Tiền mặt
        </Button>

        <Button
          className="col-md-6 rounded-pill"
          type="primary"
          onClick={handleChuyenKhoan}
        >
          {" "}
          Chuyển khoản
        </Button>
      </div>
      <div className="row mt-3">
        <h6 className="col-md-3 fw-bold ">Tiền cần thanh toán</h6>
        <div className="col-md-5"></div>
        <h6
          className="col-md-4 text-end text-danger fw-bold"
          style={{ paddingRight: "25px" }}
        >
          {" "}
          {`${Intl.NumberFormat("en-US").format(
            parseFloat(total) > parseFloat(tongThanhToan)
              ? parseFloat(total) - parseFloat(tongThanhToan)
              : 0
          )} VNĐ`}
        </h6>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: "10px" }}
        pagination={{}}
      />

      <div className="row mt-3">
        <h6 className="col-md-3 mt-2 fw-bold">Khách thanh toán</h6>
        <div className="col-md-5"></div>
        <h6
          className="col-md-4 mt-2 text-end text-danger fw-bold"
          style={{ paddingRight: "25px" }}
        >{`${Intl.NumberFormat("en-US").format(money)} VNĐ`}</h6>
      </div>
      <div className="row mt-1">
        <h6 className="col-md-3 mt-2 fw-bold">Tiền thiếu</h6>
        <div className="col-md-5"></div>
        <h6
          className="col-md-4 mt-2 text-end text-primary fw-bold"
          style={{ paddingRight: "25px" }}
        >
          {" "}
          {(!money ? 0 : money) < parseFloat(total) - parseFloat(tongThanhToan)
            ? `${Intl.NumberFormat("en-US").format(
                parseFloat(total) -
                  parseFloat(!money ? 0 : money) -
                  parseFloat(tongThanhToan)
              )} VNĐ`
            : " 0 VNĐ"}
        </h6>
      </div>
      <div className="row mt-1">
        <h6 className="col-md-3 mt-2 fw-bold">Tiền thừa</h6>
        <div className="col-md-5"></div>
        <h6
          className="col-md-4 mt-2 text-end text-primary fw-bold"
          style={{ paddingRight: "25px" }}
        >
          {" "}
          {total < parseFloat(tongThanhToan) + parseFloat(!money ? 0 : money)
            ? `${Intl.NumberFormat("en-US").format(
                parseFloat(money) +
                  parseFloat(tongThanhToan) -
                  parseFloat(total)
              )} VNĐ`
            : " 0 VNĐ"}
        </h6>

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
      {/* Same as */}
      <ToastContainer />
    </Modal>
  );
};
export default ModalThanhToan;
