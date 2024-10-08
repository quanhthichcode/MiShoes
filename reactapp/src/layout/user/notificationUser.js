import { Dropdown, Avatar, Menu, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { IoNotifications } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { ThongBaoAPI } from "../../pages/censor/api/thongBaoAPI.js/thongBaoAPI";
import { useNavigate } from "react-router-dom";


export default function Notification() {
  useEffect(() => {
    loadAll();
    count();
  }, []);
  const navigate = useNavigate(); // dùng để chuyển trang
  const [notifications, setNotification] = useState([]);
  const [NotificationLength, setNotificationLength] = useState();

  const storedItem = localStorage.getItem("userData");
  const parsedItem = JSON.parse(storedItem);
  const loadAll = () => {
    if(parsedItem!=null){
    ThongBaoAPI.getALlThongBaoKH(parsedItem.accessToken).then((res) => {
      setNotification(res.data);
    });
  }else{
    return null;
  }
  };

  const updateStatus = (id) => {
    ThongBaoAPI.updateStatus(id).then((res) => {
    
      navigate(`/chi-tiet-don-hang/${res.data.hoaDon.id}`); // dùng để chuyển trang
      if(res.data.trangThai == 0){
        // nếu trạng thái là đã xem thì không load lại cho đỡ lag máy
        loadAll();
        count();
      }else{
        return null;
      }
    });
  };

  const count = () => {
    if(parsedItem!=null){
    ThongBaoAPI.countThongBaoKH(parsedItem.accessToken).then((res) => {
      setNotificationLength(res.data);
    });
  }else{
    return null;
  }
  };

  const menu = (
    <Menu>
      {notifications.map((notification) => (
        <Menu.Item
          key={notification.id}
          onClick={() => updateStatus(notification.id)}
        >
          <img
            src={notification.nguoiDung.anh}
            alt="Notification"
            style={{ width: "24px", marginRight: "8px" }}
          />
          <span>{notification.nguoiDung.ten} da dat don hang</span>
          <br></br>
          <span>
            {/* [<strong>{notification.noiDung}</strong>] */}
            {}
            {notification.noiDung}
            <br></br>
            {notification.trangThai == 1 ? "Đã xem" : "chưa xem"}
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );

  // const Notifications = () => (

  // );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div>
        <Badge count={NotificationLength} color="red">
          <Avatar
            shape="circle"
            className="align-content-center"
            size="default"
            icon={<IoNotifications size={20} color="#9e9e9e" />}
            style={{ backgroundColor: "#f7faf9" }}
          />
        </Badge>
      </div>
    </Dropdown>
  );
}
