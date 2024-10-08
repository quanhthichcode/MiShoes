import React, { useState, useEffect } from "react";
import {Button,Form,Input,Divider,Select,Space,Table,Tag,Image} from "antd";
import { FilterFilled } from "@ant-design/icons";
import { BsFillEyeFill, BsPencilSquare } from "react-icons/bs";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import { BiSolidUserBadge } from "react-icons/bi";
import { NhanVienAPI } from "../api/user/nhanVien.api";
import './nhanvien.css';
import { Link, useNavigate } from "react-router-dom";
export default function NhanVien() {
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
   const nav = useNavigate();
   const themNV = (res) => {
     console.log(res);

     nav("/admin-them-nhan-vien");
   };
  const [form] = Form.useForm();
// load nhan vien
  useEffect(() => {
    loadNhanVien();
  }, []);
  const [nhanVien, setNhanVien] = useState([]);
  const loadNhanVien = () => {
     NhanVienAPI.getAll()
    .then((res)=>{
      setNhanVien(res.data);
       
    })
  };
  

  //Tìm nhân viên
  const onChangeFilter = (changedValues, allValues) => {
    timKiemNV(allValues);
  }
  const timKiemNV = (dataSearch) => {
    NhanVienAPI.timKiem(dataSearch)
    .then((res)=>{
      setNhanVien(res.data);
       
    })
  }

  const columns = [
    {
      title: "#",
      dataIndex: "idND",
      key: "idND",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSortTooltip: false,
    },
    {
      title: " Ảnh",
      dataIndex: "anh",
      key: "anh",
      align: "center",
      render: (text) => (
        <Image
          width={100}
          height={100}
          style={{ borderRadius: "15px" }}
          src={text}
        />
      ),
    },
    {
      title: "Mã Nhân Viên",
      dataIndex: "maND",
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Tên Nhân Viên",
      dataIndex: "tenND",
      sorter: (a, b) => a.ten - b.ten,
    },
    {
      title: "CCCD",
      dataIndex: "cccd",
      sorter: (a, b) => a.cccd - b.cccd,
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      sorter: (a, b) => a.SDT - b.SDT,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      render: (ngaySinh) => (
       <>
       {
        new Date(ngaySinh*1).toLocaleDateString()
  
       }
       </>
        ),
      sorter: (a, b) => a.ngaySinh - b.ngaySinh,
      //render: (_, record) => <ConvertLongToDate long={record.ngaySinh} />,
    },
  
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai == 1 ? (
            <Tag color="red">
              Không hoạt động
            </Tag>
          ) : (
            <Tag color="green">
              Hoạt động
            </Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "Hoạt động",
          value: "0",
        },
        {
          text: "Không Hoạt động",
          value: "1",
        },
      ],
      onFilter: (value, record) => record.trangThai.toString() === value,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: 'idND',
      
      render: (title) => (
        <Space size="middle">
          <Link to={`/admin-detail-nhan-vien/${title}`} className='btn btn-success'><BsFillEyeFill /></Link>
          <Link to={`/admin-update-nhan-vien/${title}`} className='btn btn-danger'><BsPencilSquare /></Link>
        </Space>
      ),
      center: "true",
    },
  ];

  const [bordered] = useState(false);
  const [size] = useState("large");
  const [expandable] = useState(undefined);
  const [showHeader] = useState(true);
  const [tableLayout] = useState();
  const [top] = useState("none");
  const [bottom] = useState("bottomCenter");
  const [ellipsis] = useState(false);
  const [yScroll] = useState(false);
  const [xScroll] = useState();

  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }
  const tableProps = {
    bordered,
    size,
    expandable,
    showHeader,
    scroll,
    tableLayout,
  };

  return (
    <div className="container-fuild">
      <div className="container-fluid">
        <Divider orientation="center" color="none">
          <h2 className="text-first pt-1 fw-bold">
            <BiSolidUserBadge /> Quản lý nhân viên
          </h2>
        </Divider>

        {/* form tìm kiếm */}
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
              span: 8,
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
            // style={{
            //   maxWidth: 1400,
            // }}
            form={form}
          >
            <div className="col-md-5">
              <Form.Item label="Tìm kiếm" name="ten">
                <Input
                  className="rounded-pill border-warning"
                  placeholder="Nhập mã hoặc tên hoặc sđt ..."
                />
              </Form.Item>
            </div>
            <div className="col-md-5">
              <Form.Item label="Trạng thái" name="trangThai">
                <Select
                  defaultValue={"Tất cả"}
                  style={{ borderColor: "yellow" }}
                >
                  <Select.Option value="0">Hoạt động</Select.Option>
                  <Select.Option value="1">Không hoạt động</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Form>
          <Form.Item className="text-center ">
            <Button type="primary" htmlType="reset" onClick={loadNhanVien}>
              Làm mới
            </Button>
          </Form.Item>
        </div>
        {/* hết form tìm kiếm */}
        {/* view add nhân viên */}
        <div className=" text-end mt-3">
       
          <button onClick={themNV} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm nhân viên
            </span>
          </button>
        </div>
      </div>
      <div className="container-fluid mt-4">
        <div>
          <Table
            {...tableProps}
            pagination={{
              showQuickJumper: true,
              position: [top, bottom],
              defaultPageSize: 5,
              defaultCurrent: 1,
              total: 100,
            }}
            columns={columns}
            dataSource={nhanVien}
            scroll={scroll}
          />
        </div>{" "}
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
    </div>
  );
}
