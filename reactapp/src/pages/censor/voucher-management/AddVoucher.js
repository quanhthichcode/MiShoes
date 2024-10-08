import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Modal,
  Divider,
} from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { VoucherAPI } from "../api/voucher/voucher.api";
import { NguoiDungVoucherAPI } from "../api/voucher/nguoiDungVoucher.api";
import TableKhachHang from "./tableKhachHang";

const AddVoucher = () => {
  const [selectedValue, setSelectedValue] = useState("Tiền mặt");
  const handleChange = (value) => {
   
    setSelectedValue(value);
  };
  const navigate = useNavigate();

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [form] = Form.useForm();
  const handleSubmit = (value) => {
    if(value.ma==null || value.ma===''){
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      value.ma = characters.charAt(randomIndex);
    }
    }
   
    VoucherAPI.create(value).then((response) => {
      if (selectedIDKH) {
        Promise.all(
          selectedIDKH.map((id) =>
            NguoiDungVoucherAPI.create(id, response.data)
          )
        );
      }
   
      navigate("/admin-voucher");
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
      form.resetFields();
    });
  };

  const [selectedIDKH, setSelectedIDKH] = useState([]);

  const handleSelectedIDKH = (selectedRowKeys) => {
    setSelectedIDKH(selectedRowKeys);
  };
  ///validate ngày
  const validateDateKT = (_, value) => {
    const { getFieldValue } = form;
    const newDate = new Date();
    const startDate = getFieldValue("ngayBatDau");
    if (startDate && value && value.isBefore(startDate)) {
      return Promise.reject("Ngày kết thúc phải sau ngày bắt đầu");
    }
    if (value && value < newDate) {
      return Promise.reject("Ngày kết thúc phải sau ngày hiện tại");
    }
    return Promise.resolve();
  };
  const [checkNgay, setCheckNgay] = useState(false);

  const validateDateBD = (_, value) => {
    const newDate = new Date();
    // if(startDate && value && value.isAfter(moment)){
    //   return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu');
    // }
    const { getFieldValue } = form;
    const endDate = getFieldValue("ngayKetThuc");
    if (endDate && value && value.isAfter(endDate)) {
      return Promise.reject("Ngày bắt đầu phải trước ngày kết thúc");
    }
    if (value && value < newDate) {
      return Promise.reject("Ngày bắt đầu phải sau ngày hiện tại");
    }
    return Promise.resolve();
  };
  const validateDateMa = (_, value) => {
    const { getFieldValue } = form;
    const maVoucher = getFieldValue("ma");
  const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (specialCharacterRegex.test(maVoucher)) {
    return Promise.reject("Mã không được chứa ký tự đặc biệt");
  }
    return Promise.resolve();
  };
  const validateDateTen = (_, value) => {
    const { getFieldValue } = form;
    const tenVoucher = getFieldValue("ten");
    if (!tenVoucher.trim()) {
      return Promise.reject("Tên không được để trống");
    }
  const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (specialCharacterRegex.test(tenVoucher)) {
    return Promise.reject("Tên không được chứa ký tự đặc biệt");
  }
    return Promise.resolve();
  };
  return (
    <div
      className="container-fluid  m-2 p-3 pt-2"
      // style={{
      //   border: "1px solid #ddd", // Border color
      //   boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)", // Box shadow
      //   borderRadius: "8px",
      // }}
    >
      <div className="row">
        <Divider orientation="center" color="none">
          <h4 className="text-first pt-5 fw-bold">
            <FaTag size={20} />
            Thêm phiếu giảm giá
          </h4>
        </Divider>
        <div
          className="bg-light col-md-4"
          style={{
            border: "1px solid #ddd",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            marginBottom: 10,
            height: 700,
          }}
        >
          <h4 className="text-center mt-3 mb-4">Thông tin phiếu giảm giá</h4>
          {/* form add voucher */}
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
                form={form}
              >
                <Form.Item
                  label="Mã phiếu giảm giá"
                  style={{ marginLeft: 0, width: 500 }}
                  name="ma"
                  // hasFeedback
                  rules={[{validator: validateDateMa}]}
                >
                  <Input
                    placeholder="Mã phiếu giảm giá"
                    style={{ marginLeft: 20, width: 220 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Tên phiếu giảm giá"
                  style={{ marginLeft: 0, width: 500 }}
                  name="ten"
                  hasFeedback
                  rules={[{validator: validateDateTen}]}
                >
                  <Input
                    placeholder="Tên phiếu giảm giá"
                    style={{ marginLeft: 20, width: 220 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Loại voucher"
                  name="loaiVoucher"
                  style={{ marginLeft: 0, width: 500 }}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại voucher!",
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
                  label="Số lượng"
                  style={{ marginLeft: 0, width: 500 }}
                  name="soLuong"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống số lượng!",
                    },
                  ]}
                >
                  <Input
                    defaultValue={"1"}
                    min={"1"}
                    style={{ marginLeft: 20, width: 220 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Giá trị giảm"
                  name="mucDo"
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
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      style={{ marginLeft: 20, width: 220 }}
                    />
                  ) : (
                    <InputNumber
                      defaultValue={0}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}%`}
                      parser={(value) => value.replace("%", "")}
                      style={{ marginLeft: 20, width: 220 }}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  label="Giảm tối đa"
                  style={{ marginLeft: 0, width: 500 }}
                  name="giamToiDa"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống giá trị giảm tối đa!",
                    },
                  ]}
                >
                  <InputNumber
                      defaultValue={0}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      style={{ marginLeft: 20, width: 220 }}
                    />
                </Form.Item>
                <Form.Item
                  label="Điều kiện"
                  style={{ marginLeft: 0, width: 500 }}
                  name="dieuKien"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống điều kiện giảm!",
                    },
                  ]}
                >
                  <InputNumber
                      defaultValue={0}
                      formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                      style={{ marginLeft: 20, width: 220 }}
                    />
                </Form.Item>
                <Form.Item
                  label="Ngày bắt đầu"
                  name="ngayBatDau"
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
                  name="ngayKetThuc"
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

                <div className="text-end" style={{ marginTop: 40 }}>
                  <Form.Item>
                    <Button
                      type="primary"
                      className=" bg-warning rounded-pill"
                      onClick={() => {
                        Modal.confirm({
                          title: "Thông báo",
                          content: "Bạn có chắc chắn muốn thêm không?",
                          onOk: () => {
                            form.submit();
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
        <div
          className="bg-light col"
          style={{
            border: "1px solid #ddd",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 15,
          }}
        >
          <p className="fw-bold" style={{ marginTop: 10 }}>
            Khách hàng
          </p>
          <TableKhachHang onSelectedKH={handleSelectedIDKH} />
        </div>
      </div>
    </div>
  );
};
export default AddVoucher;
