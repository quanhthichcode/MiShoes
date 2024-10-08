import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Slider,
  Table,
  Space,
  Tag,
  Badge
} from "antd";
import { BookFilled, RetweetOutlined } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { InfoCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import { AddProduct, GetProduct, UpdateApartProduct } from "../../../store/reducer/Product.reducer";
import { AddInvoice, GetInvoice } from "../../../store/reducer/DetailInvoice.reducer";
import { SellAPI } from "../../censor/api/sell/sell.api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { ChiTietSanPhamAPI } from "../api/SanPham/chi_tiet_san_pham.api";
import { v4 as uuid } from "uuid";

const ModalSanPham = (props) => {
  const [form1] = Form.useForm();
  const { openSanPham, setOpenSanPham } = props;
  const activeKey = props.activeKey;
  //const getSoTien = props.getSoTien();
  const ctsp = useSelector(GetProduct);
  const invoice = useSelector(GetInvoice)
  const [chiTietSanPham, setChiTietSanPham] = useState([""]);
  const [CTSP, setCTSPs] = useState([""]);
  const [HDCT, setHDCT] = useState([]);
  const handleClose = () => {
    setOpenSanPham(false);

  };

  const { Option } = Select;

  //Form
  // const [selectedValue, setSelectedValue] = useState("");
  // const handleChange = (value) => {
  //   console.log(`Selected value: ${value}`);
  //   setSelectedValue(value);
  // };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
  
    if (!allValues.tenCT && !allValues.idKT && !allValues.idMS && !allValues.idDC && !allValues.idCL && !allValues.trangThaiCT && !allValues.giaBanCT && !allValues.idDM && !allValues.idH) {
      setCTSPs(chiTietSanPham);
   
    } else {
      timKiemCT(allValues);
    }
  }
  const timKiemCT = (dataSearch) => {
    ChiTietSanPhamAPI.searchCTSPBanHang(dataSearch).then(response => {
      // Update the list of items
      response.data.map((i) => dispatch(AddProduct({ id: i.idCTSP, soLuong: i.soLuong, linkAnh: i.linkAnh, tenSP: i.tenSP, tenKT: i.tenKT, tenMS: i.tenMS, maMS: i.maMS, loaiKM: i.loaiKM, giaTriKhuyenMai: parseInt(i.giaKhuyenMai, 10), giaBan: i.giaBan, tenKM: i.tenKM })))
      setCTSPs(response.data)

    })
      .catch(error => console.error('Error adding item:', error));
  }


  //Load kich thước
  const [kt, setKT] = useState([]);
  useEffect(() => {
    loadKT();
  }, []);
  const loadKT = async () => {
    ChiTietSanPhamAPI.getAllKichThuoc().then(response => {
      setKT(response.data);
    })

  };

  //Load Màu Sắc 
  const [ms, setMS] = useState([]);
  useEffect(() => {
    loadMS();
  }, []);
  const loadMS = async () => {
    ChiTietSanPhamAPI.getAllMauSac().then(response => {
      setMS(response.data);
    })
  };

  //Load Chất Liệu
  const [cl, setCL] = useState([]);
  useEffect(() => {
    loadCL();
  }, []);
  const loadCL = async () => {
    ChiTietSanPhamAPI.getAllChatLieu().then(response => {
      setCL(response.data);
    })
  };

  //Load Độ Cao
  const [dc, setDC] = useState([]);
  useEffect(() => {
    loadDC();
  }, []);
  const loadDC = async () => {
    ChiTietSanPhamAPI.getAllDeGiay().then(response => {
      setCL(response.data);
    })
  };

  //Load Danh Mục
  const [dm, setDM] = useState([]);
  useEffect(() => {
    loadDM();
  }, []);
  const loadDM = async () => {
    ChiTietSanPhamAPI.getAllDanhMuc().then(response => {
      setDM(response.data);
    })
  };

  //Load Hãng
  const [h, setH] = useState([]);
  useEffect(() => {
    loadH();
  }, []);
  const loadH = async () => {
    ChiTietSanPhamAPI.getAllHang().then(response => {
      setH(response.data)
    })
  };


  const dispatch = useDispatch()

  useEffect(() => {
    loadCTSP();
  }, [chiTietSanPham.tenKM, chiTietSanPham.soLuong, openSanPham]);

  useEffect(() => {
    loadHDCTByHD();
  }, [activeKey]);
  const loadCTSP = () => {
    const result = SellAPI.getAllProducts().then((item) => {
      item.data.map((i) => dispatch(AddProduct({ id: i.idCTSP, soLuong: i.soLuong, linkAnh: i.linkAnh, tenSP: i.tenSP, tenKT: i.tenKT, tenMS: i.tenMS, maMS: i.maMS, loaiKM: i.loaiKM, giaTriKhuyenMai: parseInt(i.giaTriKhuyenMai, 10), giaBan: i.giaBan, tenKM: i.tenKM })))
      setChiTietSanPham(item.data);
      setCTSPs(item.data)
    });

  };

  const loadHDCTByHD = async () => {
    const result = await SellAPI.getAllHDCTByHD(activeKey);
    setHDCT(result.data);

  }

  const handleClickAddProduct =  (record) => {
    
    const id = uuid();
    const hdct = [{ id: id, hoaDon: activeKey, chiTietSanPham: record.idCTSP, soLuong: 1, giaSauGiam: (parseFloat(record.giaBan) - parseFloat(record.loaiKM === "Tiền mặt" ? record.giaTriKhuyenMai : (record.giaBan * record.giaTriKhuyenMai / 100))), giaGiam: (parseFloat(record.loaiKM === "Tiền mặt" ? record.giaTriKhuyenMai : (record.giaBan * record.giaTriKhuyenMai / 100))) }]
    dispatch(AddInvoice({ id: id, chiTietSanPham: record.idCTSP, tenSP: record.tenSP, maMS: record.maMS, linkAnh: record.linkAnh, tenKT: record.tenKT, giaBan: record.giaBan, hoaDon: activeKey, tenMS: record.tenMS, giaGiam: (parseFloat(record.loaiKM === "Tiền mặt" ? record.giaTriKhuyenMai : (record.giaBan * record.giaTriKhuyenMai / 100))), giaSauGiam: (parseFloat(record.giaBan) - parseFloat(record.loaiKM === "Tiền mặt" ? record.giaTriKhuyenMai : (record.giaBan * record.giaTriKhuyenMai / 100))), nguoiTao: record.nguoiTao, giaBan: record.giaBan, tenKM: record.tenKM, loaiKM: record.loaiKM, giaTriKhuyenMai: record.giaTriKhuyenMai }));
    dispatch(UpdateApartProduct({ id: record.idCTSP, soLuong: 1 }));
    SellAPI.addInvoice(hdct[0]);
    SellAPI.getAllProducts().then((item) => { setCTSPs(item.data); setChiTietSanPham(item.data); })
    props.getSoTien();
    setOpenSanPham(false);

  };

  const columns = [
    {
      title: "STT",
      dataIndex: "idCTSP",
      key: "idCTSP",
      render: (id, record, index) => {
        ++index;
        return index;
      },
      showSorterTooltip: false,
    },
    {
      title: "Hình ảnh",
      dataIndex: "linkAnh",
      key: "link",
      center: "true",
      render: (link, record) => {
        return (
          <>
            {
              (!record.tenKM) ?
                (
                  <Image
                    cloudName="dtetgawxc"
                    publicId={link}
                    width="100"
                    borderRadius="10"
                    crop="scale"
                    href={link}
                  />) : (
                  <Badge.Ribbon text={record.loaiKM === "Tiền mặt" ? ("-" + `${Intl.NumberFormat("en-US").format(parseInt(record.giaTriKhuyenMai, 10))} VNĐ`) : ("-" + parseInt(record.giaTriKhuyenMai, 10) + "%")} color="red" size="small">
                    <Image
                      cloudName="dtetgawxc"
                      publicId={link}
                      width="100"
                      borderRadius="10"
                      crop="scale"
                      href={link}
                    />
                  </Badge.Ribbon>
                )
            }
          </>
        );
      },
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "tenSP",
      center: "true",
      render: (text, record) => (
        <span>{`${record.tenSP} [${record.tenMS}-${record.tenKT}]`}</span>
      ),
      sorter: (a, b) => a.ma - b.ma,
    },
    {
      title: "Giá Bán",
      dataIndex: "giaSauGiam",
      width: 150,
      render: (text, record) => {
        return (
          <>
            {
              (!record.tenKM) ?
                (
                  <span>{`${Intl.NumberFormat("en-US").format(record.giaBan)} VNĐ`}</span>
                ) :
                (
                  <span style={{ color: "red" }}><del style={{ color: "black" }}>{`${Intl.NumberFormat("en-US").format(record.giaBan)} VNĐ`}</del>
                    <br></br>{`${Intl.NumberFormat("en-US").format(parseFloat(record.giaBan) - parseFloat(record.loaiKM === "Tiền mặt" ? record.giaTriKhuyenMai : (record.giaBan * record.giaTriKhuyenMai / 100)))} VNĐ`}</span>
                )
            }
          </>
        )
      },
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
    },
    {
      title: "Kích thước",
      dataIndex: "tenKT",
    },
    {
      title: "Màu sắc",
      dataIndex: "maMS",
      render: (text, record) => {
        return (
          <>
            <div
              style={{
                backgroundColor: `${record.maMS}`,
                borderRadius: 30,
                width: 25,
                height: 25,
              }}
            ></div>
          </>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag color="red">Còn bán</Tag>
          ) : (
            <Tag color="green">Còn bán</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",

      render: (record) => (
        <Space size="middle">
          <>
            {
              (record.soLuong < 1) ? (
                <button className="btn btn-danger" disabled>
                  Hết hàng
                </button>
              ) : (
                <button className="btn btn-danger" onClick={() => handleClickAddProduct(record)
                }>
                  Chọn
                </button>
              )
            }
          </>
        </Space>
      ),
    },
  ];
  return (
    <Modal
      title="Sản phẩm"
      centered
      open={openSanPham}
      onCancel={handleClose}
      footer={
        <button className="btn btn-primary" onClick={handleClose}>
          Hủy
        </button>
      }

      height={300}
      width={1200}
      zIndex={10000}
      style={{ top: -200 }}
    >
      <div className="container-fluid" style={{ borderRadius: 20 }}>
        <div className="container-fluid">
          <Divider orientation="center" color="#d0aa73">
            <h4 className="text-first pt-1 fw-bold">
              {" "}
              <InfoCircleFilled size={35} /> Quản lý chi tiết sản phẩm
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
            <h5><FilterFilled size={30} /> Bộ lọc</h5>
            <hr />
            <Form
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
            >

              {/* Form tìm kiếm */}
              {/* Các Thuộc Tính Dòng 1 */}
              <div className='row mt-3'>
                {/* Tên & Mã */}
                <div className="col-md-4">
                  <Form.Item label="Tên & Mã" name="tenCT">
                    <Input className="border" />
                  </Form.Item>
                </div>
                {/* Kích Thước */}
                <div className='col-md-4' >
                  <Form.Item label="Kích Thước" name="idKT">
                    <Select placeholder="Chọn một giá trị" >
                      {kt.map(item => (
                        <Option key={item.id} value={item.id}>
                          {item.ten}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* Màu Sắc */}
                <div className='col-md-4'>
                  <Form.Item label="Màu Sắc" name="idMS">
                    <Select placeholder="Chọn một giá trị">
                      {ms.map(item => (
                        <Option key={item.id} value={item.id}>
                          <div style={{
                            backgroundColor: `${item.ma}`,
                            borderRadius: 6,
                            width: 170,
                            height: 25,
                          }}></div >
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>


              {/* Các Thuộc Tính Dòng 2 */}
              <div className='row'>
                {/* Chất Liệu */}
                <div className='col-md-4' >
                  <Form.Item label="Chất Liệu" name="idCL">
                    <Select placeholder="Chọn một giá trị">
                      {cl.map(item => (
                        <Option key={item.id} value={item.id}>
                          {item.ten}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* Độ Cao */}
                <div className='col-md-4'>
                  <Form.Item label="Đế giày" name="idDC">
                    <Select placeholder="Chọn một giá trị">
                      {dc.map(item => (
                        <Option key={item.ma} value={item.id}>
                          {item.ten}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* Danh Mục */}
                <div className='col-md-4'>
                  <Form.Item label="Danh Mục" name="idDM">
                    <Select placeholder="Chọn một giá trị">
                      {dm.map(item => (
                        <Option key={item.id} value={item.id}>
                          {item.ten}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              {/* Các Thuộc Tính Dòng 3 */}
              <div className='row'>
                {/* Hãng */}
                <div className='col-md-4'>
                  <Form.Item label="Hãng" name="idH">
                    <Select placeholder="Chọn một giá trị">
                      {h.map(item => (
                        <Option key={item.id} value={item.id}>
                          {item.ten}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* Trạng Thái */}
                <div className='col-md-4'>
                  <Form.Item label="Trạng thái" name="trangThaiCT">
                    <Select placeholder="Chọn một giá trị" defaultValue="0">
                      <Select.Option value='0'>Còn Bán</Select.Option>
                      <Select.Option value='1'>Dừng Bán</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className='col-md-4'>
                  <Form.Item label="Số lượng" name="soLuongCT">
                    <Slider style={{ width: '200px' }} min={1} />
                  </Form.Item>
                </div>
              </div>
              <div className='col'>
                <Form.Item style={{ marginLeft: 100 }} label="Giá bán" name="giaBanCT">
                  <Slider style={{ width: '430px' }} min={1000000} max={10000000} step={1000000} />
                </Form.Item>
              </div>


              <div className='container-fluid'>
                <Form.Item className='text-center' style={{ paddingLeft: 360 }}>
                  <Button type="primary" htmlType='reset' onClick={loadCTSP} icon={<RetweetOutlined />}>Làm mới</Button>
                </Form.Item>
              </div>

            </Form>
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
              <BookFilled size={30} /> Danh sách chi tiết sản phẩm
            </h5>
            <hr />
            <div className="container-fluid mt-4">
              <div>
                <Table
                  className="text-center"
                  dataSource={CTSP}
                  columns={columns}
                  pagination={{
                    showQuickJumper: true,
                    defaultPageSize: 5,
                    position: ["bottomCenter"],
                    defaultCurrent: 1,
                    total: ctsp.length,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalSanPham;
