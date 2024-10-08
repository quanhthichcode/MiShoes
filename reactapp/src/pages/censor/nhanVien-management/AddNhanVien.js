import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { FaMoneyBills } from "react-icons/fa6";
import UpLoadImage from "./UploadAnh";
import { AddressApi } from "../api/address/AddressApi";
import { Link, useNavigate } from "react-router-dom";
import { NhanVienAPI } from "../api/user/nhanVien.api";
import QRScannerModal from "../api/QR_Code/QrCode";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { NguoiDungAPI } from "../api/nguoiDung/nguoiDungAPI";
export default function AddNhanVien() {
  const [form] = Form.useForm();
  const [fileImage, setFileIamge] = useState(null);
  const [listProvince, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [listWard, setListWard] = useState([]);
  const nav = useNavigate();

  const handleFileUpload = (fileData) => {
    setFileIamge(fileData);
  };

  const [showModal, setShowModal] = useState(false);

  const handleScanButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
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
    AddressApi.fetchAllProvinceWard(valueDistrict.valueDistrict).then((res) => {
      setListWard(res.data.data);
    });
    setDistrict(valueDistrict);
  };

  const handleWardChange = (value, valueWard) => {
    form.setFieldsValue({ wardCode: valueWard.valueWard });
    setWard(valueWard);
  };

  useEffect(() => {
    loadDataProvince();
    loadNguoiDung();
    loadNhanVien();
  }, []);

  // QR code
  const [qrResult, setQrResult] = useState("");

  const handleQRResult = (result) => {
    if (result != null) {
      setShowModal(false);
    }
    setQrResult(result);

    // Tìm vị trí của phần tử thứ ba trong chuỗi
    const firstIndex = result.indexOf("|");
    const secondIndex = result.indexOf("|", firstIndex + 1);
    const thirdIndex = result.indexOf("|", secondIndex + 1);
    const fourIndex = result.indexOf("|", thirdIndex + 1);
    const fifIndex = result.indexOf("|", fourIndex + 1);
    const sixIndex = result.indexOf("|", fifIndex + 1);

    const indexDC = result.indexOf(",");
    const indexXa = result.indexOf(",", indexDC + 1);
    const indexHuyen = result.indexOf(",", indexXa + 1);

    setProvince(
      listProvince.filter(
        (item) =>
          item.ProvinceName.toLowerCase().replace(/\s/g, "") ===
          result
            .substring(indexHuyen + 1, sixIndex)
            .toLowerCase()
            .replace(/\s/g, "")
      )[0]
    );

    AddressApi.fetchAllProvinceDistricts(
      listProvince.filter(
        (item) =>
          item.ProvinceName.toLowerCase().replace(/\s/g, "") ===
          result
            .substring(indexHuyen + 1, sixIndex)
            .toLowerCase()
            .replace(/\s/g, "")
      )[0].ProvinceID
    ).then((res) => {
      setListDistricts(res.data.data);
      setDistrict(
        res.data.data.filter(
          (item) =>
            item.NameExtension[3].toLowerCase().replace(/\s/g, "") ===
            result
              .substring(indexXa + 1, indexHuyen)
              .toLowerCase()
              .replace(/\s/g, "")
        )[0]
      );
      AddressApi.fetchAllProvinceWard(
        res.data.data.filter(
          (item) =>
            item.NameExtension[3].toLowerCase().replace(/\s/g, "") ===
            result
              .substring(indexXa + 1, indexHuyen)
              .toLowerCase()
              .replace(/\s/g, "")
        )[0].DistrictID
      ).then((res) => {
        setListWard(res.data.data);
       
        setWard(
          res.data.data.filter(
            (item) =>
              item.NameExtension[3].toLowerCase().replace(/\s/g, "") ===
              result
                .substring(indexDC + 1, indexXa)
                .toLowerCase()
                .replace(/\s/g, "")
          )[0]
        );
      });
    });

    form.setFieldsValue({
      canCuocCongDan: result.substring(0, 12),
      ten: result.split("|")[2],
      ngaySinh: moment(result.split("|")[3], "DDMMYYYY").format("YYYY-MM-DD"),
      gioiTinh: result.split("|")[4] == "Nam" ? "true" : "false",
      diaChi: result.substring(fifIndex + 1, indexDC),
      tenXa: result.substring(indexDC + 1, indexXa),
      tenHuyen: result.substring(indexXa + 1, indexHuyen),
      tenThanhPho: result.substring(indexHuyen + 1, sixIndex),
    });
  };
  // const defaultImage =
  //   "https://res.cloudinary.com/dm0w2qws8/image/upload/v1706933984/user-128_vsllkw.png";
  // const fetchImage = async () => {
  //   try {
  //     const response = await fetch(defaultImage);
  //     const blob = await response.blob();
  //     const file = new File([blob], "cloudinary_image.jpg", {
  //       type: "image/jpeg",
  //     });
  //     setFileIamge(file);
  //   } catch (error) {
  //     console.error("Error fetching image:", error);
  //   }
  // };

  const [ListNguoiDung, setListNguoiDung] = useState([]);
  const loadNguoiDung = () => {
    NguoiDungAPI.getALLNguoiDung().then((res) => {
      setListNguoiDung(res.data);
    });
  };
  const [ListNhanVien, setListNhanVien] = useState([]);
  const loadNhanVien = () => {
    NhanVienAPI.getAll().then((res) => {
      setListNhanVien(res.data);
    });
  };

  const handleSuccess = () => {
    const checkTrungEmail = (code) => {
      return ListNguoiDung.some(
        (nguoidung) =>
          nguoidung.email.trim().toLowerCase() === code.trim().toLowerCase()
      );
    };
    const checkTrungSDT = (code) => {
      return ListNhanVien.some(
        (nhanvien) =>
          nhanvien.sdt.trim().toLowerCase() === code.trim().toLowerCase()
      );
    };
    form
      .validateFields()
      .then((values) => {
        if (checkTrungEmail(values.email)) {
          toast.error("🦄 Email đã tồn tại!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
        if (checkTrungSDT(values.soDienThoai)) {
          toast.error("🦄 Số điện thoại đã tồn tại!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }

        const data = {
          ...values,
          ngaySinh: values.ngaySinh
            ? new Date(values.ngaySinh).getTime()
            : null,
          idThanhPho: province.key == null ? province.ProvinceID : province.key,
          idHuyen: district.key == null ? district.DistrictID : district.key,
          idXa: ward.key == null ? ward.WardCode : ward.key,
        };
        const formData = new FormData();
        console.log(fileImage, "->>>>>>>>>>>>>>");

        formData.append("file", fileImage);

        formData.append("request", JSON.stringify(data));

        NhanVienAPI.create(formData)
        .then((result) => {
          nav("/admin-nhan-vien");
          toast("🦄 Thêm Thành công!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      })
      .catch(() => {
        toast("🦄 Thêm Thất bại!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <>
      <h1>
        <Divider orientation="center" color="none">
          <h3 className="text-first  fw-bold">
            <FaMoneyBills /> Thêm nhân viên
          </h3>
        </Divider>
      </h1>
      <Form form={form} layout="vertical">
        <Row gutter={14} style={{ marginTop: "0px" }}>
          <Col span={7}>
            <Card style={{ height: "100%" }}>
              <h5 className="text-center fw-bold">Ảnh đại diện</h5>
              <Row className="text-center mt-5">
                <UpLoadImage onFileUpload={handleFileUpload} />
              </Row>
            </Card>
          </Col>
          <Col span={17}>
            <Card style={{ height: "100%" }}>
              <h5 className="text-center fw-bold">Thông tin nhân viên</h5>
              <Row
                justify="end"
                align="middle"
                style={{ marginBottom: "15px", marginTop: "10px" }}
              >
                <Col span={11}>
                  <Button
                    onClick={handleScanButtonClick}
                    style={{
                      width: "150px",
                      height: "40px",
                      margin: "0 10px 10px 10px ",
                      backgroundColor: "#3366CC",
                      color: "white",
                    }}
                  >
                    {/* <FontAwesomeIcon icon={FaQrcode} /> */}
                    <span style={{ marginLeft: "10px" }}>QR-Căn cước</span>
                  </Button>
                  <Button
                    onClick={handleSuccess}
                    style={{
                      width: "110px",
                      height: "40px",
                      margin: "0 10px 10px 10px ",
                      backgroundColor: "#3366CC",
                      color: "white",
                    }}
                    // htmlType="reset"
                  >
                    Hoàn tất
                  </Button>
                  {showModal && (
                    <QRScannerModal
                      visible={showModal}
                      onCancel={handleModalClose}
                      onQRResult={handleQRResult}
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={11} style={{ marginRight: "20px" }}>
                  <Form.Item
                    name="ten"
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
                  <Form.Item
                    name="canCuocCongDan"
                    label="Căn cước"
                    tooltip="Căn cước công dân của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập căn cước công dân.",
                        whitespace: true,
                      },
                      {
                        pattern: /^\d{12}$/,
                        message: "Căn cước công dân cần phải 12 chữ số.",
                      },
                    ]}
                    // labelCol={{ span: 9 }}
                    // wrapperCol={{ span: 15 }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="gioiTinh"
                    label="Giới tính"
                    tooltip="Giới tính của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy chọn giới tính.",
                        whitespace: true,
                      },
                    ]}
                    // labelCol={{ span: 9 }}
                    // wrapperCol={{ span: 15 }}
                  >
                    <Select defaultValue={""}>
                      <Select.Option value="">Chọn giới tính</Select.Option>
                      <Select.Option value="true">Nam</Select.Option>
                      <Select.Option value="false">Nữ</Select.Option>
                    </Select>
                  </Form.Item>
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
                      <Select.Option value="">
                        --Chọn Tỉnh/Thành phố--
                      </Select.Option>
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
                </Col>
                <Col span={11} style={{ marginRight: "20px" }}>
                  <Form.Item
                    name="ngaySinh"
                    label="Ngày sinh"
                    tooltip="Ngày sinh của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập ngày sinh.",
                        whitespace: true,
                      },
                    ]}
                    // labelCol={{ span: 9 }}
                    // wrapperCol={{ span: 15 }}
                  >
                    <Input type="date" style={{ textAlign: "center" }} />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    tooltip="Email của bạn là gì?"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng hãy nhập email.",
                        whitespace: true,
                      },
                      {
                        type: "email",
                        message: "Vui lòng nhập đúng định dạng email.",
                      },
                    ]}
                    // labelCol={{ span: 9 }}
                    // wrapperCol={{ span: 15 }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="soDienThoai"
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
                      <Select.Option value="">
                        --Chọn Quận/Huyện--
                      </Select.Option>
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
                </Col>
                <Col style={{ marginLeft: "300px" }}>
                  <Button
                    onClick={handleSuccess}
                    style={{
                      width: "110px",
                      height: "40px",
                      margin: "0 10px 10px 10px ",
                      backgroundColor: "#3366CC",
                      color: "white",
                    }}
                    // htmlType="reset"
                  >
                    Hoàn tất
                  </Button>

                  <Button
                    to={"/admin-nhan-vien"}
                    style={{
                      width: "110px",
                      height: "40px",
                      margin: "0 10px 10px 10px ",
                      backgroundColor: "#3366CC",
                      color: "white",
                    }}
                  >
                    Hủy
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
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
        <ToastContainer />
      </Form>
    </>
  );
}
