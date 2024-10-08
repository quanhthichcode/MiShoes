import React, { useEffect, useState, useRef } from "react";
import { BanHangClientAPI } from "../../../pages/censor/api/banHangClient/banHangClient.api";
import { Button, Result } from "antd";
import {useNavigate } from "react-router-dom";
import "./thanhToanThongbao.css";
export default function ThanhToanThanhCong() {
    const nav = useNavigate();
  useEffect(() => {
    checkOut();
  }, []);

  const checkOut = () => {
    const storedFormString = localStorage.getItem('formData');
    const storedForm = JSON.parse(storedFormString);
    if(storedForm !== null){
      BanHangClientAPI.checkout(storedForm);
      localStorage.removeItem('formData');
    }
    console.log(storedForm);
  };
    const backHome = (res) => {
      nav("/home");
    };
  return (
    <div className="resultContainer">
      <Result
        status="success"
        title="Đặt hàng thành công!"
        subTitle="Thông tin đơn hàng đã gửi về mail của bạn!!!, vui lòng kiểm tra mail để biết thêm thông tin chi tiết"
        extra={[
      
          <Button type="primary" onClick={backHome}>
            Tiếp tục mua hàng
          </Button>,
        ]}
      />
    </div>
  );
}
