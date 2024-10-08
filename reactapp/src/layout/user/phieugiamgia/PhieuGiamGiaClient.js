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
  Space,
  Select,
} from "antd";
import { ToastContainer } from "react-toastify";
import { get, set } from "local-storage";
import UpLoadImage from "../../../pages/censor/nhanVien-management/UploadAnh";
import ProfileMenu from "../profile/ProfileMenu";
import { SellAPI } from "../../../pages/censor/api/sell/sell.api";
import "./phieugiamgia.css"
const PhieuGiamGiaCLient = (props) => {
  const idHD = useParams();
  const [form] = Form.useForm();
  const storedData = get("userData");
  const [userName, setUserName] = useState("");
  const [AnhUser, setLinkAnhUser] = useState("");
  const nav = useNavigate();
  const [fileImage, setFileIamge] = useState(null);
  const [datas, setData] = useState([]);
  const loadVoucher = () => {
    SellAPI.getVoucherWithIDKH(storedData.userID)
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setUserName(storedData.ten);
    setLinkAnhUser(storedData.anh);
    loadVoucher();
  }, []);

  const muaNgay = () => {
    nav("/san-pham");
  };
  const handleFileUpload = (fileData) => {
    setFileIamge(fileData);
  };
  return (
    <div className="row" style={{height:705}}>
      <ProfileMenu></ProfileMenu>
      <div
        className="col-md-10 "
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <div
          style={{
            padding: "0 10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h5>Phiếu giảm giá</h5>
          <p>Các voucher bạn có thể sử dụng</p>
        </div>
        <div
          className="row mt-5"
          style={{
            padding: "0 30px",
          }}
        >
          {datas.map((item, index) => (
            <div className="col-md-4">
              <div class="cardPhieuGiamGia">
                <div class="cardribbon">
                  {item.mucDo.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}

                  <span>{item.loaiVoucher === "Tiền mặt" ? "VND" : "%"}</span>
                </div>
                <h3>{item.ma}</h3>

                <h6>
                  Điều kiện:
                  <span className="text-danger ms-2">
                    {item.dieuKien.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </h6>

                <h6>
                  Giảm tối đa:
                  <span className="text-danger ms-2">
                    {item.giamToiDa.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </h6>

                <h6>
                  Số ngày còn lại:
                  <span className="text-danger ms-2">{item.ngayConLai}</span>
                </h6>
                <div className="text-end">
                  <button className=" btn btn-danger" onClick={muaNgay}>
                    Sử dụng
                  </button>
                </div>
              </div>
            </div>
            // <Space direction="vertical" size={16} className="col-md-3">
            //   <Card
            //     size="small"
            //     title={item.ma}
            //     extra={item.soLuong}
            //     style={{ width: 300 }}
            //   >
            // <p>
            //   {item.mucDo}
            //   <span>{item.loaiVoucher === "Tiền mặt" ? "VND" : "%"}</span>
            // </p>
            // <p>Điều kiện : {item.dieuKien}</p>
            // <p>Giảm tối đa: {item.giamToiDa}</p>
            // <p>Số ngày còn lại: {item.ngayConLai}</p>
            // <button className="text-end" onClick={muaNgay}>Sử dụng</button>
            //   </Card>
            // </Space>
          ))}
        </div>
      </div>
      {/* tab */}
    </div>
  );
};
export default PhieuGiamGiaCLient;
