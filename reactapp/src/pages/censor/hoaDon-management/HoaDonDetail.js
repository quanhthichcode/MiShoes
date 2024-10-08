import React, { useEffect, useRef, useState } from "react";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { FaCheckCircle } from "react-icons/fa";
import { RiTruckFill } from "react-icons/ri";
import { SlNotebook } from "react-icons/sl";
import { GiNotebook, GiPiggyBank, GiReturnArrow } from "react-icons/gi";
import { FaMoneyBillTrendUp, FaTruckFast } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import {
  Button,
  Modal,
  Table,
  Tag,
  Input,
  Form,
  Select,
  Space,
} from "antd";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HoaDonDetail.css";
import moment from "moment";
import { Image } from "cloudinary-react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../assets/images/logo.png";
import { FormattedNumber, IntlProvider } from "react-intl";
import { HoaDonAPI } from "../api/hoaDon/hoaDon.api";
import ModalTimeLine from "./ModalTimeLine";
import ModalSanPham from "./ModalSanPham";
import { get, set } from "local-storage";
import { ThanhToanAPI } from "../api/thanhToan/thanhToan.api";
import { AdminGuiThongBaoXacNhanDatHang } from "../../../utils/socket/socket";
import { SellAPI } from "../api/sell/sell.api";
import imgTicket from "../../../assets/images/discountTicket.png";
import ModalDiaChiUpdate from "./ModalUpdateDiaChiHoaDon";
export default function HoaDonDetail() {
  const { id } = useParams();
  const { Option } = Select;
  const [openModalTimeLine, setOpenModalTimeLine] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRollBack, setIsModalOpenRollBack] = useState(false);
  const [isModalOpenHuyHoaDon, setIsModalHuyHoaDon] = useState(false);
  const [openSanPham, setOpenSanPham] = useState(false);
  const [openDiaChiUpdate, setOpenDiaChiUpdate] = useState(false);
  const [activeKey, setActiveKey] = useState(0);
  const [listHDTimeLine, setlistHDTimeLine] = useState([]);
  const [voucherHienTai, setVoucherHienTai] = useState(null);
   const [maHD, setMaHD] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [soTienCanMuaThem, setSoTienCanMuaThem] = useState(0);
  const [soTienDuocGiam, setSoTienDuocGiam] = useState(0);
  const [form] = Form.useForm();
  const [formRollBack] = Form.useForm();
   const [formHuyHoaDon] = Form.useForm();
  const [trangThai, setTrangThai] = useState([]);
  const [listSanPhamTra, setlistSanPhamTra] = useState([]);
  const [listSanPhams, setlistSanPhams] = useState([]);
 
  const handleOk = () => {
    setIsModalOpen(false);
    setOpenModalTimeLine(false);
    setIsModalOpenRollBack(false);
    setIsModalHuyHoaDon(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenModalTimeLine(false);
    setOpenSanPham(false);
    setOpenDiaChiUpdate(false);
    setIsModalOpenRollBack(false);
      setIsModalHuyHoaDon(false);
  };
  const [openXuat, setOpenXuat] = useState(false);
  const componnentRef = useRef();


  const { TextArea } = Input;
  const [hoaDondetail, setHoaDondetail] = useState([]);
  const [maNV, setmaNV] = useState("");
    const [tenNV, settenNV] = useState("");
  useEffect(() => {
    const storedData = get("userData");
    setmaNV(storedData.ma);
      settenNV(storedData.ten);
    loadHoaDon();
    loadListSanPhams();
    loadListSanPhamTra();
    loadLichSuThanhToan();
    loadTimeLineHoaDon();
  }, []);
  // load hóa đơn

  const loadVoucherTotNhatVaVoucherTiepTheo = (idKH, money) => {
    // console.log("money", money);
    SellAPI.voucherTotNhat(idKH, money).then((res) =>
      setVoucherHienTai(res.data)
    );
    SellAPI.voucherSapDatDuoc(idKH, money).then((res) => {
      // console.log("res", res.data);
      setSoTienCanMuaThem(res.data[0]);
      setSoTienDuocGiam(res.data[1]);
    });
  };

  useEffect(() => {
    if (hoaDondetail.nguoiDung) {
      SellAPI.getVoucherWithIDKH(hoaDondetail.nguoiDung).then((res) =>
        setVoucher("Voucher theo KH", res.data)
      );
    } else {
      SellAPI.getVoucherNoLimited().then((res) =>
        setVoucher("Voucher Không", res.data)
      );
    }
    loadVoucherTotNhatVaVoucherTiepTheo(
      hoaDondetail.nguoiDung ? hoaDondetail.nguoiDung : null,
      hoaDondetail.giaGoc ? hoaDondetail.giaGoc : 0
    );
  }, [hoaDondetail.giaGoc]);

  const onChangeVoucher = async (value, option) => {
    await SellAPI.getThanhTienbyIDHD(activeKey).then((res) => {
      if ((res.data ? res.data : 0) < option.dieuKien) {
        toast("Không đủ điều kiện!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return setVoucherHienTai(null);
      }
      setVoucherHienTai(option);
    });
  };

  const loadHoaDon =  () => {
    HoaDonAPI.detailHD(id).then((res) => {
      setHoaDondetail(res.data);
      setTrangThai(res.data.trangThai);
      setMaHD(res.data.ma);
      console.log("hd",res.data)
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalRollback = () => {
    setIsModalOpenRollBack(true);
  };

  const rollbackHD = (values) => {
    AdminGuiThongBaoXacNhanDatHang();
    HoaDonAPI.rollbackHoaDon(id, maNV, values).then((res) => {
      loadHoaDon();
      loadTimeLineHoaDon();
      formRollBack.resetFields();
      setIsModalOpenRollBack(false);
      toast("🦄 Thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };
    const showModalHuyHoaDon = () => {
      setIsModalHuyHoaDon(true);
    };
  const handleHuyHoaDon = (values) => {
     AdminGuiThongBaoXacNhanDatHang();
     listSanPhams.map((listSanPham, index) =>   HoaDonAPI.deleteInvoiceAndRollBackProduct(listSanPham.idctsp, id));
      HoaDonAPI.huyHoaDonQLHoaDon(id, maNV, values).then((res) => {
        loadHoaDon();
        loadTimeLineHoaDon();
        formHuyHoaDon.resetFields();
        setIsModalHuyHoaDon(false);
        toast("🦄 Thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  // update trạng thái hóa đơn
  const handleSubmit = (values) => {
    AdminGuiThongBaoXacNhanDatHang();
    HoaDonAPI.updateTTHoaDon(id, maNV, values).then((res) => {
      console.log("values", values);
      console.log("trang thau", trangThai);
      loadHoaDon();
      loadTimeLineHoaDon();
      form.resetFields();
      setIsModalOpen(false);
         if (trangThai == 0) {
           setOpenXuat(true);
            handlePrint();     
         }
      toast("🦄 Thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

  };
const handlePrint = useReactToPrint({
  content: () => componnentRef.current, // Assuming componnentRef is a ref to the component you want to print
  documentTitle: maHD,
});
  const [LichSuThanhToan, setLichSuThanhToan] = useState([]);
  const loadLichSuThanhToan = () => {
    ThanhToanAPI.LichSuThanhToanByIdHD(id).then((res) => {
      setLichSuThanhToan(res.data);
    });
  };

  //lịch sử thanh toán
  const columLichSuThanhToan = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSortTooltip: false,
    },
    {
      title: "Mã Giao dịch",
      dataIndex: "maVNP",
      key: "maVNP",
    },
    {
      title: "Số tiền",
      dataIndex: "tongTien",
      key: "tongTien",
      render: (tongTien) => (
        <>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(tongTien)}
        </>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "ngayTao",
      center: "true",
      render: (ngayTao) => <>{moment(ngayTao).format("hh:mm:ss DD/MM/YYYY")}</>,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "phuongThuc",
      key: "phuongThuc",
      render: (trangThai) => (
        <>
          {trangThai == 0 ? (
            <Tag color="#00cc00">Tiền mặt</Tag>
          ) : (
            <Tag color="#FFD700">Chuyển khoản</Tag>
          )}
        </>
      ),
    },
    {
      title: "Người xác nhận",
      dataIndex: "nguoiTao",
      center: "true",
    },
    {
      title: "Ghi chú",
      dataIndex: "moTa",
      center: "true",
    },
  ];


  // console.log("list sản phẩm", listSanPhams);
  const loadListSanPhams = () => {
    HoaDonAPI.detailSanPham(id).then((res) => {
      setlistSanPhams(res.data);
     
    });
  };
  const loadListSanPhamTra = () => {
    HoaDonAPI.detailSanPhamTra(id).then((res) => {
      setlistSanPhamTra(res.data);
    });
  };
  const loadTimeLineHoaDon = () => {
    HoaDonAPI.getAllLichSuHoaDon(id).then((res) => {
      setlistHDTimeLine(res.data);
    });
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
    } else if (trangThai === "-2") {
      return FaMoneyBillTrendUp;
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
    } else if (trangThai === "-2") {
      return "Hoàn tiền";
    }
  };
  const showTitleButtonVanDonTraSau = (trangThai) => {
    if (trangThai === "0") {
      return "Đã xác nhận";
    } else if (trangThai === "1") {
      return "Chờ vận chuyển";
    } else if (trangThai === "2") {
      return "Đang vận chuyển";
    } else if (trangThai === "3") {
      return "Đã thanh toán";
    } else if (trangThai === "4") {
      return "Thành công";
    } else if (trangThai === "-1") {
      return "Hoàn tiền";
    } 
  };
  const showTitleButtonVanDonTraTruoc = (trangThai) => {
    if (trangThai === "0") {
      return "Đã xác nhận";
    } else if (trangThai === "1") {
      return "Chờ vận chuyển";
    } else if (trangThai === "2") {
      return "Đang vận chuyển";
    } else if (trangThai === "3") {
      return "Thành công";
    } else if (trangThai === "4") {
      return "Thành công";
    } else if (trangThai === "-1") {
      return "Hoàn tiền";
    } 
  };
   
  return (
    <div className="container-fuild mt-4 radius  ">
      <div className="container-fuild  row pt-3 pb-4 bg-light rounded border-danger ">
        <div className="scroll-hoa-don mb-4">
          <div className="hoa-don-cuon-ngang">
            <Timeline
              minEvents={10}
              // maxEvents={10}
              style={{ borderBottom: "1px solid rgb(224, 224, 224)" }}
              placeholder
            >
              {listHDTimeLine.map((item, index) => (
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

        {/* xác nhận đơn hàng */}

        <div className="col-md-2 ">
          <>
            {/* hóa đơn onl trả tiền rồi*/}
            {hoaDondetail.loaiHD == 0 ? (
              <>
                {hoaDondetail.phuongThucVNP != null ? (
                  <>
                    {trangThai == 0 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraTruoc(trangThai)}
                      </Button>
                    ) : trangThai == 1 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraTruoc(trangThai)}
                      </Button>
                    ) : trangThai == 2 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraTruoc(trangThai)}
                      </Button>
                    ) : trangThai == 3 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraTruoc(trangThai)}
                      </Button>
                    ) : trangThai == 4 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraTruoc(trangThai)}
                      </Button>
                    ) : trangThai == -1 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraTruoc(trangThai)}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    {trangThai == 0 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraSau(trangThai)}
                      </Button>
                    ) : trangThai == 1 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraSau(trangThai)}
                      </Button>
                    ) : trangThai == 2 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraSau(trangThai)}
                      </Button>
                    ) : trangThai == 3 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraSau(trangThai)}
                      </Button>
                    ) : trangThai == 4 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraSau(trangThai)}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {hoaDondetail.traSau == 1 ? (
                  <>
                    {trangThai == 0 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraSau(trangThai)}
                      </Button>
                    ) : trangThai == 1 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraSau(trangThai)}
                      </Button>
                    ) : trangThai == 2 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraSau(trangThai)}
                      </Button>
                    ) : trangThai == 3 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraSau(trangThai)}
                      </Button>
                    ) : trangThai == 4 ? (
                      <Button
                        className="ms-5 "
                        type="primary"
                        onClick={showModal}
                      >
                        {showTitleButtonVanDonTraSau(trangThai)}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    {hoaDondetail.traSau == 0 &&
                    hoaDondetail.tenNguoiNhan != null ? (
                      <>
                        {trangThai == 0 ? (
                          <Button
                            className="ms-5 "
                            type="primary"
                            onClick={showModal}
                          >
                            {showTitleButtonVanDonTraTruoc(trangThai)}
                          </Button>
                        ) : trangThai == 1 ? (
                          <Button
                            className="ms-5 "
                            type="primary"
                            onClick={showModal}
                          >
                            {showTitleButtonVanDonTraTruoc(trangThai)}
                          </Button>
                        ) : trangThai == 2 ? (
                          <Button
                            className="ms-5 "
                            type="primary"
                            onClick={showModal}
                          >
                            {showTitleButtonVanDonTraTruoc(trangThai)}
                          </Button>
                        ) : trangThai == 3 ? (
                          <Button
                            className="ms-5 "
                            type="primary"
                            onClick={showModal}
                          >
                            {showTitleButtonVanDonTraTruoc(trangThai)}
                          </Button>
                        ) : trangThai == 4 ? (
                          <Button
                            className="ms-5 "
                            type="primary"
                            onClick={showModal}
                          >
                            {showTitleButtonVanDonTraTruoc(trangThai)}
                          </Button>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}
            <Modal
              title="Xác nhận đơn hàng"
              footer={[]}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                  name="moTaHoatDong"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống ghi chú!",
                    },
                  ]}
                >
                  <TextArea
                    defaultValue={
                      "[" + maNV + "-" + tenNV + "]" + " đã xác nhận"
                    }
                    rows={4}
                  />
                </Form.Item>
                <Button
                  style={{ marginLeft: 200 }}
                  className="bg-success text-light"
                  onClick={() => {
                    Modal.confirm({
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn tiếp tục?",
                      onOk: () => {
                        form.submit();
                      },
                      footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn />
                        </>
                      ),
                    });
                  }}
                >
                  Xác nhận
                </Button>
              </Form>
            </Modal>
          </>
        </div>
        <div className="col-md-2">
          {(hoaDondetail.loaiHD == 1 && trangThai == 5) ||
          trangThai == 0 ||
          trangThai == 5 ||
          trangThai == -1 ? (
            <></>
          ) : (
            <Button type="primary" onClick={showModalRollback}>
              Hoàn tác
            </Button>
          )}

          <Modal
            title="Hoàn tác hóa đơn"
            footer={[]}
            open={isModalOpenRollBack}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form form={formRollBack} onFinish={rollbackHD}>
              <Form.Item
                name="moTaHoatDong"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không để trống ghi chú!",
                  },
                ]}
              >
                <TextArea
                  defaultValue={"[" + maNV + "-" + tenNV + "]" + " đã xác nhận"}
                  rows={4}
                />
              </Form.Item>
              <Button
                style={{ marginLeft: 200 }}
                className="bg-success text-light"
                onClick={() => {
                  Modal.confirm({
                    title: "Thông báo",
                    content: "Bạn có chắc chắn muốn tiếp tục?",
                    onOk: () => {
                      formRollBack.submit();
                    },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
                }}
              >
                Xác nhận
              </Button>
            </Form>
          </Modal>
        </div>

        {/* button hủy hóa đơn */}
        <div className="col-md-2 ">
          {trangThai == 0 || trangThai == 1 || trangThai == 2 ? (
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              type="primary"
              onClick={showModalHuyHoaDon}
            >
              Hủy
            </Button>
          ) : (
            <></>
          )}
        </div>
        <div className="col-md-2">
          <>
            <Button type="primary" onClick={() => setOpenXuat(true)}>
              Xuất hóa đơn
            </Button>
          </>
        </div>
        {/* lịch sử hóa đơn */}
        <div className="col-md-2"></div>

        <div className="col-md-2 text-end">
          <>
            <Button
              className="me-5 bg-success"
              type="primary"
              onClick={() => setOpenModalTimeLine(true)}
            >
              Lịch sử
            </Button>
          </>
        </div>
      </div>
      {/* Lịch sử thanh toán */}
      <div className="container-fuild row mt-3 bg-light radius">
        <h5 style={{ marginTop: "20px", paddingTop: "20px" }}>
          Lịch sử thanh toán
        </h5>
        <hr />
        <Table
          columns={columLichSuThanhToan}
          dataSource={LichSuThanhToan}
          style={{ marginTop: "25px" }}
        />
      </div>
      {/* Thông tin đơn hàng */}
      <div className="container-fuild mt-3 row bg-light radius">
        <div
          className="d-flex bd-highlight"
          style={{
            marginTop: "20px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <div className="flex-grow-1 bd-highlight">
            <h5>Thông tin đơn hàng</h5>
          </div>
          <div>
            {trangThai == 0 || trangThai == 1 || trangThai == 2 ? (
              <Button
                // className="btn-danger "
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => setOpenDiaChiUpdate(true)}
              >
                Cập nhật
              </Button>
            ) : (
              <></>
            )}

            <ModalDiaChiUpdate
              idKH={hoaDondetail.nguoiDung}
              idHD={id}
              maNV={maNV}
              activeKey={id}
              openDiaChiUpdate={openDiaChiUpdate}
              setOpenDiaChiUpdate={setOpenDiaChiUpdate}
              onOk={handleCancel}
              onCancel={handleCancel}
            />
          </div>
        </div>
        <hr />
        <div className="col-md-3">
          <div className="ps-4">
            <h6>Trạng thái:</h6>
          </div>
          <div className="mt-4 ps-4">
            <h6>Loại:</h6>
          </div>
          <div className="mt-4 ps-4">
            <h6>Địa chỉ:</h6>
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
            ) : trangThai == 5 ? (
              <Tag color="success">Thành công</Tag>
            ) : trangThai == 10 ? (
              <Tag color="orange">Trả hàng</Tag>
            ) : trangThai == -1 ? (
              <Tag color="red">Hủy</Tag>
            ) : trangThai == -2 ? (
              <Tag color="pink">Hoàn tiền</Tag>
            ) : (
              <Tag color="green">Thành công</Tag>
            )}
          </div>
          <div className="mt-4">
            {hoaDondetail.loaiHD == 0 ? (
              <Tag color="orange">Online</Tag>
            ) : (
              <Tag color="red">Tại quầy</Tag>
            )}
          </div>
          <div className="mt-4">
            <p>{hoaDondetail.diaChi}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <h6>Tên khách hàng:</h6>
          </div>
          <div className="mt-4">
            <h6>Số điện thoại:</h6>
          </div>
          <div className="mt-4">
            <h6>Ghi chú :</h6>
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <p>{hoaDondetail.tenKH}</p>
          </div>
          <div className="mt-4">
            <p>{hoaDondetail.sdt}</p>
          </div>
          <div className="mt-4">
            <p>{hoaDondetail.ghiChuHD}</p>
          </div>
        </div>
      </div>

      <div
        className="d-flex bd-highlight"
        style={{ marginTop: "20px", paddingTop: "20px" }}
      >
        <div className="flex-grow-1 bd-highlight">
          <h5>Thông tin sản phẩm</h5>
        </div>
        {/* chỉnh sửa sản phẩm */}

        <>
          {trangThai == 0 || trangThai == 1 || trangThai == 2 ? (
            <div className="bd-highlight">
              <Button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => setOpenSanPham(true)}
              >
                Cập nhật
              </Button>
              <ModalSanPham
                // idHD = {tab.id}
                loadListSanPhams={loadListSanPhams}
                loadHoaDon={loadHoaDon}
                maNV={maNV}
                activeKey={id}
                openSanPham={openSanPham}
                setOpenSanPham={setOpenSanPham}
                onOk={handleCancel}
                onCancel={handleCancel}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      </div>

      <hr></hr>

      {/* detail hóa đơn */}
      <div className="container-fuild mt-3 row bg-light radius">
        <div>
          {listSanPhams.map((listSanPham, index) => (
            <tr className="pt-3 row">
              <div className="col-md-3">
                <Image
                  cloudName="dtetgawxc"
                  publicId={listSanPham.urlHA}
                  width="100"
                  crop="scale"
                  href={listSanPham.urlHA}
                  style={{ width: 150, height: 150, marginLeft: 15 }}
                />
              </div>
              <div className="col-md-5 ">
                <div className="mt-1">
                  <h6>
                    {listSanPham.tenHang} {listSanPham.tenSP}{" "}
                  </h6>
                </div>
                {listSanPham.giaGiam > 0 ? (
                  <div className="text-danger">
                    <h6>
                      <del>
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
                      </del>
                    </h6>
                  </div>
                ) : (
                  ""
                )}
                <div className="text-danger">
                  <h6>
                    <IntlProvider locale="vi-VN">
                      <div>
                        <FormattedNumber
                          value={listSanPham.thanhTienSP}
                          style="currency"
                          currency="VND"
                          minimumFractionDigits={0}
                        />
                      </div>
                    </IntlProvider>
                  </h6>
                </div>
                <h6>Size:{listSanPham.tenKichThuoc}</h6>
                <div
                  style={{
                    backgroundColor: `${listSanPham.tenMauSac}`,
                    borderRadius: 6,
                    width: 60,
                    height: 25,
                  }}
                ></div>
                <h6>x{listSanPham.soLuongSP}</h6>
              </div>

              <div className="col-md-2 text-danger mt-5">
                <h6>
                  <IntlProvider locale="vi-VN">
                    <div>
                      <FormattedNumber
                        value={listSanPham.thanhTienSP * listSanPham.soLuongSP}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                      />
                    </div>
                  </IntlProvider>
                </h6>
              </div>
              {listSanPham.trangThai == 2 ? (
                <div className="col-md-2  mt-5">
                  <Button style={{ backgroundColor: "red", color: "white" }}>
                    Trả hàng
                  </Button>
                </div>
              ) : (
                <></>
              )}
              <hr className="mt-3"></hr>
            </tr>
          ))}
        </div>

        {/* thông tin trả hàng */}
        {listSanPhamTra.length > 0 ? (
          <>
            <div
              className="d-flex bd-highlight"
              style={{ marginTop: "20px", paddingTop: "20px" }}
            >
              <div className="flex-grow-1 bd-highlight">
                <h5>Sản phẩm trả hàng</h5>
              </div>
            </div>
            <hr></hr>
            <div>
              {listSanPhamTra.map((listSanPham, index) => (
                <tr className="pt-3 row">
                  <div className="col-md-3">
                    <Image
                      cloudName="dtetgawxc"
                      publicId={listSanPham.urlHA}
                      width="100"
                      crop="scale"
                      href={listSanPham.urlHA}
                      style={{ width: 150, height: 150, marginLeft: 15 }}
                    />
                  </div>
                  <div className="col-md-5 ">
                    <div className="mt-1">
                      <h6>
                        {listSanPham.tenHang} {listSanPham.tenSP}{" "}
                      </h6>
                    </div>
                    {listSanPham.giaGiam > 0 ? (
                      <div className="text-danger">
                        <h6>
                          <del>
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
                          </del>
                        </h6>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="text-danger">
                      <h6>
                        <IntlProvider locale="vi-VN">
                          <div>
                            <FormattedNumber
                              value={listSanPham.thanhTienSP}
                              style="currency"
                              currency="VND"
                              minimumFractionDigits={0}
                            />
                          </div>
                        </IntlProvider>
                      </h6>
                    </div>
                    <h6>Size:{listSanPham.tenKichThuoc}</h6>
                    <div
                      style={{
                        backgroundColor: `${listSanPham.tenMauSac}`,
                        borderRadius: 6,
                        width: 60,
                        height: 25,
                      }}
                    ></div>
                    <h6>x{listSanPham.soLuongSP}</h6>
                  </div>

                  <div className="col-md-2 text-danger mt-5">
                    <h6>
                      <IntlProvider locale="vi-VN">
                        <div>
                          <FormattedNumber
                            value={
                              listSanPham.thanhTienSP * listSanPham.soLuongSP
                            }
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        </div>
                      </IntlProvider>
                    </h6>
                  </div>

                  <hr className="mt-3"></hr>
                </tr>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
        <tr className="pt-3 row">
          <div className="col-md-6">
            <div className="row">
              <h6 className="col-md-3 mt-2">Mã giảm giá:</h6>

              <Space.Compact className="col-md-10">
                <Select
                  showSearch
                  style={{ width: 800, height: 120 }}
                  placeholder="Lựa chọn voucher"
                  s
                  onChange={onChangeVoucher}
                  //onSearch={onSearchVoucher}
                  //value={voucherHienTai}
                  value={voucherHienTai ? voucherHienTai.ma : null}
                  defaultValue={null}
                  optionFilterProp="label"
                >
                  {voucher?.data?.map((option) => (
                    <Option
                      key={option.id}
                      value={option.id}
                      label={option.ma}
                      imgTicket={imgTicket}
                      dieuKien={option.dieuKien}
                      giamToiDa={option.giamToiDa}
                      loai={option.loaiVoucher}
                      mucDo={option.mucDo}
                      style={{ width: "100%", height: "100%" }}
                      // filterOption={filterOptionVoucher}
                    >
                      <div className="row">
                        <div
                          className="col-md-2"
                          //style={{ marginRight: 50 }}
                        >
                          <img
                            src={imgTicket}
                            style={{
                              width: 100,
                              marginRight: "8px",
                              heitgh: 80,
                              marginTop: "15px",
                            }}
                          />
                        </div>
                        <div className="col" style={{ marginLeft: "50px" }}>
                          Mã giảm giá: {option.ma}
                          <br></br>
                          Điều kiện:
                          {Intl.NumberFormat("en-US").format(
                            option.dieuKien
                          )}{" "}
                          VNĐ
                          <br></br>
                          Giảm:
                          {option.loaiVoucher === "Phần trăm"
                            ? option.mucDo + "% "
                            : `${Intl.NumberFormat("en-US").format(
                                option.mucDo
                              )} VNĐ `}
                          <br></br>
                          Tối đa:
                          {Intl.NumberFormat("en-US").format(option.giamToiDa)}
                          VNĐ
                        </div>
                      </div>
                    </Option>
                  ))}
                </Select>
                {/* <Button className="ms-5">Áp mã</Button> */}
              </Space.Compact>
            </div>
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <div className="d-flex">
              <h6 className="col-md-8">Tiền hàng:</h6>
              <p className="col-md-4">
                <IntlProvider locale="vi-VN">
                  <div>
                    <FormattedNumber
                      value={
                        hoaDondetail.giaGiam == null
                          ? parseFloat(hoaDondetail.thanhTien)
                          : parseFloat(hoaDondetail.thanhTien) +
                            parseFloat(hoaDondetail.giaGiam)
                      }
                      style="currency"
                      currency="VND"
                      minimumFractionDigits={0}
                    />
                  </div>
                </IntlProvider>
              </p>
            </div>
            <div className="d-flex">
              <h6 className="col-md-8">Phí vận chuyển:</h6>
              <p className="col-md-4">
                <IntlProvider locale="vi-VN">
                  <div>
                    <FormattedNumber
                      value={hoaDondetail.tienVanChuyen}
                      style="currency"
                      currency="VND"
                      minimumFractionDigits={0}
                    />
                  </div>
                </IntlProvider>
              </p>
            </div>
            <div className="d-flex">
              <h6 className="col-md-8">Giảm giá :</h6>
              <p className="col-md-4" style={{ color: "red" }}>
                <IntlProvider locale="vi-VN">
                  <div>
                    <FormattedNumber
                      value={
                        hoaDondetail.giaGiam ? "-" + hoaDondetail.giaGiam : 0
                      }
                      style="currency"
                      currency="VND"
                      minimumFractionDigits={0}
                    />
                  </div>
                </IntlProvider>
              </p>
            </div>
            <div className="d-flex">
              <h6 className="col-md-8">Tổng tiền:</h6>
              <p className="col-md-4">
                <IntlProvider locale="vi-VN">
                  <div>
                    <FormattedNumber
                      value={
                        hoaDondetail.giaGoc -
                        parseFloat(
                          hoaDondetail.giaGiam ? hoaDondetail.giaGiam : 0
                        ) +
                        parseFloat(
                          hoaDondetail.tienVanChuyen
                            ? hoaDondetail.tienVanChuyen
                            : 0
                        )
                      }
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

      {/* modal hủy hóa đơn */}
      <Modal
        title="Nhập lý do hủy hóa đơn"
        footer={[]}
        open={isModalOpenHuyHoaDon}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={formHuyHoaDon} onFinish={handleHuyHoaDon}>
          <Form.Item
            name="moTaHoatDong"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng không để trống ghi chú!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Button
            style={{ marginLeft: 200 }}
            className="bg-success text-light"
            onClick={() => {
              Modal.confirm({
                title: "Thông báo",
                content: "Bạn có chắc chắn muốn tiếp tục?",
                onOk: () => {
                  formHuyHoaDon.submit();
                },
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }}
          >
            Xác nhận
          </Button>
        </Form>
      </Modal>
      {/* modal time line */}
      <ModalTimeLine
        openModalTimeLine={openModalTimeLine}
        setOpenModalTimeLine={setOpenModalTimeLine}
        idHD={id}
        setHD={id}
        // loadDiaChi={loadDiaChi}
        onOk={handleCancel}
        onCancel={handleCancel}
      />
      <Modal
        footer={[]}
        title="In hóa đơn"
        centered
        open={openXuat}
        onOk={() => setOpenXuat(false)}
        onCancel={() => setOpenXuat(false)}
        width={1000}
        height={600}
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
              <div className="ps-4">
                <h6>Trạng thái:</h6>
              </div>
              <div className="mt-4 ps-4">
                <h6>Loại:</h6>
              </div>
              <div className="mt-4 ps-4">
                <h6>Địa chỉ:</h6>
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
                ) : trangThai == 5 ? (
                  <Tag color="success">Thành công</Tag>
                ) : trangThai == 10 ? (
                  <Tag color="orange">Trả hàng</Tag>
                ) : trangThai == -1 ? (
                  <Tag color="red">Hủy</Tag>
                ) : trangThai == -2 ? (
                  <Tag color="pink">Hoàn tiền</Tag>
                ) : (
                  <Tag color="green">Thành công</Tag>
                )}
              </div>
              <div className="mt-4">
                {hoaDondetail.loaiHD == 0 ? (
                  <Tag color="orange">Online</Tag>
                ) : (
                  <Tag color="red">Tại quầy</Tag>
                )}
              </div>
              <div className="mt-4">
                <p>{hoaDondetail.diaChi}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <h6>Tên khách hàng:</h6>
              </div>
              <div className="mt-4">
                <h6>Số điện thoại:</h6>
              </div>
              <div className="mt-4">
                <h6>Ghi chú :</h6>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <p>{hoaDondetail.tenKH}</p>
              </div>
              <div className="mt-4">
                <p>{hoaDondetail.sdt}</p>
              </div>
              <div className="mt-4">
                <p>{hoaDondetail.ghiChuHD}</p>
              </div>
            </div>
            <div className="container-fuild mt-3 row  radius">
              <div>
                {listSanPhams.map((listSanPham, index) => (
                  <tr className="pt-3 row">
                    <div className="col-md-3">
                      <Image
                        cloudName="dtetgawxc"
                        publicId={listSanPham.urlHA}
                        width="100"
                        crop="scale"
                        href={listSanPham.urlHA}
                        style={{ width: 150, height: 150, marginLeft: 15 }}
                      />
                    </div>
                    <div className="col-md-5 ">
                      <div className="mt-1">
                        <h6>
                          {listSanPham.tenHang} {listSanPham.tenSP}{" "}
                        </h6>
                      </div>
                      {listSanPham.giaGiam > 0 ? (
                        <div className="text-danger">
                          <h6>
                            <del>
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
                            </del>
                          </h6>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="text-danger">
                        <h6>
                          <IntlProvider locale="vi-VN">
                            <div>
                              <FormattedNumber
                                value={listSanPham.thanhTienSP}
                                style="currency"
                                currency="VND"
                                minimumFractionDigits={0}
                              />
                            </div>
                          </IntlProvider>
                        </h6>
                      </div>
                      <h6>Size:{listSanPham.tenKichThuoc}</h6>
                      <div
                        style={{
                          backgroundColor: `${listSanPham.tenMauSac}`,
                          borderRadius: 6,
                          width: 60,
                          height: 25,
                        }}
                      ></div>
                      <h6>x{listSanPham.soLuongSP}</h6>
                    </div>

                    <div className="col-md-2 text-danger mt-5">
                      <h6>
                        <IntlProvider locale="vi-VN">
                          <div>
                            <FormattedNumber
                              value={
                                listSanPham.thanhTienSP * listSanPham.soLuongSP
                              }
                              style="currency"
                              currency="VND"
                              minimumFractionDigits={0}
                            />
                          </div>
                        </IntlProvider>
                      </h6>
                    </div>
                    {listSanPham.trangThai == 2 ? (
                      <div className="col-md-2  mt-5">
                        <Button
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          Trả hàng
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                    <hr className="mt-3"></hr>
                  </tr>
                ))}
              </div>

              <tr className="pt-3 row">
                <div className="col-md-6">
                  <div className="row">
                    <h6 className="col-md-3 mt-2">Mã giảm giá:</h6>

                    <Space.Compact className="col-md-10">
                      <Select
                        showSearch
                        style={{ width: 800, height: 120 }}
                        placeholder="Lựa chọn voucher"
                        onChange={onChangeVoucher}
                        value={voucherHienTai ? voucherHienTai.ma : null}
                        defaultValue={null}
                        optionFilterProp="label"
                      >
                        {voucher.data ? (
                          voucher.data.map((option) => (
                            <Option
                              key={option.id}
                              value={option.id}
                              label={option.ma}
                              imgTicket={imgTicket}
                              dieuKien={option.dieuKien}
                              giamToiDa={option.giamToiDa}
                              loai={option.loaiVoucher}
                              mucDo={option.mucDo}
                              style={{ width: "100%", height: "100%" }}
                              // filterOption={filterOptionVoucher}
                            >
                              <div className="row">
                                <div
                                  className="col-md-2"
                                  //style={{ marginRight: 50 }}
                                >
                                  <img
                                    src={imgTicket}
                                    style={{
                                      width: 100,
                                      marginRight: "8px",
                                      heitgh: 80,
                                      marginTop: "15px",
                                    }}
                                  />
                                </div>
                                <div
                                  className="col"
                                  style={{ marginLeft: "50px" }}
                                >
                                  Mã giảm giá: {option.ma}
                                  <br></br>
                                  Điều kiện:
                                  {Intl.NumberFormat("en-US").format(
                                    option.dieuKien
                                  )}{" "}
                                  VNĐ
                                  <br></br>
                                  Giảm:
                                  {option.loaiVoucher === "Phần trăm"
                                    ? option.mucDo + "% "
                                    : `${Intl.NumberFormat("en-US").format(
                                        option.mucDo
                                      )} VNĐ `}
                                  <br></br>
                                  Tối đa:
                                  {Intl.NumberFormat("en-US").format(
                                    option.giamToiDa
                                  )}
                                  VNĐ
                                </div>
                              </div>
                            </Option>
                          ))
                        ) : (
                          <p>Không có voucher hợp lệ</p>
                        )}
                      </Select>
                      {/* <Button className="ms-5">Áp mã</Button> */}
                    </Space.Compact>
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
                            value={
                              hoaDondetail.giaGiam == null
                                ? parseFloat(hoaDondetail.thanhTien)
                                : parseFloat(hoaDondetail.thanhTien) +
                                  parseFloat(hoaDondetail.giaGiam)
                            }
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
                    <p className="col-md-6">0 VND</p>{" "}
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
                            value={hoaDondetail.thanhTien}
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
      <ToastContainer />
    </div>
  );
}
