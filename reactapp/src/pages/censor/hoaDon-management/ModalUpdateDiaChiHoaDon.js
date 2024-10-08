import {

  Form,
  Input,
  Modal,
  Select,
} from "antd";
import ModalDiaChi from "../khachHang-management/ModalDiaChi";
import { AddressApi } from "../api/address/AddressApi";
import { useEffect, useState } from "react";
import { HoaDonAPI } from "../api/hoaDon/hoaDon.api";
const ModalDiaChiUpdate = (props) => {
  const [form] = Form.useForm();
  const { openDiaChiUpdate, setOpenDiaChiUpdate } = props;
    const idHD = props.idHD;
      const [listProvince, setListProvince] = useState([]);
      const [listDistricts, setListDistricts] = useState([]);
      const [listWard, setListWard] = useState([]);
       const [diaChiHoaDon, setdiaChiHoaDon] = useState([]);


       
    useEffect(() => {
      // form.setFieldsValue({ idNguoiDung: idKH });
      loadUpdateHoaDon();
      loadDataProvince();
    }, []);
      console.log('idhD',idHD);
            console.log("idhD", diaChiHoaDon);
         const loadUpdateHoaDon= () => {
           HoaDonAPI.detailUpdateHoaDon(idHD).then((res) => {
             setdiaChiHoaDon(res.data);
          
           });
         };
  const handleClose = () => {
    setOpenDiaChiUpdate(false);
  };
  const handleSubmit = (value) => {
    
  };
    const loadDataProvince = () => {
      AddressApi.fetchAllProvince().then((res) => {
        setListProvince(res.data.data);
      });
    };

    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);

    const handleProvinceChange = (value, valueProvince) => {
      form.setFieldsValue({ provinceId: valueProvince.valueProvince });
      AddressApi.fetchAllProvinceDistricts(valueProvince.valueProvince).then(
        (res) => {
          setListDistricts(res.data.data);
        }
      );
      setProvince(valueProvince);
    };

    const handleDistrictChange = (value, valueDistrict) => {
      form.setFieldsValue({ toDistrictId: valueDistrict.valueDistrict });
      AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then(
        (res) => {
          setListWard(res.data.data);
        }
      );
      setDistrict(valueDistrict);
    };

    const handleWardChange = (value, valueWard) => {
      form.setFieldsValue({ wardCode: valueWard.valueWard });
      setWard(valueWard);
    };

  return (
    <Modal
      title="Update địa chỉ"
      centered
      open={openDiaChiUpdate}
      onCancel={handleClose}
      // onOk={}
      height={300}
      width={1000}
      zIndex={2}
      style={{ top: -200 }}
    >
      <Form
        form={form}
        initialValues={diaChiHoaDon}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <div className="row">
          <div className="col">
            <Form.Item
              name="tenNguoiNhan"
              label="Họ và tên"
              tooltip="Họ tên đầy đủ của bạn là gì?"
              rules={[
                {
                  required: true,
                  message: "Vui lòng hãy nhập họ và tên.",
                  whitespace: true,
                },
                {
                  pattern: /^[A-Za-zÀ-Ỹà-ỹ\s]+$/,
                  message: "Họ và tên chỉ được phép chứa chữ cái.",
                },
              ]}
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Input
                onKeyPress={(e) => {
                  if (e.key === " " && e.target.selectionStart === 0) {
                    e.preventDefault();
                  }
                }}
                // style={{ textAlign: "center" }}
              />
            </Form.Item>
          </div>
          <div className="col">
            <Form.Item
              name="sdt"
              label="Số điện thoại"
              tooltip="Số điện thoại của bạn là gì?"
              rules={[
                {
                  required: true,
                  message: "Vui lòng hãy nhập số điện thoại.",
                  whitespace: true,
                },
                {
                  pattern: /^0\d{9}$/,
                  message: "Vui lòng nhập số điện thoại hợp lệ.",
                },
              ]}
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <Form.Item
              name="tenThanhPho"
              label="Tỉnh/Thành phố"
              tooltip="Tỉnh/Thành phố của bạn là gì?"
              rules={[
                {
                  required: true,
                  message: "Vui lòng hãy chọn Tỉnh/Thành phố.",
                  whitespace: true,
                },
              ]}
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Select defaultValue={""} onChange={handleProvinceChange}>
                <Select.Option value="">--Chọn Tỉnh/Thành phố--</Select.Option>
                {listProvince?.map((item) => {
                  return (
                    <Select.Option
                      key={item.ProvinceID}
                      value={item.ProvinceName}
                      valueProvince={item.ProvinceID}
                    >
                      {item.ProvinceName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-4">
            {" "}
            <Form.Item
              name="tenHuyen"
              label="Quận/Huyện"
              tooltip="Quận/Huyện của bạn là gì?"
              rules={[
                {
                  required: true,
                  message: "Vui lòng hãy chọn Quận/Huyện.",
                  whitespace: true,
                },
              ]}
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Select defaultValue={""} onChange={handleDistrictChange}>
                <Select.Option value="">--Chọn Quận/Huyện--</Select.Option>
                {listDistricts?.map((item) => {
                  return (
                    <Select.Option
                      key={item.DistrictID}
                      value={item.DistrictName}
                      valueDistrict={item.DistrictID}
                    >
                      {item.DistrictName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              name="tenXa"
              label="Xã/Phường"
              tooltip="Xã/Phường của bạn là gì?"
              rules={[
                {
                  required: true,
                  message: "Vui lòng hãy chọn Xã/Phường.",
                  whitespace: true,
                },
              ]}
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Select defaultValue={""} onChange={handleWardChange}>
                <Select.Option value="">--Chọn Xã/Phường--</Select.Option>
                {listWard?.map((item) => {
                  return (
                    <Select.Option
                      key={item.WardCode}
                      value={item.WardName}
                      valueWard={item.WardCode}
                    >
                      {item.DistrictName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Form.Item
              name="diaChi"
              label="Số nhà"
              tooltip="Số nhà của bạn là gì?"
              rules={[
                {
                  required: true,
                  message: "Vui lòng hãy nhập số nhà.",
                  whitespace: true,
                },
              ]}
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col">
            {" "}
            <Form.Item
              name="ghiChu"
              label="Ghi chú"
              tooltip="Họ tên đầy đủ của bạn là gì?"
              // labelCol={{ span: 9 }}
              // wrapperCol={{ span: 15 }}
            >
              <Input
                onKeyPress={(e) => {
                  if (e.key === " " && e.target.selectionStart === 0) {
                    e.preventDefault();
                  }
                }}
                // style={{ textAlign: "center" }}
              />
            </Form.Item>
          </div>
        </div>
      </Form>

      <div>
        <p>Thời gian dự kiến giao hàng là : 23-12-2024</p>
        <p> Phí giao hàng là 34.000 đ</p>
      </div>
    </Modal>
  );
};
export default ModalDiaChiUpdate;
