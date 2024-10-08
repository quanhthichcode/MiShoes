import {  Tabs } from "antd";

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, set } from "local-storage";
import "./history.css";
import { HoaDonClientAPI } from "../../../pages/censor/api/HoaDonClient/HoaDonClientAPI";
import TabHistoryClient from "./TabHistoryClient";
import ProfileMenu from "../profile/ProfileMenu";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
const ALLTabHistoryClient = () => {
  
  const [listBill, setListBill] = useState([]);
 
  const storedData = get("userData");
  const [userName, setUserName] = useState("");
  const [AnhUser, setLinkAnhUser] = useState("");
  const id = storedData.userID;
  const [key, setKey] = useState("10");
  const keyToStatusMapping = {
    1: "0",
    2: "1",
    3: "2",
    4: "3",
    5: "5",
    6: "-1",
    10: "",
  };
  useEffect(() => {
    setUserName(storedData.ten);
    setLinkAnhUser(storedData.anh);
    const trangThai = keyToStatusMapping[key] ? keyToStatusMapping[key] : "";

    const datatest = { id: id, trangThai };
    HoaDonClientAPI.getALLHoaDonOnlineByIdKH(datatest).then((res) => {
      const data = res.data;
      console.log(data);
      const promises = data.map((item) => {
        return HoaDonClientAPI.getALLChiTietSanPhamClientOlByIdHD(item.id).then(
          (res) => ({
            id: item.id,
            ma:item.ma,
            thanhTien: item.thanhTien,
            trangThai: item.trangThaiHD,
            hoaDonDetail: res.data,
          })
        );
      });

      Promise.all(promises).then((results) => {
        setListBill(results);
      
      });
    });
  }, [key]);
  
  useEffect(() => {

  }, [listBill]);
  //   item tab
  const onChange = (key) => {
    setKey(key);
    console.log(key);
  };
     var stomp = null;
     const socket = new SockJS("http://localhost:8080/ws");
     stomp = Stomp.over(socket);

     useEffect(() => {
       stomp.connect({}, () => {
         console.log("connect websocket");

         stomp.subscribe("/topic/KH/hoa-don", (mes) => {
           try {
             const pare = JSON.parse(mes.body);
             console.log(pare);
             // ví du: bạn muốn khi khách hàng bấm đặt hàng mà load lại hóa đơn màn admin thì hãy gọi hàm load all hóa đơn ở đây
             // thí dụ: đây là hàm laod hóa đơn: loadHoaDon(); allThongBao(); CountThongBao();
            const trangThai = keyToStatusMapping[key]
              ? keyToStatusMapping[key]
              : "";

            const datatest = { id: id, trangThai };
            HoaDonClientAPI.getALLHoaDonOnlineByIdKH(datatest).then((res) => {
              const data = res.data;
              const promises = data.map((item) => {
                return HoaDonClientAPI.getALLChiTietSanPhamClientOlByIdHD(
                  item.id
                ).then((res) => ({
                  id: item.id,
                  ma: item.ma,
                  thanhTien: item.thanhTien,
                  trangThai: item.trangThaiHD,
                  hoaDonDetail: res.data,
                }));
              });

              Promise.all(promises).then((results) => {
                setListBill(results);
              });
            });
           } catch (e) {
             console.log("lỗi mẹ ròi xem code di: ", e);
           }
         });
       });

       return () => {
         stomp.disconnect();
       };
     }, []);
  return (
    <div className="row">
      <ProfileMenu></ProfileMenu>

      {/* tab */}
      <div className="col-md-10" style={{ padding: 20 }}>
        <Tabs onChange={onChange} type="card">
          <Tabs.TabPane tab="Tất cả" key="10">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chờ xác nhận" key="1">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Xác nhận" key="2">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chờ vận chuyển" key="3">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Vận chuyển" key="4">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Hoàn thành" key="5">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đã hủy" key="6">
            <TabHistoryClient listBill={listBill} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default ALLTabHistoryClient;
