// import { Avatar, Flex, Button, Space, Tabs, Tag } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { BsShop } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { TfiPencil } from "react-icons/tfi";
import {
   Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
} from "antd";
import { ToastContainer } from "react-toastify";
import { get, set } from "local-storage";
import UpLoadImage from "../../../pages/censor/nhanVien-management/UploadAnh";
import ProfileMenu from "./ProfileMenu";
const AccountProfile = (props) => {
  const idHD = useParams();
  const [form] = Form.useForm();
  const storedData = get("userData");
  const [userName, setUserName] = useState("");
  const [AnhUser, setLinkAnhUser] = useState("");
  const nav = useNavigate();
  const [listBillHistory, setListBillHistory] = useState([]);
  const [listTimeLine, setlistTimeLine] = useState([]);
  const [statusPresent, setStatusPresent] = useState([]);
  const [bill, setBill] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const [fileImage, setFileIamge] = useState(null);
  useEffect(() => {
    setUserName(storedData.ten);
    setLinkAnhUser(storedData.anh);
  }, []);

  const handleFileUpload = (fileData) => {
    setFileIamge(fileData);
  };
  return (
    <div className="row">
      <ProfileMenu></ProfileMenu>
      <div className="col-md-10 ">
        <div className="ps-3">
          <p>
            <span className="fs-5">
              <b>Hồ sơ của tôi</b>
            </span>
            <br></br>
            <span>
              <b>Quản lý thông tin hồ sơ để bảo mật tài khoản</b>
            </span>
          </p>
        </div>
        <hr></hr>

        <div className="row">
          <Form form={form} layout="vertical">
            <Row gutter={14} style={{ marginTop: "30px" }}>
              <Col span={7}>
                <Card style={{ height: "100%" }}>
                  <h6 className="text-center fw-bold">Ảnh đại diện</h6>
                  <Row className="text-center mt-5">
                    <UpLoadImage onFileUpload={handleFileUpload} />
                  </Row>
                </Card>
              </Col>
              <Col span={17}>
                <Card style={{ height: "100%" }}>
                  <h6 className="text-center fw-bold">Hồ sơ của tôi</h6>
                  <Row
                    justify="end"
                    align="middle"
                    style={{ marginBottom: "15px", marginTop: "10px" }}
                  >
                    <Col span={11}>
           
                      <Button
                        // onClick={handleSuccess}
                        style={{
                          width: "110px",
                          height: "40px",
                          margin: "0 10px 10px 10px ",
                          backgroundColor: "#3366CC",
                          color: "white",
                          marginLeft: "150px",
                        }}
                        // htmlType="reset"
                      >
                        Hoàn tất
                      </Button>
                    
                    </Col>
                  </Row>
                  <Row>
                    <Col span={11} style={{ marginRight: "20px" }}>
                      <Form.Item
                        name="ten"
                        label="Họ và tên"
                        tooltip="Họ tên đầy đủ của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập họ và tên.",
                            whitespace: true,
                          },
                          {
                            pattern: /^[A-Za-zÀ-Ỹà-ỹ\s]+$/,
                            message: "Họ và tên chỉ được phép chứa chữ cái.",
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Input
                          onKeyPress={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
                              e.preventDefault();
                            }
                          }}
                          // style={{ textAlign: "center" }}
                        />
                      </Form.Item>
                      <Form.Item
                        name="canCuocCongDan"
                        label="Căn cước"
                        tooltip="Căn cước công dân của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập căn cước công dân.",
                            whitespace: true,
                          },
                          {
                            pattern: /^\d{12}$/,
                            message: "Căn cước công dân cần phải 12 chữ số.",
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="gioiTinh"
                        label="Giới tính"
                        tooltip="Giới tính của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy chọn giới tính.",
                            whitespace: true,
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Select defaultValue={""}>
                          <Select.Option value="">Chọn giới tính</Select.Option>
                          <Select.Option value="true">Nam</Select.Option>
                          <Select.Option value="false">Nữ</Select.Option>
                        </Select>
                      </Form.Item>
                    
                    </Col>
                    <Col span={11} style={{ marginRight: "20px" }}>
                      <Form.Item
                        name="ngaySinh"
                        label="Ngày sinh"
                        tooltip="Ngày sinh của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập ngày sinh.",
                            whitespace: true,
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Input type="date" style={{ textAlign: "center" }} />
                      </Form.Item>

                      <Form.Item
                        name="email"
                        label="Email"
                        tooltip="Email của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập email.",
                            whitespace: true,
                          },
                          {
                            type: "email",
                            message: "Vui lòng nhập đúng định dạng email.",
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="soDienThoai"
                        label="Số điện thoại"
                        tooltip="Số điện thoại của bạn là gì?"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng hãy nhập số điện thoại.",
                            whitespace: true,
                          },
                          {
                            pattern: /^0\d{9}$/,
                            message: "Vui lòng nhập số điện thoại hợp lệ.",
                          },
                        ]}
                        // labelCol={{ span: 9 }}
                        // wrapperCol={{ span: 15 }}
                      >
                        <Input />
                      </Form.Item>                
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      {/* tab */}
    </div>
  );
};
export default AccountProfile;
