import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
// import "./CustumerManagement.model.css";
import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faQrcode } from "@fortawesome/free-solid-svg-icons";
// import QRScannerModal from "../../../util/QR-code/BarcodeScanner ";
import { AddressApi } from "../api/address/AddressApi";
import { useNavigate, useParams } from "react-router-dom";
import UpLoadImageUpdate from "../api/UpdateImage/UploadImageUpdate";
import { KhachHangAPI } from "../api/user/khachHang.api";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { FaMoneyBills } from "react-icons/fa6";

export default function UpdateKhachHang() {
    const [form] = Form.useForm();
    var { id } = useParams();
    const [fileImage, setFileIamge] = useState(null);
    const [listProvince, setListProvince] = useState([]);
    const [listDistricts, setListDistricts] = useState([]);
    const [listWard, setListWard] = useState([]);
    const nav = useNavigate();
    
    const [getOneEmployee, setOneEmployee] = useState(null);
    const getOneEmployeeById = () => {
        KhachHangAPI.getOneByIdUser(id)
            .then((resp) => {
                const modifiedEmployee = {
                    ...resp.data,
                    ngaySinh: moment(resp.data.ngaySinh).format("YYYY-MM-DD"),
                };
                setOneEmployee(modifiedEmployee);
            })
            .catch((err) => {
                console.log(err);
            });
            
    };

    useEffect(() => {
        getOneEmployeeById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    }, []);

    const handleSuccess = () => {
        form.validateFields().then((values) => {
            const data = {
                ...values,
                ngaySinh: values.ngaySinh
                    ? new Date(values.ngaySinh).getTime()
                    : null,
                idThanhPho: province === null ? null : province.key,
                idHuyen: district === null ? null : district.key,
                idXa: ward === null ? null : ward.key,
                id: id,
            };
            const formData = new FormData();
            formData.append(`file`, fileImage);
            formData.append("request", JSON.stringify(data));
           
            KhachHangAPI.update(formData)
                .then(() => {
                    toast('🦄 Update Thành công!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",

                    });
                    nav("/admin-khach-hang");
              
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };
   
    return (
        <div>
            <h1>

              
                    <h3 className="text-first  text-center fw-bold">
                        <FaMoneyBills /> Update khách hàng
                    </h3>
             

            </h1>
            {getOneEmployee !== null && (
                <Form form={form} initialValues={getOneEmployee} layout="vertical">
                    <Row gutter={14} style={{ marginTop: "30px" }}>
                        <Col span={7}>
                            <Card style={{ height: "100%" }}>
                                <h5 className='text-center fw-bold'>Ảnh đại diện</h5>
                                <Row className='text-center mt-5'>
                                    <UpLoadImageUpdate
                                        onFileUpload={handleFileUpload}
                                        defaultImage={getOneEmployee.anh}
                                    />
                                </Row>
                            </Card>
                        </Col>
                        <Col span={17}>
                            <Card style={{ height: "100%" }}>
                                <h5 className='text-center fw-bold'>Thông tin khách hàng</h5>
                                <Row
                                    justify="end"
                                    align="middle"
                                    style={{ marginBottom: "15px", marginTop: "10px" }}
                                >
                                    <Col span={11}>
                                  
                                        <Button
                                            onClick={
                                                // showConfirmationModal(
                                                //     "Bạn có chắc muốn thêm ?",
                                                    handleSuccess
                                                // )
                                            }
                                            style={{
                                                width: "110px",
                                                height: "40px",
                                                margin: "0 10px 10px 10px ",
                                                backgroundColor: "#3366CC",
                                                color: "white",
                                                marginLeft: "180px",
                                            }}
                                        >
                                            Hoàn tất
                                        </Button>
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
                                                style={{ textAlign: "center" }}
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
                                            <Input style={{ textAlign: "center" }} />
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
                                            <Select
                                                defaultValue={getOneEmployee.gioiTinh ? "true" : "false"}
                                            >
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
                                                <Select.Option value="">
                                                    --Chọn Xã/Phường--
                                                </Select.Option>
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
                                            <Input style={{ textAlign: "center" }} />
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
                                            <Input style={{ textAlign: "center" }} />
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
                                            <Input style={{ textAlign: "center" }} />
                                        </Form.Item>
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
                
            )}
        </div>
    );
}