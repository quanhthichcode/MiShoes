import {
  Button,
  Form,
  Input,
  Col,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GiReturnArrow } from "react-icons/gi";
import { TraHangAPI } from "../api/traHang/traHang.api";
import { useNavigate } from "react-router-dom";
const TraHang = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const handleSubmit=(value)=>{
   
    TraHangAPI.getHoaDonByMa(value.ma).then((res)=>{
      if(res.data===null || res.data===''){
        toast.error("Không tìm thấy hóa đơn!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }else{
        navigate(`/admin-detail-tra-hang/${value.ma}`);
      }
    })
  }
  return (
    <div className="container-fuild">
      <div
        className="  m-2 p-3 pt-2"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid #ddd", // Border color
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
          borderRadius: "8px",
          maxWidth: "100%", // Đảm bảo div không vượt quá kích thước màn hình
          height: "600px",
        }}
      >
        <GiReturnArrow size={30} />{" "}
        <span className=" fs-5">
          <b>Trả hàng</b>
        </span>
        <div className="row d-flex justify-content-center mt-5">
          <Form
            form={form}
            style={{ paddingLeft: 400 }}
            onFinish={handleSubmit}
          >
            <Row>
              <Col span={13} style={{ marginTop: "25px" }}>
                <Form.Item
                  name="ma"
                  label={
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Mã hóa đơn
                    </span>
                  }
                  tooltip="Vui lòng nhập mã hóa đơn"
                >
                  <Input style={{ width: 300 }} />
                </Form.Item>
              </Col>
              <Col
                className="d-flex align-items-center ms-2"
                style={{ marginTop: "-2px" }}
              >
                <Button
                  style={{
                    // width: "110px",
                    // height: "40px",
                    // margin: "0 10px 10px 10px ",
                    backgroundColor: "#3366CC",
                    color: "white",
                  }}
                  onClick={() => {
                    form.submit();
                  }}
                >
                  Tìm kiếm
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="text-center">
          <img
            src="https://cdn.ntlogistics.vn/images/NTX/new_images/shipper-giao-hang-nhanh-can-chu-dong-trong-qua-trinh-gui-hang.jpg"
            style={{ width: 800, height: 400 }}
          ></img>
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
        </div>
      </div>
    </div>
  );
};
export default TraHang;
