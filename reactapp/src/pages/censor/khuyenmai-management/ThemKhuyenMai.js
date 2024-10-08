import React, { useState, useEffect} from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Divider,
  Modal,
  DatePicker,
  Breadcrumb,
} from "antd";
import "./KhuyenMai.scss";
import {
  HomeOutlined,
} from "@ant-design/icons";
import { BiSolidDiscount } from "react-icons/bi";
import { LuBadgePercent } from "react-icons/lu";
import { toast } from "react-toastify";
import {useNavigate } from 'react-router-dom';
import TableSanPham from "./tableSanPham";
import TableChiTietSanPham from "./tableChiTietSanPham";
import moment from "moment-timezone";
import {PromotionAPI} from "../../censor/api/promotion/promotion.api";


const ThemKhuyenMai = () => {

  const navigate = useNavigate();



  moment.tz.setDefault("America/New_York");


  const onChangeLoai = (value) => {
    
  };

  const [selectedValue, setSelectedValue] = useState("Tiền mặt");
  const handleChange = (value) => {
  
    setSelectedValue(value);
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [idKM, setIDKM] = useState("");

  // Sử dụng form hiện tại
  const [formThemKhuyenMai] = Form.useForm();

  const handleSubmit = (value) => {
  
   PromotionAPI.create(value)
      .then((response) => {
        setIDKM(response.data);
        if (selectedIDCTSP.length > 0){
        Promise.all(
          selectedIDCTSP.map((id) =>
            PromotionAPI.updateProductByPromotion(id,response.data)
            
          )
        );
            }
      
        navigate('/admin-khuyen-mai');
        
        toast("✔️ Thêm thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
   
        loadKhuyenMai();
        setSelectedIDSP("");
        formThemKhuyenMai.resetFields();

      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const [selectedIDSP, setSelectedIDSP] = useState([]);

  const handleSelectedSanPham = (selectedRowKeys) => {
    setSelectedIDSP(selectedRowKeys);
  };
  const [selectedIDCTSP, setSelectedIDCTSP] = useState([]);

  const handleSelectedCTSanPham = (selectedRowKeys) => {
    setSelectedIDCTSP(selectedRowKeys);
  };
  const [khuyenMai, setKhuyenMais] = useState([]);


  useEffect(() => {
    loadKhuyenMai();
  }, []);

  const loadKhuyenMai = async () => {
    const result = await PromotionAPI.getAll().then(response => {setKhuyenMais(response.data);}).catch(error => console.error('Error adding item:',error));
  };

  // Validate ngày
  const validateDateKT = (_, value) => {
    const { getFieldValue } = formThemKhuyenMai;
    const startDate = getFieldValue("ngay_bat_dau");
    if (startDate && value && value.isBefore(startDate)) {
      return Promise.reject("Ngày kết thúc phải sau ngày bắt đầu");
    }
    return Promise.resolve();
  };

  const validateDateBD = (_, value) => {
    const { getFieldValue } = formThemKhuyenMai;
    const endDate = getFieldValue("ngay_ket_thuc");
    if (endDate && value && value.isAfter(endDate)) {
      return Promise.reject("Ngày bắt đầu phải trước ngày kết thúc");
    }

    return Promise.resolve();
  };

  return (
    <div className="container-fuild">
      <div>
      <Breadcrumb
      style={{marginTop: "10px"}}
    items={[
      {
        href: '/admin-ban-hang',
        title: <HomeOutlined />,
      },
      {
        href: 'http://localhost:3000/admin-ban-hang',
        title: (
          <>
            <BiSolidDiscount size={15} style={{paddingBottom:2}}/> 
            <span>Giảm giá</span>
          </>
        ),
      },
      {
        href: 'http://localhost:3000/admin-khuyen-mai',
        title: (
          <>
          <LuBadgePercent size={15} style={{paddingBottom:2}}/> 
          <span>Đợt giảm giá</span>       </> )
      },
      {
        title: 'Thêm đợt giảm giá'
      }
    ]}
  />
        <div className="container-fluid">
          <br />
          <div className="row">
          <Divider orientation="center" color="none">
                <h2 className="text-first pt-1 fw-bold">
                  <LuBadgePercent /> Thêm đợt giảm giá
                </h2>
              </Divider>
            <div
              className="bg-light col-md-4"
              style={{ borderRadius: 20, marginBottom: 10, height: 550 }}
            >
              <Divider orientation="left" color="none">
                <h4 className="text-first pt-1 fw-bold">
                  <LuBadgePercent /> Thông tin đợt giảm giá
                </h4>
              </Divider>
              <Form
                // className=" row col-md-12"
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
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 1600,
                }}
                onFinish={handleSubmit}
                form={formThemKhuyenMai}
              >
                <Form.Item
                  label="Mã Khuyến Mại"
                  style={{ marginLeft: 0, width: 500 }}
                  name="ma"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống mã!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Mã khuyến mại"
                    style={{ marginLeft: 20, width: 220 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Tên Khuyến Mại"
                  style={{ marginLeft: 0, width: 500 }}
                  name="ten"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống tên!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Tên khuyến mại"
                    style={{ marginLeft: 20, width: 220 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Loại"
                  name="loai"
                  style={{ marginLeft: 0, width: 500 }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phương thức!",
                    },
                  ]}
                >
                  <Select
                    value={selectedValue}
                    onChange={handleChange}
                    style={{ marginLeft: 20, width: 220 }}
                  >
                    <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
                    <Select.Option value="Phần trăm">Phần trăm</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Giá trị giảm"
                  name="gia_tri_khuyen_mai"
                  style={{ marginLeft: 0, width: 500 }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá trị giảm !",
                    },
                  ]}
                >
                  {selectedValue === "Tiền mặt" ? (
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      onChange={onChangeLoai}
                      style={{ marginLeft: 20, width: 220 }}
                    />
                  ) : (
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={onChangeLoai}
                      style={{ marginLeft: 20, width: 220 }}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  label="Ngày bắt đầu"
                  name="ngay_bat_dau"
                  style={{ marginLeft: 0, width: 500 }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày bắt đầu!",
                    },
                    { validator: validateDateBD },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ marginLeft: 20, width: 220 }}
                    placeholder="Ngày bắt đầu"
                  />
                </Form.Item>
                <Form.Item
                  label="Ngày kết thúc"
                  name="ngay_ket_thuc"
                  style={{ marginLeft: 0, width: 500 }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn ngày kết thúc!",
                    },
                    { validator: validateDateKT },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ marginLeft: 20, width: 220 }}
                    placeholder="Ngày kết thúc"
                  />
                </Form.Item>

                <div className="text-end" style={{ marginTop: 50 }}>
                  <Form.Item>
                    <Button
                      type="primary"
                      className=" bg-warning rounded-pill"
                      onClick={() => {
                        Modal.confirm({
                          title: "Thông báo",
                          content: "Bạn có chắc chắn muốn thêm không?",
                          onOk: () => {
                            formThemKhuyenMai.submit();
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
                      Thêm
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div className="col" style={{ marginLeft: 20 }}>
              <div className="row bg-light" style={{ borderRadius: 20 }}>
                <div>
                  <p className="fw-bold" style={{ marginTop: 10 }}>
                    Sản phẩm
                  </p>
                </div>
                <TableSanPham onSelectedSanPham={handleSelectedSanPham} />
              </div>
              <div
                className="row bg-light"
                style={{ borderRadius: 20, marginTop: 10, marginBottom: 10 }}
              >
                <div>
                  <p className="fw-bold" style={{ marginTop: 10 }}>
                    Chi Tiết Sản Phẩm
                  </p>
                </div>
                <TableChiTietSanPham
                  selectedIDSPs={selectedIDSP}
                  onSelectedCTSanPham={handleSelectedCTSanPham}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default ThemKhuyenMai;
