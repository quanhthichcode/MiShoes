import {DatePicker,Form,Input,InputNumber,Select,Divider,} from "antd";
import { FaTag } from "react-icons/fa";
import { useEffect, useState } from "react";
import moment from 'moment';
import { IntlProvider } from 'react-intl';
import { useParams } from "react-router-dom";
import TableNguoiDungVoucher from "./tableNguoiDungVoucher";
import { VoucherAPI } from "../api/voucher/voucher.api";

const ModalDetailVoucher=(props)=>{
    const { id } = useParams("");
  const [dataUpdate, setDataUpdate] = useState({});
  const [form2] = Form.useForm();
  const [selectedValue, setSelectedValue] = useState("Tiền mặt");

  
  const handleChange = (value) => {
 
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    detailVoucher()
  },[]);
  
   //lấy ra detail voucher
   const detailVoucher =  () => {
    VoucherAPI.detail(id)
      .then((response) => {

        form2.setFieldsValue({
          id: response.data.id,
          ma: response.data.ma,
          ten: response.data.ten,
          mucDo: response.data.mucDo,
          giamToiDa: response.data.giamToiDa,
          dieuKien: response.data.dieuKien,
          ngayKetThuc: moment(response.data.ngayKetThuc, "YYYY-MM-DD HH:mm:ss"),
          ngayBatDau: moment(response.data.ngayBatDau, "YYYY-MM-DD HH:mm:ss"),
          loaiVoucher: response.data.loaiVoucher,
          soLuong: response.data.soLuong,
        });
        setDataUpdate(response.data);
        setSelectedValue(response.data.loaiVoucher);
      })
      .catch((error) => console.error("Error upfate item:", error));
  };




    return(
        <IntlProvider locale='vi-VN'>
      <div
      className="container-fluid  m-2 p-3 pt-2"
    >
      <div className="row">
        <Divider orientation="center" color="none">
          <h4 className="text-first pt-1 fw-bold">
            <FaTag size={20} />
            Chi tiết phiếu giảm giá
          </h4>
        </Divider>
        <div
          className="bg-light col-md-4"
          
          style={{
            border: "1px solid #ddd",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            marginBottom: 10,
            height: 600,
          }}
        >
          <h4 className="text-center">Thông tin phiếu giảm giá</h4>
          {/* form add voucher */}
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
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              maxWidth: 1600,
            }}
            className="mt-3"
            form={form2}
          >
            <div className="col-md-4">
              <Form.Item
                label="Mã phiếu giảm giá"
    
                name="ma"
                labelCol={{ span:25 }}
                wrapperCol={{ span: 10 }}
              >
                <Input
                  placeholder="Mã giảm giá"
                  className="border-warning"
                 style={{ marginLeft: 10, width:230}}
                />
              </Form.Item>
              <Form.Item
                label="Tên phiếu giảm giá"
                name="ten"
                labelCol={{ span:25 }}
                wrapperCol={{ span: 10 }}
                
              >
                <Input
                  placeholder="Tên phiếu giảm giá"
                  className="border-warning"
                  style={{ marginLeft: 10, width:230}}
                />
              </Form.Item>
              <Form.Item
                label="Loại voucher"
                name="loaiVoucher"
                labelCol={{ span:25 }}
                wrapperCol={{ span: 10 }}
              >
                <Select
                  defaultValue={"Tiền mặt"}
                  style={{ borderColor: "yellow", marginLeft: 50, width: 230 }}
                  onChange={handleChange}
                  
                >
                  <Select.Option value="Tiền mặt">Tiền mặt</Select.Option>
                  <Select.Option value="Phần trăm">Phần trăm</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Số lượng"
                name="soLuong"
                labelCol={{ span:25 }}
                wrapperCol={{ span: 10 }}
              >
                <InputNumber
                  className="border-warning"
                  style={{ marginLeft: 72, width:230}}
                  defaultValue={"1"}
                  min={1}
                />
              </Form.Item>

              <Form.Item
                label="Mức độ"
                labelCol={{ span:25 }}
                wrapperCol={{ span: 10 }}
                name="mucDo"
              >
                {selectedValue === "Tiền mặt" ? (
                  <InputNumber
                    className="border-warning"
                    defaultValue={0}
                    formatter={(value) =>
                      `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                    style={{ marginLeft: 82, width:230}}
                  />
                ) : (
                  <InputNumber
                    className="border-warning"
                    defaultValue={0}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                    style={{ marginLeft: 80 , width:230}}
                  />
                )}
              </Form.Item>
              <Form.Item
                label="Giảm tối đa"
                name="giamToiDa"
                labelCol={{ span:25 }}
                wrapperCol={{ span: 10 }}
                
              >
                <InputNumber
                  className="border-warning"
                  defaultValue={0}
                  formatter={(value) =>
                    `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                  style={{ marginLeft: 57, width:230}}
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item
                label="Điều kiện"
                name="dieuKien"
                labelCol={{ span:25 }}
                wrapperCol={{ span: 10 }}
               
              >
                <InputNumber
                  className="border-warning"
                  defaultValue={0}
                  formatter={(value) =>
                    `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                  style={{ marginLeft: 72, width:230}}
                />
              </Form.Item>
              <Form.Item
                label="Ngày bắt đầu"
                name="ngayBatDau"
                labelCol={{ span:25 }}
                wrapperCol={{ span: 10 }}
                
              >
                <DatePicker
                  showTime
                  style={{ marginLeft: 45, width:230}}
                  className="border-warning"
                  placeholder="Ngày bắt đầu"
                />
              </Form.Item>
              <Form.Item
                label="Ngày kết thúc"
                labelCol={{ span:25 }}
                wrapperCol={{ span: 10 }}
                name="ngayKetThuc"
               
              >
                <DatePicker
                  showTime
                  style={{ marginLeft: 40, width:230}}
                  className="border-warning"
                  placeholder="Ngày kết thúc"
                />
              </Form.Item>
            </div>
            {/* <div className="col-md-4"></div>
<div className="col-md-1"></div> */}
            
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
          <TableNguoiDungVoucher idV={id} />
        </div>
      </div>

    </div>
    </IntlProvider>
    )
}
export default ModalDetailVoucher;