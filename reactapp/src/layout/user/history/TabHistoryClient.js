import { Button, Form, Modal, Space, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { KHGuiThongBaoDatHang } from "../../../utils/socket/socket";
import { HoaDonClientAPI } from "../../../pages/censor/api/HoaDonClient/HoaDonClientAPI";
import { get, set } from "local-storage";
const TabHistoryClient = ({ listBill }) => {
  const nav = useNavigate();
  // const [modalReason, setModalReason] = useState(false);
  // const [reason, setReason] = useState("");

  const [id, setId] = useState("");
  const storedData = get("userData");
  const ten = storedData.ten;
  const tenKH = "Khách hàng " + ten;
  const [formHuyHoaDon] = Form.useForm();
  const [isModalOpenHuyHoaDon, setIsModalHuyHoaDon] = useState(false);
  const handleOk = () => {
    setIsModalHuyHoaDon(false);
  };
  const handleCancel = () => {
    setIsModalHuyHoaDon(false);
  };

  
  const showModalHuyHoaDon = (id) => {
    setIsModalHuyHoaDon(true);
    setId(id);
    console.log("id hd ", id);
  };
  const handleHuyHoaDon = (values) => {
       KHGuiThongBaoDatHang();
      HoaDonClientAPI.detailSanPham(id).then((res) => {
          res.data.map((listSanPham, index) =>
            HoaDonClientAPI.deleteInvoiceAndRollBackProduct(
              listSanPham.idctsp,
              id
            )
          );
      });
 
    HoaDonClientAPI.huyHoaDonQLHoaDon(id, tenKH, values).then((res) => {
      formHuyHoaDon.resetFields();
      setIsModalHuyHoaDon(false);
      toast("🦄 Hủy hóa đơn thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      nav(`/chi-tiet-don-hang/${id}`);
    });
  };
  return (
    <div className="container ">
      <div className="row pt-3 ">
        {listBill.map((item, index) => (
          <div
            key={index}
            className="mb-5"
            style={{ backgroundColor: "#F3F2F2" }}
          >
            <div className="mb-5 pt-2">
              <span className="fs-6 fw-bolder">
                Mã hóa đơn : <b>{item.ma}</b>
              </span>
              <Space className="float-end" size={[0, 8]} wrap>
                <Tag color={item.trangThai == -1 ? "#cd201f" : "#108ee9"}>
                  <span className={`trangThai ${" status_" + item.trangThai} `}>
                    {item.trangThai === "0"
                      ? "Chờ xác nhận"
                      : item.trangThai === "1"
                      ? "Xác nhận"
                      : item.trangThai === "2"
                      ? "Chờ vận chuyển"
                      : item.trangThai === "3"
                      ? "Đang vận chuyển"
                      : item.trangThai === "4"
                      ? "Đã thanh toán"
                      : item.trangThai === "5"
                      ? "Thành công"
                      : item.trangThai === "-1"
                      ? "Đã hủy"
                      : "Chưa rõ"}
                  </span>
                </Tag>
              </Space>
              <br></br>

              <div>
                {item.hoaDonDetail.map((item, index) => (
                  <div
                    key={index}
                    className="row mt-3 "
                    style={{ borderTop: "1px solid #000" }}
                  >
                    <div className="col-md-2 mt-3 ps-4">
                      <img
                        style={{ width: 130, height: 140 }}
                        src={item.urlHA}
                        alt="Product"
                      ></img>
                    </div>
                    <div className="col-md-6 ms-5 mt-3">
                      <h5>{item.tenSP} </h5>
                      <h6 className="text-danger">
                        <del>
                          {Intl.NumberFormat("en-US").format(item.giaBanSP)}
                          VND
                        </del>
                      </h6>
                      <h6 className="text-danger">
                        {Intl.NumberFormat("en-US").format(item.giaBanSP)} VND
                      </h6>
                      <h6>
                        {item.tenKichThuoc}-[{item.tenMauSac}]
                      </h6>
                      <h6>x{item.soLuongSP}</h6>
                    </div>
                    <div className="col-md-3  mt-5">
                      <h6 className="text-danger">
                        {Intl.NumberFormat("en-US").format(item.thanhTienSP)}
                        VND
                      </h6>
                    </div>
                  </div>
                ))}
                {/* thành tiền */}
                <div
                  className=" mt-4 d-flex justify-content-end"
                  style={{ borderTop: "1px solid #000" }}
                >
                  <h5 className="mt-4">Thành tiền :</h5>
                  <h5 className="mt-4 ms-3 text-danger">
                    {Intl.NumberFormat("en-US").format(item.thanhTien)} VND
                  </h5>
                </div>

                {/* nút thanh toán */}
                <div className=" mt-4 d-flex justify-content-end  ">
                  {item.trangThai == 0 || item.trangThai == 1 ? (
                    <Button
                      style={{
                        backgroundColor: "orangered",
                        color: "white",
                        width: 150,
                        height: 40,
                      }}
                      onClick={() => showModalHuyHoaDon(item.id)}
                    >
                      Hủy đơn
                    </Button>
                  ) : (
                    <></>
                  )}

                  <Button
                    style={{
                      backgroundColor: "white",
                      width: 150,
                      height: 40,
                      marginLeft: 20,
                    }}
                    onClick={() => {
                      nav(`/chi-tiet-don-hang/${item.id}`);
                    }}
                  >
                    Xem đơn hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
export default TabHistoryClient;
