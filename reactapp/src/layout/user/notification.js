import { Dropdown,Avatar, Menu, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { IoNotifications } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import { ThongBaoAPI } from "../../pages/censor/api/thongBaoAPI.js/thongBaoAPI";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { GoDotFill } from "react-icons/go";
import "./home.css";
export default function Notification() {
  useEffect(() => {
    loadAll();
    count();
  }, []);

  const navigate = useNavigate(); // dùng để chuyển trang
  const [notifications, setNotification] = useState([]);
  const [NotificationLength, setNotificationLength] = useState();
  const loadAll = () => {
    ThongBaoAPI.getALlThongBaoAdmin().then((res) => {
      setNotification(res.data);
    });
  };
  
      var stomp = null;
      const socket = new SockJS("http://localhost:8080/ws");
      stomp = Stomp.over(socket);

      useEffect(() => {
        stomp.connect({}, () => {
          console.log("connect websocket");

          stomp.subscribe("/topic/admin/hoa-don", (mes) => {
            try {
              const pare = JSON.parse(mes.body);
              console.log(pare);
              // ví du: bạn muốn khi khách hàng bấm đặt hàng mà load lại hóa đơn màn admin thì hãy gọi hàm load all hóa đơn ở đây
              // thí dụ: đây là hàm laod hóa đơn: loadHoaDon(); allThongBao(); CountThongBao();
              loadAll();
              count();
            } catch (e) {
              console.log("lỗi mẹ ròi xem code di: ", e);
            }
          });
        });

        return () => {
          stomp.disconnect();
        };
      }, []);
  const updateStatus = (id) => {
    ThongBaoAPI.updateStatus(id).then((res) => {

        // nếu trạng thái là đã xem thì không load lại cho đỡ lag máy
        loadAll();
        count();
              navigate(`/admin-detail-hoa-don/${res.data.hoaDon.id}`); // dùng để chuyển trang
      

    });
  }

  const count =()=>{
    ThongBaoAPI.countThongBaoAdmin().then((res) => {
      setNotificationLength(res.data);
    });
  }

const menu = (
  <div
    className="custom-scrollbar-thong-bao"
    style={{
      maxHeight: "400px",
      overflowY: "auto",
      border: "1px solid #ccc",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    }}
  >
    <Menu>
      {notifications.map((notification) => (
        <Menu.Item
          key={notification.id}
          onClick={() => {
            if (notification.trangThai === 0) {
              updateStatus(notification.id);
            }
          }}
          style={{
            backgroundColor: notification.trangThai === 1 ? "" : "#e8f9ff",
          }}
          className="mt-2"
        >
          <div className="row">
            <div className="col-md-1">
              <img
                className="rounded-circle"
                src={
                  notification.nguoiDung
                    ? notification.nguoiDung.anh
                    : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHDw8QEBAPDw8QEA0QDxARDw8PEBEQFREWFxURFRgZHSggGBonGxYVIjIjJSkrLi4uFyA/ODMsNygtLisBCgoKDQ0NDg0NDisZFRkrKysrKysrKy0rKy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcCAf/EADsQAQACAQEEBQkGBAcAAAAAAAABAgMEBREhMQZBUWHREhQiMnFygZHBE0JSYqGxI0OSsjNTc4KT4fD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALMAqgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjR6LJrZ3Y6zbtnlWPbINcWbS9FuU5ck+7TxnwSOPYGnp/L8rvta0/UFIF8nY2Cf5NP1hrZ+jmDJ6sWp7tpn994KYJvW9GsuHfOOYyx2erf5cpQ16TSZiYmJjnExumAeQAAAAAAAAAAAAAAAAAAAASuwNmef5N9o/h03eV+aeqviDLsTYc63dkyb64uqOU38IW3DhrgrFaxFaxyiI3Q91jyeEcIfUQAAAAaO09l02hX0o3Wj1bx60eMdzeAc91+hvoL+RePdtHK0dsNZ0Daehrr8c0tz51t11t2qHqMNtPe1LRutWd0qrGAAAAAAAAAAAAAAAAAD7Ws2mIjjMzERHfLoGzNJGixUpHOI9Ke2085VDo9g+31OPfyrvvPwjh+u5eUQAAAAAAAAVrpbouFc0RxjdS/s+7P0+MLK1to4POcOSn4q23e3nH67gc9AVQAAAAAAAAAAAAAAAE90Qrvy5J7McR87R4LaqXRC27Lkjtx7/laPFbUQAAAAAAAAABzjUV8i947L3j5TLGyai3l3vPba0/OZY1UAAAAAAAAAAAAAAABIbBz+b6jHPVM+RP+7hH67l7c05L7sfWxrsNbfej0bx+aOfj8URvAAAAAAAANTauo81w5L9cVnd708I/WW2q/SzXeVNcMTy3Wv7fux9fkCuAKoAAAAAAAAAAAAAAAAkNi7SnZ2TfxnHbdF4/a0d8I8B0jFkjLEWrMTWYiYmOUw9qPsfbFtnT5M+limeNeuO+vguGj1lNZXyqWi0dfbHdMdSI2AAAAARe1ttU0G+sbr5Pwxyj3p6gZdr7Srs6kzzvPCle2e32KLlyTltNrTvtaZmZ7Zlk1Wptq7ze877T8ojsjshhVQAAAAAAAAAAAAAAAAAAABkw5rYLeVS01tHXE7mMBPaXpPkx8MlYyd8ehbwSOLpNhtzjJWfdif2lUAFznpJp467/ANEtfP0ppHqY72n80xWPqqgCU1u3c2q4eV9nXspwn4zzRj4AAAAAAAAAAAAAAAAAAAAAA+0rN53REzM8oiN8g+CV0uwM+fjNYxx23nj8o4pTB0XpHr5LW92IrH1BVhd8WwtPj/l+V71rT9WxXZuGnLDj/oqCgDoXmeP/AC8f9FfB5vs/Ffnixf8AHUHPxd8uw9Pk/lxHuzav7NHP0XpbjTJavdaItH0BVhK6rYGfBvmKxkjtpPH5Si71mk7piYmOcTG6QfAAAAAAAAAAAAAAAAHvFjnNaK1rNrTyiI3y3tlbIvtDj6mPrvMc+6sda3aHQY9DXdSu7ttPG0+2QQWg6Mzbjmtu/JWePxnwWDS6PHpI3Y6Vr2zHOfbPOWcAAFAAAAAAGDV6PHq43XpW3ZMxxj2TzhnAVjaHRqa+lhnfH4Lc/hPigMmOcUzW0TW0c4mN0ujNTaGz8evruvHHqtHC1fZIigiQ2psm+zp3z6WOeV4/aeyUeAAAAAAAAAAAntibC843ZMsbqc605Tbvnu/d66PbG+23ZssejzpWfvfmnuWkHytYpERERERwiI4REPoCgAAAAAAAAAAAAAPN6ReJiYiYmN0xPGJhU9ubEnSb8mON+P71ec0/6W4mN4ObCb2/sfzSZyY4/hzPpR+CfBCCAAAAAACW2Bsvz6/l2j+FSeP5rfh9na0NFpba3JXHXnM8Z7I65lfNLp66WlaVjdFY3R4yDLEbn0BQAAAAAAAAAAAAAAAAAHnJSMkTWY3xMTExPKY7FI2zs6dn5N3GaW3zSe78M98Ly1NqaKNfjmk8+dZ7LdUiKCPWSk45mto3WiZiY7Jh5AAABu7I0fn2atPu+tf3Y/8AbviCxdGdB5vj+0tHp5IiY7qdUfHn8k0RG4FAAAAAAAAAAAAAAAAAAAAAAVbpXofs7VzRyt6N/ejlPxj9lfdA2jpo1mK+OfvRw7rdU/NQJjyeE844T7RHwABP9EP8TL7lf7gBagBQAAAAAAAAAAAAAAAAAAAAACXP9p/4+b/Uyf3SAjWAB//Z"
                }
                alt="Notification"
                style={{ width: "42px", height: "42px" }}
              />
            </div>
            <div className="col-md-9 ms-3">
              <span>
                <span className="text-danger">
                  <b>
                    {notification.nguoiDung
                      ? notification.nguoiDung.ten
                      : notification.hoaDon.tenNguoiNhan}
                  </b>
                </span>{" "}
                đã đặt đơn hàng
              </span>
              <br></br>
              <span>{notification.noiDung}</span>
            </div>
            <div className="col-md-1 pt-2 ms-2">
              <span className="float-end" size={50}>
                {notification.trangThai == 1 ? "" : <GoDotFill />}
              </span>
            </div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  </div>
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

