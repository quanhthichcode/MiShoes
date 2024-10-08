import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Slider,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import axios from "axios";
import { BsFillEyeFill } from "react-icons/bs";
import { FaTshirt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SanPham.css";
import { SanPhamAPI } from "../api/SanPham/sanPham.api";

export default function SanPham() {
  //Form
   const nav = useNavigate();
    const themSP = (res) => {
      console.log(res);
    
      nav("/admin-them-san-pham");
    };
  const [selectedValue, setSelectedValue] = useState("1");
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    console.log("All values : ", allValues);
    timKiemCT(allValues);
  };
  const timKiemCT = (dataSearch) => {
    SanPhamAPI.search(dataSearch)
      .then((response) => {
        setSanPhams(response.data);
        console.log(response.data);
        console.log(response.data.lenght);
      })
      .catch((error) => console.error("Error adding item:", error));
  };
  //Table
  const [sanPham, setSanPhams] = useState([]);

  useEffect(() => {
    loadSanPham();
  }, []);
  // useEffect(() => {
  //   loadSanPham();
  // }, [sanPham]);
  const loadSanPham = () => {
    SanPhamAPI.getAll().then((res) => {
      setSanPhams(res.data);
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "idSP",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag color="green">Còn bán</Tag>
          ) : (
            <Tag color="red">Dừng bán</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "idSP",

      render: (title) => (
        <Space size="middle">
          <a>
            <Link to={`/admin-showct/${title}`} className="btn btn-danger">
              <BsFillEyeFill className="mb-1" />
            </Link>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            {" "}
            <FaTshirt size={35} /> Quản lý sản phẩm
          </h4>
        </Divider>
        <div
          className=" bg-light m-2 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5>
            <FilterFilled size={30} /> Bộ lọc
          </h5>
          <hr />
          <Form
            className="row"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 20,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onChangeFilter}
            size={componentSize}
            style={{
              maxWidth: 1400,
            }}
          >
            <div className="col-md-4">
              <Form.Item label="Tên & Mã" name="ten">
                <Input
                  className="rounded-pill border-warning"
                  placeholder="Nhập tên hoặc mã"
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                placeholder="Chọn trạng thái"
                label="Trạng Thái"
                name="trangThai"
              >
                <Select value={selectedValue} onChange={handleChange}>
                  <Select.Option value="0">Còn Bán</Select.Option>
                  <Select.Option value="1">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Số lượng" name="soLuong">
                <Slider defaultValue={100000} min={0} max={100000} step={100} />
              </Form.Item>
            </div>
            <Form.Item className="text-center" style={{ paddingLeft: 200 }}>
              <Button
                type="primary"
                htmlType="reset"
                onClick={loadSanPham}
                icon={<RetweetOutlined />}
              >
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="text-end">
          <button onClick={themSP} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm sản phẩm{" "}
            </span>
          </button>
        </div>
        <div
          className=" bg-light m-2 p-3 pt-2"
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
          }}
        >
          <h5>
            <BookFilled size={30} /> Danh sách sản phẩm
          </h5>
          <hr />
          <div className="ms-3"></div>
          <div className="container-fluid mt-4">
            <div>
              <Table
                className="text-center"
                dataSource={sanPham}
                columns={columns}
                pagination={{
                  showQuickJumper: true,
                  defaultPageSize: 5,
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  total: 100,
                }}
              />
            </div>
          </div>
        </div>
      </div>
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
  );
}
