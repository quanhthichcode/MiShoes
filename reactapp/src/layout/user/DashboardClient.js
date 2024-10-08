import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Layout,
  theme,
  Image,
  Badge,
  Avatar,
  Dropdown,
  Space,
  Col,
  Typography,
} from "antd";

import { Link, useNavigate } from "react-router-dom";
import { TbShoppingCartHeart } from "react-icons/tb";
import logoShop from "../../assets/images/logoNgang.png";
import "./client.css";
import { get, set } from "local-storage";
import { KHThongBao } from "../../utils/socket/socket";
import Notification from "./notificationUser";
import { useCart } from "./cart/CartContext";

const { Header, Content, Footer } = Layout;

export const DashboardClient = ({ children }) => {
  const nav = useNavigate();
  const [userName, setUserName] = useState("");
  const [linkAnh, setLinkAnh] = useState("");
  const storedData = get("userData");
  const storedDataGoogle = get("userGoogle");
  const storedDataFaceBook = get("userFacebook");
  const { totalQuantity } = useCart();

    
  useEffect(() => {
    if (storedData !== null) {
      setUserName(storedData.ten);
      setLinkAnh(storedData.anh);

    } else if (storedDataGoogle != null) {
      setUserName(storedDataGoogle.name);
      setLinkAnh(storedDataGoogle.imageUrl);
    }
    // else if(storedDataFaceBook!=null){
    //         setUserName(storedDataFaceBook.name);
    //         // setLinkAnh(storedDataGoogle.imageUrl);
    // }
    else {
      setUserName(null);
      setLinkAnh(null);
    }
  }, []);
  KHThongBao();
  const openHistory = () => {
    nav("/history");
  };
  const thongTinTaiKhoan = () => {
    nav("/tai-khoan-cua-toi");
  };

  const dangXuat = () => {
    localStorage.clear();
    //  window.location.reload();
    // set("userGoogle", "");
    window.location.href = "/login";
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={thongTinTaiKhoan}>
        Thông tin tài khoản
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={openHistory}>
          Đơn mua
        </a>
      ),
    },
    {
      key: "3",
      label: (

           <a target="_blank" rel="noopener noreferrer" onClick={dangXuat}>
         Đăng xuất
        </a>
      ),
    },
  ];
 
  return (
    <Layout>
      {/* tiêu đề */}

      <Header
        style={{
          display: "flex",
          position: "sticky",
          top: 0,
          zIndex:30,
          width: "100%",
          backgroundColor: "#ffffff",
          color: "black",
        }}
      >
        {/* logo SHOP */}

        <Col span={4}>
          <Image style={{ height: 60 }} width={170} src={logoShop} />
        </Col>
        <Col
          span={2}
          className="d-flex align-items-center justify-content-center"
        >
          <Link to={"/home"} className="text-decoration-none">
            <h6 className="button-menu-trai d-flex align-items-center mt-1 ">
              {" "}
              Trang chủ
            </h6>
          </Link>
        </Col>
        <Col
          span={2}
          className="d-flex align-items-center justify-content-center"
        >
          <Link to={"/san-pham"} className="text-decoration-none">
            <h6 className="button-menu-trai d-flex align-items-center mt-1 ">
              Sản phẩm
            </h6>
          </Link>
        </Col>
        <Col
          span={2}
          className="d-flex align-items-center justify-content-center"
        >
          <Link to={"/home"} className="text-decoration-none">
            <h6 className="button-menu-trai d-flex align-items-center mt-1 ">
              Liên hệ
            </h6>
          </Link>
        </Col>
        <Col
          span={3}
          className="d-flex align-items-center justify-content-center"
        >
          <Link to={"/tra-cuu-don-hang"} className="text-decoration-none">
            <h6 className="button-menu-trai d-flex align-items-center mt-1 ">
              Tra Cứu Đơn hàng
            </h6>
          </Link>
        </Col>
        {/* <Col
          span={3}
          className="d-flex align-items-center justify-content-center"
        >
          <Link to={"/tra-cuu-don-hang"} className="text-decoration-none">
            <h6 className="button-menu-trai d-flex align-items-center mt-2">
              Tra Cứu Đơn hàng
            </h6>
          </Link>
        </Col> */}
        <Col span={6} className="float-end"></Col>
        <Col span={1} className="float-end">
          <Notification />
        </Col>
        <Col span={0.5} className="float-end">
          <Link to={"/gio-hang"} className="float-end justify-content-end ">
            <Badge count={totalQuantity} offset={[8, 1]} className="menuButton">
              <TbShoppingCartHeart size={30} className="menuButton" />
            </Badge>
          </Link>
        </Col>
        <Col span={1} className="ms-1">
          <>
            {userName == null ? (
              <Link to={"/login"}>
                <Avatar
                  shape="circle"
                  className="align-content-center"
                  size="large"
                  src="data:image/jpeg;base64,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"
                  style={{ marginLeft: 40 }}
                />
              </Link>
            ) : (
              <>
                {/* <Avatar
                  shape="circle"
                  className="align-content-center"
                  size="large"
                  src={linkAnh}
                  style={{ marginLeft: 35 }}
                /> */}
                <Dropdown
                  menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: ["3"],
                  }}
                  className="ms-2 mt-5"
                >
                  <Typography.Link>
                    <Space>
                      <Avatar
                        shape="circle"
                        className="align-content-center"
                        size="large"
                        src={linkAnh}
                        style={{ marginLeft: 40 }}
                      />
                    </Space>
                  </Typography.Link>
                </Dropdown>
              </>
            )}
          </>
        </Col>
        <Col span={2} className="ms-5">
          <div className="fw-bold">
            <>
              {userName == null ? (
                <span>Đăng nhập</span>
              ) : (
                <span>
                  {userName.split(" ").slice(2).join(" ") == null
                    ? userName.split(" ").slice(1).join(" ")
                    : userName.split(" ").slice(2).join(" ")}
                </span>
              )}
            </>
          </div>
        </Col>
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
