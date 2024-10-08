import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Modal
} from "antd";
import "./voucher.scss";
import { PlayCircleOutlined,PauseCircleOutlined } from "@ant-design/icons";
import { FilterFilled, UnorderedListOutlined } from "@ant-design/icons";
import { BsPencilSquare } from "react-icons/bs";
import moment from "moment";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { VoucherAPI } from "../api/voucher/voucher.api";
import { BsFillEyeFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { FaTag } from "react-icons/fa";

const Voucher = () => {
  const currentTime = moment();
  const [dataSearch, setDataSearch] = useState({});
  const [voucher, setVouchers] = useState([]);
  const onChangeFilter = (changedValues, allValues) => {
    timKiemVoucher(allValues);
    setDataSearch(allValues);
  };


     const nav = useNavigate();
     const themVoucher = (res) => {
       console.log(res);

       nav("/admin-add-voucher");
     };
  //call api tìm kiếm
  const timKiemVoucher = (dataSearch) => {
    VoucherAPI.search(dataSearch)
      .then((response) => {
        setVouchers(response.data);   
      }).catch((error) => console.error("Error adding item:", error));
  };

  const loadVoucher = async () => {
    await VoucherAPI.getAll()
      .then((response) => {
        // Update the list of items
        
        setVouchers(response.data); 
      }).catch((error) => console.error("Error adding item:", error));
  };

  useEffect(() => {
    loadVoucher();
  }, []);

  useEffect(() => {
    if (!dataSearch.ten && !dataSearch.loaivoucher && !dataSearch.trangThai && !dataSearch.ngayBatDau && !dataSearch.ngayKetThuc){
      loadVoucher();
    }
  }, [voucher]);

  const [componentSize, setComponentSize] = useState("default");

  const [form] = Form.useForm();


  const updateTrangThaiTamDung =  (id, value) => {
     VoucherAPI.updateTTTamDung(id, value).then((response) => {
      loadVoucher();
        toast("✔️ Cập nhật thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      
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
      title: "Mã ",
      dataIndex: "ma",
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Tên ",
      dataIndex: "ten",
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Loại ",
      dataIndex: "loaiVoucher",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "ngayBatDau",
      render: (ngayBatDau) => <>{moment(ngayBatDau).format("DD/MM/YYYY , HH:mm:ss")}</>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "ngayKetThuc",
      render: (ngayKetThuc) => <>{moment(ngayKetThuc).format("DD/MM/YYYY , HH:mm:ss")}</>,
      sorter: (a, b) => a.ngayKetThuc - b.ngayKetThuc,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trangThai) => (
        <>
          {trangThai === "SAP_DIEN_RA" ? (
            <Tag color="yellow">Sắp hoạt động</Tag>
          ) : trangThai === "DANG_HOAT_DONG" ? (
            <Tag color="green">Hoạt động</Tag>
          ) : trangThai === "TAM_DUNG" ? (
            <Tag color="lime">Tạm dừng</Tag>
          ) : (
            <Tag color="red">Ngừng hoạt động</Tag>
          )}
        </>
      ),
      //   filters: [
      //     {
      //         text: 'Hoạt động',
      //         value: '0',
      //     },
      //     {
      //         text: 'Ngừng hoạt động',
      //         value: '1',
      //     },

      // ],
      // onFilter: (value, record) => record.trangThai.indexOf(value) === 0,
    },
    {
      title: "Hành động",
      key: "action",
      sorter: true,
      render: (record) => (
        <Space size="middle">
          <a>
            <Link to={`/admin-detail-voucher/${record.id}`} className="btn btn-danger">
            <BsFillEyeFill size={20} />
            </Link>
          </a>
          <a>
            <Link to={`/admin-update-voucher/${record.id}`} className="btn">
              <BsPencilSquare
                style={{
                  fontSize: 30,
                  backgroundColor: "#ffff00",
                }}
              />
            </Link>
          </a>
          <>
            {new Date(record.ngayKetThuc) > currentTime ? (
              record.trangThai === "TAM_DUNG" ? (
                <a
                  className="btn rounded-pill"
                  //onClick={() =>updateTrangThai1(record.id,record)}
                  onClick={() => {
                    Modal.confirm({
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn sửa không?",
                      onOk: () => {
                        VoucherAPI.updateTTHD(record.id, record);
                        // form.finish();
                      },
                      footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn />
                        </>
                      ),
                    });
                  }}
                >
                  <PlayCircleOutlined
                    style={{
                      fontSize: 30,
                      backgroundColor: "#ffff00",
                      borderRadius: 90,
                    }}
                  />
                </a>
              ) : (
                <a
                  className="btn rounded-pill"
                  onClick={() => {
                    Modal.confirm({
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn sửa không?",
                      onOk: () => {
                        updateTrangThaiTamDung(record.id, record)
                      },
                      footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn />
                        </>
                      ),
                    });
                  }}
                >
                  <PauseCircleOutlined
                    style={{
                      fontSize: 30,
                      backgroundColor: "#ffff00",
                      borderRadius: 90,
                    }}
                  />
                </a>
              )
            ) : (
              <a className="btn rounded-pill" disabled>
                <PlayCircleOutlined
                  style={{
                    fontSize: 30,
                    backgroundColor: "#ffff00",
                    borderRadius: 90,
                  }}
                />
              </a>
            )}
          </>
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


  
  //hiển thị số lượng
  const [gioiHan, setGioiHan] = useState(false);
  const handleChangeSwitch = (value) => {
    setGioiHan(value);
  };

  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            {" "}
            <FaTag size={20} />
            Quản lý phiếu giảm giá
          </h4>
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
            style={{
              maxWidth: 1400,
            }}
            form={form}
          >
            <div className="col-md-4">
              <Form.Item label="Tìm kiếm" name="ten">
                <Input
                  className="rounded-pill border-warning"
                  placeholder="Nhập mã hoặc tên hoặc mức độ giảm giá"
                />
              </Form.Item>
              <Form.Item label="Loại voucher" name="loaiVoucher">
                <Select
                  defaultValue={"Tất cả"}
                  status="warning"
                  className="rounded-pill border-warning"
                  style={{ borderRadius: "30px" }}
                >
                  <Select.Option style={{ borderRadius: "30px" }} value="">
                    Tất cả
                  </Select.Option>
                  <Select.Option
                    style={{ borderRadius: "30px" }}
                    value="Tiền mặt"
                  >
                    Tiền mặt
                  </Select.Option>
                  <Select.Option
                    style={{ borderRadius: "30px" }}
                    value="Phần trăm"
                  >
                    Phần trăm
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item label="Trạng thái" name="trangThai">
                <Select
                  defaultValue={"Tất cả"}
                  status="warning"
                  style={{ borderColor: "yellow" }}
                >
                  <Select.Option style={{ borderRadius: "30px" }} value="">
                    Tất cả
                  </Select.Option>
                  <Select.Option value="SAP_DIEN_RA">Sắp diễn ra</Select.Option>
                  <Select.Option value="DANG_HOAT_DONG">
                    Hoạt động
                  </Select.Option>
                  <Select.Option value="NGUNG_HOAT_DONG">
                    Ngừng hoạt động
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Ngày bắt đầu" name="ngayBatDau">
                <DatePicker
                  className="rounded-pill border-warning"
                  placeholder="Ngày bắt đầu"
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
              <Form.Item label="Ngày kết thúc" name="ngayKetThuc">
                <DatePicker
                  className="rounded-pill border-warning"
                  placeholder="Ngày kết thúc"
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </div>

            <Form.Item className="text-end ">
              <Button type="primary" htmlType="reset" onClick={loadVoucher}>
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* hết form tìm kiếm */}
        {/* view add voucher */}
        <div className=" text-end mt-3 mb-4">
      

          <button onClick={themVoucher} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm
            </span>
          </button>
        </div>
        {/* view table voucher */}
        <div
          style={{
            border: "1px solid #ddd", // Border color
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // Box shadow
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <div className="text-start fw-bold">
            <p>
              <UnorderedListOutlined size={30} /> Danh sách phiếu giảm giá{" "}
            </p>
          </div>
          <>
            <Table
              // {...tableProps}
              pagination={{
                showQuickJumper: true,
                position: [top, bottom],
                defaultPageSize: 5,
                defaultCurrent: 1,
                total: 100,
              }}
              columns={tableColumns}
              dataSource={voucher}
              scroll={scroll}
            />
          </>
        </div>
        {/* hết table voucher */}

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

    ////VIEW UPDATE VOUCHER
  );
};
export default Voucher;
