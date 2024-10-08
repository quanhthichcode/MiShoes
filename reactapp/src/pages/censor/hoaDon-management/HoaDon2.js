import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Select, Space, Table, Divider, Badge } from 'antd';
import './HoaDon.scss';
import { Tabs, Tag } from 'antd';
import { BsFillEyeFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import moment from "moment";
import Input from 'antd/es/input/Input';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { FaMoneyBills } from 'react-icons/fa6';
import { FilterFilled, RetweetOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { HoaDonAPI } from '../api/hoaDon/hoaDon.api';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";


export default function HoaDon() {
  //Tìm hóa đơn
  const onChangeFilter = (changedValues, allValues) => {
    timKiemHD(allValues);
  };

  const timKiemHD = (dataSearch) => {
    HoaDonAPI.search(dataSearch).then((res) => {
      setHoaDons(res.data);
    });
  };
  var stomp = null;
  const socket = new SockJS("http://localhost:8080/ws");
  stomp = Stomp.over(socket);

  useEffect(() => {
    stomp.connect({}, () => {

      stomp.subscribe("/topic/admin/hoa-don", (mes) => {
        try {
          const pare = JSON.parse(mes.body);
          console.log(pare);
          // ví du: bạn muốn khi khách hàng bấm đặt hàng mà load lại hóa đơn màn admin thì hãy gọi hàm load all hóa đơn ở đây
          // thí dụ: đây là hàm laod hóa đơn: loadHoaDon(); allThongBao(); CountThongBao();
          loadHoaDon();
          loadHoaDonCho();
        } catch (e) {
          console.log("lỗi mẹ ròi xem code di: ", e);
        }
      });
    });

    return () => {
      stomp.disconnect();
    };
  }, []);
  useEffect(() => {
    loadHoaDon();
    loadHoaDonCho();
    loadHoaDonCVC();
    loadHoaDonHT();
    loadHoaDonTT();
    loadHoaDonVC();
    loadHoaDonXN();
    loadHoaDonHuy();
   
  }, []);
  // load full hóa đơn
  const [hoaDon, setHoaDons] = useState([]);
  const loadHoaDon = () => {
    HoaDonAPI.getAll().then((res) => {
      setHoaDons(res.data);
    });
  };
  //load hoa don cho
  const [hoaDonCho, setHoaDonsCho] = useState([]);
  const [tongHDchoXN, settongHDchoXN] = useState([]);
  const loadHoaDonCho = () => {
    HoaDonAPI.getAllbyTT(0).then((res) => {
      setHoaDonsCho(res.data);
      const demHD = res.data.length;
      settongHDchoXN(demHD);
    });
  };
  //load hoa xac nhan
  const [hoaDonXN, setHoaDonsXN] = useState([]);
  const [tongHDXacNhan, settongHDXacNhan] = useState([]);
  const loadHoaDonXN = () => {
    HoaDonAPI.getAllbyTT(1).then((res) => {
      setHoaDonsXN(res.data);
      const demHD = res.data.length;
      settongHDXacNhan(demHD);
    });
  };
  //load hoa chờ vận chuyển
  const [hoaDonCVC, setHoaDonCVC] = useState([]);
  const [tongHDChoVanChuyen, settongHDChoVanChuyen] = useState([]);
  const loadHoaDonCVC = () => {
    HoaDonAPI.getAllbyTT(2).then((res) => {
      setHoaDonCVC(res.data);
      const demHD = res.data.length;
      settongHDChoVanChuyen(demHD);
    });
  };
  // load hóa đơn vận chuyển
  const [hoaDonVC, setHoaDonVC] = useState([]);
  const [tongHDVanChuyen, settongHDVanChuyen] = useState([]);
  const loadHoaDonVC = () => {
    HoaDonAPI.getAllbyTT(3).then((res) => {
      setHoaDonVC(res.data);
      const demHD = res.data.length;
      settongHDVanChuyen(demHD);
    });
  };
  //load hóa đơn thanh toán
  const [hoaDonTT, setHoaDonTT] = useState([]);
  const [tongHDThanhToan, settongHDThanhToan] = useState([]);
  const loadHoaDonTT = () => {
    HoaDonAPI.getAllbyTT(4).then((res) => {
      setHoaDonTT(res.data);

      const demHD = res.data.length;
      settongHDThanhToan(demHD);
    });
  };
  //load hóa đơn thành công
  const [hoaDonHT, setHoaDonHT] = useState([]);
  const loadHoaDonHT = () => {
    HoaDonAPI.getAllbyTT(5).then((res) => {
      setHoaDonHT(res.data);

    });
  };
  //load hóa đơn thành công
  const [hoaDonHuy, setHoaDonHuy] = useState([]);
  const loadHoaDonHuy = () => {
    HoaDonAPI.getAllbyTT(-1).then((res) => {
      setHoaDonHuy(res.data);
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSortTooltip: false,
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "ma",
      center: "true",

      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Mã NV",
      dataIndex: "maNV",
    },
    {
      title: "Khách hàng",
      dataIndex: "tenKH",
    },
    {
      title: "SDT KH",
      dataIndex: "sdt",
    },
    {
      title: "Loại HĐ",
      dataIndex: "loaiHD",
      key: "loaiHD",
      render: (trangThai) => (
        <>
          {trangThai == 0 ? (
            <Tag color="#00cc00">Online</Tag>
          ) : (
            <Tag color="#FFD700">Tại quầy</Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "Online",
          value: "0",
        },
        {
          text: "Tại quầy",
          value: "1",
        },
      ],
      onFilter: (value, record) => record.loaiHD.indexOf(value) === 0,
    },
    {
      title: "Ngày mua",

      dataIndex: "ngayMua",
      render: (ngayMua) => <>{moment(ngayMua).format("hh:mm:ss DD/MM/YYYY")}</>,
    },
    {
      title: "Thành tiền ",
      dataIndex: "thanhTien",
      render: (thanhTien) => (
        <IntlProvider locale="vi-VN">
          <div>
            <FormattedNumber
              value={thanhTien}
              style="currency"
              currency="VND"
              minimumFractionDigits={0}
            />
          </div>
        </IntlProvider>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      center: "true",
      render: (trangThai) => (
        <>
          {trangThai == 0 ? (
            <Tag color="red">Chờ xác nhận</Tag>
          ) : trangThai == 1 ? (
            <Tag color="purple">Xác nhận</Tag>
          ) : trangThai == 2 ? (
            <Tag color="geekblue">Chờ vận chuyển</Tag>
          ) : trangThai == 3 ? (
            <Tag color="blue">Vận chuyển</Tag>
          ) : trangThai == 4 ? (
            <Tag color="cyan">Thanh toán</Tag>
          ) : trangThai == 5 ? (
            <Tag color="green">Hoàn thành</Tag>
          ) : trangThai == -1 ? (
            <Tag color="#cd201f">Hủy</Tag>
          ) : trangThai == -2 ? (
            <Tag color="#cd201f">Hoàn tiền</Tag>
          ) : (
            <Tag color="gold">Đã thanh toán</Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "London",
          value: "0",
        },
        {
          text: "New York",
          value: "1",
        },
      ],
      onFilter: (value, record) => record.trangThai.indexOf(value) === 0,
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "idHD",

      render: (title) => (
        <Space size="middle">
          <Link
            to={`/admin-detail-hoa-don/${title}`}
            className="btn btn-danger"
          >
            <BsFillEyeFill />
          </Link>
        </Space>
      ),
      center: "true",
    },
  ];

  const onChange = (key) => {};
  const items = [
    {
      key: "1",

      label: "Tất cả",
      children: (
        <Table
          dataSource={hoaDon}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            position: ["bottomCenter"],
            defaultPageSize: 5,
            defaultCurrent: 1,
            total: 100,
          }}
        />
      ),
    },
    {
      key: "2",
      label: (
        <Badge count={tongHDchoXN} offset={[8, 1]}>
          Chờ xác nhận
        </Badge>
      ),
      children: (
        <Table
          dataSource={hoaDonCho}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            position: ["bottomCenter"],
            defaultPageSize: 5,
            defaultCurrent: 1,
            total: 100,
          }}
        />
      ),
    },
    {
      key: "3",
      label: (
        <Badge count={tongHDXacNhan} offset={[8, 1]}>
          Xác nhận
        </Badge>
      ),
      children: (
        <Table
          dataSource={hoaDonXN}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            position: ["bottomCenter"],
            defaultPageSize: 5,
            defaultCurrent: 1,
            total: 100,
          }}
        />
      ),
    },
    {
      key: "4",
      label: (
        <Badge count={tongHDChoVanChuyen} offset={[8, 1]}>
          Chờ vận chuyển
        </Badge>
      ),
      children: (
        <Table
          dataSource={hoaDonCVC}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            position: ["bottomCenter"],
            defaultPageSize: 5,
            defaultCurrent: 1,
            total: 100,
          }}
        />
      ),
    },
    {
      key: "5",
      label: (
        <Badge count={tongHDVanChuyen} offset={[8, 1]}>
          Vận chuyển
        </Badge>
      ),
      children: (
        <Table
          dataSource={hoaDonVC}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            position: ["bottomCenter"],
            defaultPageSize: 5,
            defaultCurrent: 1,
            total: 100,
          }}
        />
      ),
    },
    {
      key: "6",
      label: (
        <Badge count={tongHDThanhToan} offset={[8, 1]}>
          Thanh toán
        </Badge>
      ),
      children: (
        <Table
          dataSource={hoaDonTT}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            position: ["bottomCenter"],
            defaultPageSize: 5,
            defaultCurrent: 1,
            total: 100,
          }}
        />
      ),
    },
    {
      key: "7",
      label: "Hoàn thành",
      children: (
        <Table
          dataSource={hoaDonHT}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            position: ["bottomCenter"],
            defaultPageSize: 5,
            defaultCurrent: 1,
            total: 100,
          }}
        />
      ),
    },
    {
      key: "8",
      label: (
        <Badge count={0} offset={[8, 1]}>
          Hủy
        </Badge>
      ),
      children: (
        <Table
          dataSource={hoaDonHuy}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            position: ["bottomCenter"],
            defaultPageSize: 5,
            defaultCurrent: 1,
            total: 100,
          }}
        />
      ),
    },
  
  ];

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  // tìm kiếm trong from
  const [form] = Form.useForm();

  return (
    <div className="container-fluid">
      <Divider orientation="center" color="none">
        <h2 className="text-start pt-1 fw-bold">
          <FaMoneyBills /> Quản lý hóa đơn
        </h2>
      </Divider>

      {/* lọc hóa đơn */}
      <div
        className=" bg-light m-2 p-3 pt-2"
        style={{
          border: "1px solid #ddd", // Border color
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
          borderRadius: "8px",
        }}
      >
        <h5 className="text-start">
          <FilterFilled size={30} /> Bộ lọc
        </h5>
        <hr />
        <Form
          className="row col-md-12"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onChangeFilter}
          size={componentSize}
          style={{
            maxWidth: 1600,
          }}
          form={form}
        >
          <div className="col-md-6">
            <Form.Item label="Tìm kiếm" name="tenHD">
              <Input required className="rounded-pill border-warning" />
            </Form.Item>
            <Form.Item
              label="Loại HD"
              className="rounded-pill border-warning"
              name="loaiHD"
            >
              <Select className="rounded-pill border-warning">
                <Select.Option
                  className="rounded-pill border-warning"
                  value="1"
                >
                  Tại quầy
                </Select.Option>
                <Select.Option
                  className="rounded-pill border-warning"
                  value="0"
                >
                  Online
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-6">
            <div className="col-md-12">
              <Form.Item label="Ngày bắt đầu" name="ngayBDHD">
                <DatePicker
                  className="rounded-pill border-warning"
                  placeholder="Ngày bắt đầu"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item label="Ngày kết thúc" name="ngayKTHD">
                <DatePicker
                  className="rounded-pill border-warning"
                  placeholder="Ngày kết thúc"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item className="d-flex justify-content-center">
            <Button
              type="primary"
              htmlType="reset"
              onClick={loadHoaDon}
              icon={<RetweetOutlined />}
            >
              Làm mới
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* bảng hóa đơn */}

      <div
        className="mt-4"
        style={{
          border: "1px solid #ddd", // Border color
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // Box shadow
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <div className="text-start fw-bold">
          <p>
            <UnorderedListOutlined size={30} /> Danh sách hóa đơn{" "}
          </p>
        </div>
        <>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </>
      </div>
    </div>
  );
}
