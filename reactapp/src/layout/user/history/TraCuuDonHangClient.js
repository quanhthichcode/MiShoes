import LogoGHN from "../../../assets/images/logoDiShip.jpg";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
} from "antd";
import { HoaDonClientAPI } from "../../../pages/censor/api/HoaDonClient/HoaDonClientAPI";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

const TraCuuDonHangClient = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [listBill, setlistBill] = useState([]);
  const handleSubmit = (values) => {
    HoaDonClientAPI.SearchHDClient(values)
      .then((res) => {
        setlistBill(res.data);
        if (res.data.id != null) {
      
          form.resetFields();
          toast("🦄 Tra cứu đơn hàng thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
              nav(`/hd/${res.data.id}`);
        }
       
        toast("🦄 Tra cứu đơn hàng thất bại !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    
      })
      .catch(() => {
        toast("🦄 Tra cứu đơn hàng thành công!", {
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

  return (
    <>
      <div className="row d-flex justify-content-center">
        <Form
          form={form}
          layout="vertical "
          style={{ paddingLeft: 400 }}
          onFinish={handleSubmit}
        >
          <Row>
            <Col span={7} style={{ marginRight: "20px" }}>
              <Form.Item
                name="ma"
                label="Mã hóa đơn"
                tooltip="Vui lòng nhập mã hóa đơn"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name="sdt"
                label="Số điện thoại"
                tooltip="Vui lòng nhập sdt"

                // labelCol={{ span: 9 }}
                // wrapperCol={{ span: 15 }}
              >
                <Input

                // style={{ textAlign: "center" }}
                />
              </Form.Item>
            </Col>

            <Col className="d-flex align-items-center ms-2 mt-2">
              <Button
                style={{
                  // width: "110px",
                  // height: "40px",
                  // margin: "0 10px 10px 10px ",
                  backgroundColor: "#3366CC",
                  color: "white",
                }}
                // htmlType="reset"
                onClick={form.submit}
              >
                Hoàn tất
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="text-center">
        <img src={LogoGHN} style={{ width: 700, height: 403 }}></img>
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
    </>
  );
};
export default TraCuuDonHangClient;
