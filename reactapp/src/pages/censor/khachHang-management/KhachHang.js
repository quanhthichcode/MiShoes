import React, { useState, useEffect } from "react";
import {Button,Form,Input,Divider,Select,Space,Table,Tag,Image,} from "antd";
import { SiMicrosoftexcel } from "react-icons/si";
import { FilterFilled } from "@ant-design/icons";
import { BsFillEyeFill, BsPencilSquare } from "react-icons/bs";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { BiSolidUserBadge } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import ModalDiaChi from "./ModalDiaChi";
import * as XLSX from 'xlsx';
import { Link, useNavigate } from "react-router-dom";
import { KhachHangAPI } from "../api/user/khachHang.api";
export default function KhachHang() {
  const [componentSize, setComponentSize] = useState("default");
     const nav = useNavigate();
     const themKH = (res) => {
       console.log(res);

       nav("/admin-them-khach-hang");
     };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [openModalDiaChi, setOpenModalDiaChi] = useState(false);
 
  
  const [form] = Form.useForm();
//load khach hang
  useEffect(() => {
    loadKhachHang();
  }, []);
  const [khachHang, setKhachHang] = useState([]);
  const loadKhachHang =  () => {
      KhachHangAPI.getAll()
      .then((res)=>{
        setKhachHang(res.data);
          
      })
  };

  //Tìm khách hàng
  const onChangeFilter = (changedValues, allValues) => {
  
    timKiemKH(allValues);
  }
  const timKiemKH = (dataSearch) => {
    KhachHangAPI.timKiem(dataSearch)
    .then((res)=>{
      setKhachHang(res.data);
       
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
      title: "Mã KH",
      dataIndex: "maND",
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Tên KH",
      dataIndex: "tenND",
      sorter: (a, b) => a.ten - b.ten,
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   sorter: (a, b) => a.email - b.email,
    // },
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
            new Date(ngaySinh * 1).toLocaleDateString()

          }
        </>
      ),
      sorter: (a, b) => a.ngaySinh - b.ngaySinh,

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
      title: "Hành động",
      key: "action",
      dataIndex: 'idND',
      render: (record) => (
        <Space size="middle">
          <Link to={`/admin-detail-khach-hang/${record}`} className='btn btn-success'><BsFillEyeFill /></Link>
          <Link to={`/admin-update-khach-hang/${record}`} className='btn btn-danger'  ><BsPencilSquare /></Link>
          <Button style={{ width: 41, height: 37.6, backgroundColor: "#35afb1", color: "white" }} className='btn ' type="primary" onClick={()=>detailDiaChi(record)}>
            <GrMapLocation />
          </Button>
       

        </Space>
      ),
      center: "true",
    },
  ];
  const [idKH,setIdKH]=useState("");
  const detailDiaChi = (row) => {
 
    setIdKH(row);
    setOpenModalDiaChi(true);
  }
  // const [open, setOpen] = useState(false);

  const [bordered] = useState(false);
  const [size] = useState("large");
  const [expandable] = useState(undefined);
  const [showHeader] = useState(true);
  const [hasData] = useState(true);
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

  // xuất excel

  // const reSult=[];
  const exportToExcel = () => {
    let result = [];
    if (khachHang && khachHang.length > 0) {
      // result.push(["Danh sách khách hàng", "", "", "", "", "", "", ""]); 
      result.push(["STT", "Ảnh", "Mã khách hàng", "Tên KH", "Chứng minh thư", "SDT", "Ngày sinh", "Trạng thái"]);
      khachHang.map((item, index) => {
        let arr = [];
        arr[0] = index + 1;
        arr[1] = item.anh;
        arr[2] = item.maND;
        arr[3] = item.tenND;
        arr[4] = item.cccd;
        arr[5] = item.sdt;
        arr[6] = new Date(item.ngaySinh * 1).toLocaleDateString();
        arr[7] = item.trangThai == 0 ? "Hoạt động" : "Ngừng hoạt động";
        result.push(arr);
      })
    }
   
    const wb = XLSX.utils.book_new("Danh sách khách hàng");
    const ws = XLSX.utils.json_to_sheet(result);
    ws['!cols'] = [{ wpx: 40 }, { wpx: 100 }, { wpx: 120 }, { wpx: 150 }, { wpx: 150 }, { wpx: 120 }, { wpx: 120 }, { wpx: 150 }];
    ws['!rows'] = [{ hpx: 40 , fs:30 ,}];
   
    ws['A1'].s = { font: { size: 32, color: { rgb: '#FF0000' } }, alignment: { horizontal: 'center', vertical: 'center' } };
      ws['A1'].v='Danh sách khách hàng';
      // ws['A2'].v='';
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }];
  
    XLSX.utils.book_append_sheet(wb, ws, 'DanhSachKhachHang');
    XLSX.writeFile(wb, 'DanhSachKhachHang.xlsx');
    toast("✔️ Xuất excel thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   
  };
  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <Divider orientation="center" color="none">
          <h2 className="text-first pt-1 fw-bold">
            <BiSolidUserBadge /> Quản lý khách hàng
          </h2>
        </Divider>

        {/* form tìm kiếm */}
        <div
          className=" bg-light  p-3 pt-2"
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
            className="d-flex justify-content-center align-items-center"
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
            <div className="col-md-5 me-5">
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
            <Button type="primary" htmlType="reset" onClick={loadKhachHang}>
              Làm mới
            </Button>
          </Form.Item>
        </div>
        {/* hết form tìm kiếm */}
        {/* view add nhân viên */}
        <div className=" text-end mt-3">
          <button onClick={themKH} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm khách hàng
            </span>
          </button>
          <button onClick={exportToExcel} class="button-excel btn-success">
            <span class="text">
              <SiMicrosoftexcel />
              Export Excel
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
            columns={tableColumns}
            dataSource={hasData ? khachHang : []}
            scroll={scroll}
          />
        </div>
        {idKH && (
          <ModalDiaChi
            openModalDiaChi={openModalDiaChi}
            setOpenModalDiaChi={setOpenModalDiaChi}
            idKH={idKH}
            setIdKH={setIdKH}
          />
        )}
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
