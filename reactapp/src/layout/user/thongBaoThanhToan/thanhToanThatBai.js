import React, { useEffect, useState, useRef } from "react";
import "./thanhToanThongbao.css";
import { gsap } from "gsap";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "./button";
export default function ThanhToanThatBai() {
      const nav = useNavigate();
  useEffect(() => {
    checkOut();
  }, []);

  const checkOut = () => {
    const storedFormString = localStorage.getItem('formData');
    const storedForm = JSON.parse(storedFormString);
    if(storedForm !== null){
      localStorage.removeItem('formData');
    }
  };
    const backGioHang = (res) => {
      nav("/gio-hang");
    };

const [animationDone, setAnimationDone] = useState(false);

const handleButtonClick = () => {

      const button = document.querySelector(".truck-button");
      const box = button.querySelector(".box");
      const truck = button.querySelector(".truck");
  if (!animationDone) {
    // Thực hiện animation


    // Các hoạt ảnh GSAP ở đây...

    // Đặt animationDone thành true sau khi hoàn thành animation
    setAnimationDone(true);
  } else {
    // Đặt lại trạng thái khi animationDone là true
    setAnimationDone(false);

    // Đặt lại trạng thái và vị trí của các phần tử
    gsap.set(truck, { x: 4 });
    gsap.set(button, {
      "--progress": 0,
      "--hx": 0,
      "--bx": 0,
      "--box-s": 0.5,
      "--box-o": 0,
      "--truck-y": 0,
      "--truck-y-n": -26,
    });
    gsap.set(box, { x: -24, y: -6 });
  }
};
  return (
    <div className="resultContainer">
      <Result
        status="500"
        title="Thanh toán thất bại"
        subTitle="Bạn có muốn tiếp tục thanh toán ???"
        extra={
          <Button type="primary" onClick={backGioHang}>
            Tiếp tục thanh toán
          </Button>
        }
      />
   
    </div>
  );
  

}
