import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  DatePicker,
  Divider,
  Modal,
  Breadcrumb,
} from "antd";
import "./KhuyenMai.scss";
import { HomeOutlined } from "@ant-design/icons";
import { BiSolidDiscount } from "react-icons/bi";

import { LuBadgePercent } from "react-icons/lu";
import { toast } from "react-toastify";
import TableSanPham from "./tableSanPham";
import TableChiTietSanPham from "./tableChiTietSanPham";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { PromotionAPI } from "../../censor/api/promotion/promotion.api";
import { SellAPI } from "../../censor/api/sell/sell.api";
const SuaKhuyenMai = () => {
  const navigate = useNavigate();

  const { id } = useParams("");

  const [CTSP, setCTSP] = useState([]);
  const [idSP, setIDSP] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [formSuaKhuyenMai] = Form.useForm();
  const [dataCTSP, setDataCTSP] = useState([]);

  const loadDataCTSP = async () => {
    const result = await SellAPI.getAllProducts();
    setDataCTSP(result.data);
  };
  const loadDetailKhuyenMai = async () => {
    // Lấy ra chi tiết khuyến mại
    await PromotionAPI.detail(id)
      .then((response) => {
        formSuaKhuyenMai.setFieldsValue({
          id: response.data.id,
          ma: response.data.ma,
          loai: response.data.loai,
          ten: response.data.ten,
          gia_tri_khuyen_mai: response.data.gia_tri_khuyen_mai,
          trang_thai: response.data.trang_thai,
          ngay_bat_dau: dayjs(
            response.data.ngay_bat_dau,
            "YYYY-MM-DD HH:mm:ss"
          ).locale("vi"),
          ngay_ket_thuc: dayjs(
            response.data.ngay_ket_thuc,
            "YYYY-MM-DD HH:mm:ss"
          ).locale("vi"),
        });
      
        setDataUpdate(response.data); // set cho DataUpdate
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const loadCTSP = async () => {
    const x = await PromotionAPI.showProductByPromotion(id);

    setCTSP(x.data);
    const SP = await Promise.all(
      x.data.map((idCTSP) => PromotionAPI.showSPByProduct(idCTSP))
    );
    SP.map((res) =>
      setIDSP((prevData) =>
        res.data.includes(prevData)
          ? console.log("trùng:", prevData)
          : [...prevData, ...res.data]
      )
    );
  };

  useEffect(() => {
    loadDetailKhuyenMai();
    loadCTSP();
    loadDataCTSP();
  }, []);

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

  const [khuyenMai, setKhuyenMais] = useState([]);

  useEffect(() => {
    loadKhuyenMai();
  }, []);

  const loadKhuyenMai = async () => {
    const result = await PromotionAPI.getAll()
      .then((response) => {
        setKhuyenMais(response.data);
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const handleSubmit = (value) => {
  
    PromotionAPI.update(id, value)
      .then((response) => {
        setIDKM(response.data);
        if (new Date() > new Date(value.ngay_ket_thuc)){
          Promise.all(
            dataCTSP.map((data) => PromotionAPI.deletePromotion(data.idCTSP))
          )
        } else {
        if (selectedIDCTSP.length > 0) {
        
          Promise.all(
            dataCTSP.map((data) => selectedIDCTSP.filter(item => item===data.idCTSP).length > 0 ? 
            PromotionAPI.updateProductByPromotion(data.idCTSP, response.data) :  dataCTSP.map((data) => PromotionAPI.deletePromotion(data.idCTSP))
            )
            // selectedIDCTSP.map((id) =>
            //   PromotionAPI.updateProductByPromotion(id, response.data)
            // )
          );
        } else {
          Promise.all(
            dataCTSP.map((data) => PromotionAPI.deletePromotion(data.idCTSP))
          );
        }
      }
        loadKhuyenMai();
        navigate("/admin-khuyen-mai");

        toast("✔️ Sửa thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setSelectedIDSP("");
        formSuaKhuyenMai.resetFields();
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

  // Validate ngày
  const validateDateKT = (_, value) => {
    const { getFieldValue } = formSuaKhuyenMai;
    const startDate = getFieldValue("ngay_bat_dau");
    if (startDate && value && value.isBefore(startDate)) {
      return Promise.reject("Ngày kết thúc phải sau ngày bắt đầu");
    }
    return Promise.resolve();
  };

  const validateDateBD = (_, value) => {
    const { getFieldValue } = formSuaKhuyenMai;
    const endDate = getFieldValue("ngay_ket_thuc");
    if (endDate && value && value.isAfter(endDate)) {
      return Promise.reject("Ngày bắt đầu phải trước ngày kết thúc");
    }

    return Promise.resolve();
  };

  return (
    <div className="container">
      <div>
        <Breadcrumb
          style={{ marginTop: "10px" }}
          items={[
            {
              href: "/admin-ban-hang",
              title: <HomeOutlined />,
            },
            {
              href: "http://localhost:3000/admin-ban-hang",
              title: (
                <>
                  <BiSolidDiscount size={15} style={{ paddingBottom: 2 }} />
                  <span>Giảm giá</span>
                </>
              ),
            },
            {
              href: "http://localhost:3000/admin-khuyen-mai",
              title: (
                <>
                  <LuBadgePercent size={15} style={{ paddingBottom: 2 }} />
                  <span>Đợt giảm giá</span>{" "}
                </>
              ),
            },
            {
              title: `Sửa đợt giảm giá ${dataUpdate.ma} - ${dataUpdate.ten}`,
            },
          ]}
        />
        <div className="container-fluid">
          <Divider orientation="center" color="none">
            <h2 className="text-first pt-1 fw-bold">
              <LuBadgePercent /> Thông tin chi tiết đợt giảm giá
            </h2>
          </Divider>
          <br />
          <div className="row">
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
                form={formSuaKhuyenMai}
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
                    // value={dataUpdate.ma}
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
                    // value={dataUpdate.ten}
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
                    onChange={handleChange}
                    style={{ marginLeft: 20, width: 220 }}
                    // value={dataUpdate.loai}
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
                      message: "Vui lòng nhập giá trị giảm tối đa!",
                    },
                  ]}
                >
                  {dataUpdate.loai === "Tiền mặt" ||
                  dataUpdate.loai === "Tiền Mặt" ? (
                    <InputNumber
                      // defaultValue={0}
                      // value={dataUpdate.khuyen_mai_toi_da}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      onChange={onChangeLoai}
                      style={{ marginLeft: 20, width: 220 }}
                    />
                  ) : (
                    <InputNumber
                      // defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      onChange={onChangeLoai}
                      style={{ marginLeft: 20, width: 220 }}
                      // value={dataUpdate.khuyen_mai_toi_da}
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
                    style={{ marginLeft: 20, width: 220 }}
                    placeholder="Ngày bắt đầu"
                    format={"YYYY-MM-DD HH:mm:ss"}
                    // value={moment(
                    //   dataUpdate.ngay_bat_dau,
                    //   "YYYY-MM-DD HH:mm:ss"
                    // )}
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
                    style={{ marginLeft: 20, width: 220 }}
                    placeholder="Ngày kết thúc"
                    format={"YYYY-MM-DD HH:mm:ss"}
                    // value={moment(
                    //   dataUpdate.ngay_ket_thuc,
                    //   "YYYY-MM-DD HH:mm:ss"
                    // )}
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
                          content: "Bạn có chắc chắn muốn sửa không?",
                          onOk: () => {
                            formSuaKhuyenMai.submit();
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
                      Sửa
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
                <TableSanPham
                  onSelectedSanPham={handleSelectedSanPham}
                  suaIDSP={idSP}
                />
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
                  suaIDCTSP={CTSP}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuaKhuyenMai;
