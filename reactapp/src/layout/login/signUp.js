import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Button, Form, Image, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./login.css";
import { useState, useEffect } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import logoShop from "../../assets/images/logoNgang.png";
import { LoginAPI } from "../../pages/censor/api/login/loginApi";
import ReCAPTCHA from "react-google-recaptcha";
import { NguoiDungAPI } from "../../pages/censor/api/nguoiDung/nguoiDungAPI";
export const SignUp = () => {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const[capVal,setcapVal]=useState(null);
      const [showPassword, setShowPassword] = useState(false);

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    useEffect(() => {
    loadNguoiDung();

  }, []);
    const [ListNguoiDung, setListNguoiDung] = useState([]);
  const loadNguoiDung = () => {
    NguoiDungAPI.getALLNguoiDung().then((res) => {
      setListNguoiDung(res.data);
    });
  };

  const signUp = (data) => {
       const checkTrungEmail = (code) => {
      return ListNguoiDung.some(
        (nguoidung) =>
          nguoidung.email.trim().toLowerCase() === code.trim().toLowerCase()
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
                 if (values.matKhau!=values.pass) {
                   toast.error("🦄 Xác nhận mật khẩu khác nhau!", {
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
          LoginAPI.signUp(values)
            .then((result) => {
       
              toast("🦄 Đăng ký Thành công!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
                     nav("/login");
            })
            .catch((error) => {
              console.log(error);
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
    <MDBContainer className="my-5 mb-5 ">
      <MDBCard className="container-login form-login" style={{ width: 1000 }}>
        <MDBRow style={{ height: 522 }}>
          <MDBCol md="5" style={{ height: 500 }}>
            <MDBCardImage
              src="https://i.pinimg.com/564x/03/08/34/030834f7223ebfd68a5b7a0749b1659e.jpg"
              placeholder="Nhập email"
              style={{ height: 522, width: 450, marginLeft: -10 }}
              alt="login form"
              className="rounded-start"
            />
          </MDBCol>

          <MDBCol md="6" style={{ marginLeft: 50 }}>
            <img
              className="mt-2 "
              style={{ marginLeft: 150 }}
              width={170}
              src={logoShop}
            />
            <Form
              form={form}
              onFinish={signUp}
              layout="vertical"
              className="mt-4"
            >
              <Form.Item
                className="mb-1 ms-5 align-center"
                name="ten"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                    whitespace: true,
                  },
                ]}
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 20 }}
              >
                <Input
                  placeholder="Mời nhập tên"
                  style={{ width: 365, height: 40 }}
                />
              </Form.Item>
              <Form.Item
                className="mb-1 ms-5 align-center"
                name="email"
                hasFeedback
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
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 20 }}
              >
                <Input
                  placeholder="Mời nhập Email"
                  style={{ width: 365, height: 40 }}
                />
              </Form.Item>
              <div className="row">
                <Form.Item
                  className="mb-1 ms-5 mt-1 align-center col-md-9"
                  name="matKhau"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống pass !",
                    },
                  ]}
                  labelCol={{ span: 20 }}
                  wrapperCol={{ span: 20 }}
                >
                  <Input
                    placeholder="Mời nhập Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    // onChange={handlePasswordChange}
                    style={{ width: 365, height: 40 }}
                  />
                </Form.Item>
                <Form.Item
                  className="mb-1 ms-5 mt-1 align-center col-md-9"
                  name="pass"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng không để trống pass !",
                    },
                  ]}
                  labelCol={{ span: 20 }}
                  wrapperCol={{ span: 20 }}
                >
                  <Input
                    placeholder="Mời nhập lại  Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    // onChange={handlePasswordChange}
                    style={{ width: 365, height: 40 }}
                  />
                </Form.Item>
                <div
                  className="col"
                  style={{ marginTop: 10 }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={25} className="showpass" />
                  ) : (
                    <IoEyeOutline size={25} className="showpass" />
                  )}
                </div>
              </div>
              <ReCAPTCHA
                sitekey="6Le0Y34pAAAAAEdCIL62wVWfz93Mva93f99ffiCL"
                onChange={(val) => setcapVal(val)}
                style={{ marginLeft: 90 }}
                className="mt-2"
              ></ReCAPTCHA>
              <Button
                className="mb-1 w-50 mt-4"
                style={{ marginLeft: 120 }}
                htmlType="submit"
                disabled={!capVal}
              >
                Sign up
              </Button>
            </Form>
          </MDBCol>
        </MDBRow>
      </MDBCard>
      <ToastContainer
        position="top-right"
        autoClose={2500}
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
    </MDBContainer>
  );
};
