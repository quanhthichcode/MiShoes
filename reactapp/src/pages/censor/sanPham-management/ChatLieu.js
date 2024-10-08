import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input,Radio, Select, Space, Table, Tag, Modal } from 'antd';
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiMaterialsScience } from 'react-icons/gi';
import { BsFillEyeFill } from 'react-icons/bs';
import { ChatLieuAPI } from '../api/SanPham/chatLieu.api';
export default function ChatLieu() {
  //Form
  const [selectedValue, setSelectedValue] = useState('1');
  const handleChange = (value) => {
    console.log(`Selected value: ${value}`);
    setSelectedValue(value);
  };
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  //Ấn Add
  const [open, setOpen] = useState(false);
  const [bordered] = useState(false);
  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 20
    },
  };
  const addChatLieu = (value) => {
    const checkTrung = (code) => {
      return chatLieu.some(cl => cl.ten.trim().toLowerCase() === code.trim().toLowerCase());
    };
    if (!(checkTrung(value.ten))) {
      ChatLieuAPI.create(value)
        .then((res) => {
          toast('✔️ Thêm thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          loadChatLieu();
          setOpen(false);
          form.resetFields();
        })
    } else {
      toast.error('Chất liệu đã tồn tại!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
   //Update
   const [openUpdate, setOpenUpdate] = useState(false);
   const [clUpdate, setClUpdate] = useState("");
   const [tenCheck, setTenCheck] = useState("");
 
   const showModal = async (idDetail) => {
     await ChatLieuAPI.detail(idDetail)
       .then((res) => {
         setTenCheck(res.data.ten)
         setClUpdate(res.data)
       })
       setOpenUpdate(true)
   };
   console.log(clUpdate)
   const updateChatLieu = () => {
 
     if (clUpdate.ten != tenCheck) {
       const checkTrung = (ten) => {
         return chatLieu.some(x =>
           x.ten === ten
         );
       };
 
       if (checkTrung(clUpdate.ten)) {
         toast.error('Chất liệu trùng với chất liệu khác !', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
         return;
       }
     }
     ChatLieuAPI.update(clUpdate.id, clUpdate)
       .then((res) => {
         toast('✔️ Sửa thành công!', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
         setClUpdate("");
         loadChatLieu();
         setOpenUpdate(false);
       })
   }
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    timKiemCL(allValues);
  }
  const timKiemCL = (dataSearch) => {
   ChatLieuAPI.search(dataSearch)
      .then((res) => {
        setChatLieus(res.data);
      })
  }
  //Validate
  const validateDateChatLieu = (_, value) => {
    const { getFieldValue } = form;
    const tenChatLieu = getFieldValue("ten");
  if (!tenChatLieu.trim()) {
    return Promise.reject("Tên không được để trống");
  }
  const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if (specialCharacterRegex.test(tenChatLieu)) {
    return Promise.reject("Tên không được chứa ký tự đặc biệt");
  }
    return Promise.resolve();
  };
  //Table
  const [chatLieu, setChatLieus] = useState([]);

  useEffect(() => {
    loadChatLieu();
  }, []);

  const loadChatLieu = () => {
    ChatLieuAPI.getAll()
      .then((res) => {
        setChatLieus(res.data.reverse());
      })
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
      showSorterTooltip: false,
    },
    {
      title: "Mã",
      dataIndex: "ma",
      center: "true",
      sorter: (a, b) => a.ma - b.ma,
    }, ,
    {
      title: "Tên",
      dataIndex: "ten",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trang_thai) => (
        <>
          {trang_thai === 0 ? (
            <Tag color="green">
              Còn bán
            </Tag>
          ) : (
            <Tag color="red">
              Dừng bán
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "id",
      render: (title) => (
        <Space size="middle">
          <a className='btn btn-danger' onClick={() => showModal(`${title}`) }><BsFillEyeFill className='mb-1' /></a>
        </Space>
      ),
    },
  ]

  return (
    <div className="container-fluid" style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73">
          <h4 className="text-first pt-1 fw-bold">
            {" "}
            <GiMaterialsScience size={35} /> Quản lý chất liệu
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
          <h5>
            <FilterFilled size={30} /> Bộ lọc
          </h5>
          <hr />
          <Form
            className="row"
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 20,
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
          >
            <div className="col-md-5">
              <Form.Item label="Tên & Mã" name="ten">
                <Input
                  className="rounded-pill border-warning"
                  placeholder="Nhập tên hoặc mã"
                />
              </Form.Item>
            </div>
            <div className="col-md-5">
              <Form.Item
                placeholder="Chọn trạng thái"
                label="Trạng Thái"
                name="trangThai"
              >
                <Select value={selectedValue} onChange={handleChange}>
                  <Select.Option value="0">Còn Bán</Select.Option>
                  <Select.Option value="1">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className="text-center" style={{ paddingLeft: 200 }}>
              <Button
                type="primary"
                htmlType="reset"
                icon={<RetweetOutlined />}
                onClick={loadChatLieu}
              >
                Làm mới
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="text-end">
          <button onClick={() => setOpen(true)} class="button-them">
            <span class="text">
              <PlusCircleOutlined /> Thêm chất liệu
            </span>
          </button>
 
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
            <BookFilled size={30} /> Danh sách chất liệu
          </h5>
          <hr />
          <div className="ms-3">
            {/* Add cl */}
            <Modal
              title="Thêm Chất Liệu"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              footer={[
                <Button onClick={() => setOpen(false)}>Hủy</Button>,
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      centered: true,
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn thêm không?",
                      onOk: () => {
                        form.submit();
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
                </Button>,
              ]}
              width={500}
            >
              <Form
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 1000,
                }}
                onFinish={addChatLieu}
                form={form}
              >
                <Form.Item
                  label="Tên"
                  name="ten"
                  hasFeedback
                  rules={[{ validator: validateDateChatLieu }]}
                >
                  <Input className="border" />
                </Form.Item>
              </Form>
            </Modal>
            {/* Update chất liệu */}
            <Modal
              title="Sửa Chất Liệu"
              centered
              open={openUpdate}
              onOk={() => setOpenUpdate(false)}
              onCancel={() => {
                setOpenUpdate(false);
              }}
              footer={[
                <Button
                  onClick={() => {
                    setOpenUpdate(false);
                  }}
                >
                  Hủy
                </Button>,
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      centered: true,
                      title: "Thông báo",
                      content: "Bạn có chắc chắn muốn sửa không?",
                      onOk: () => {
                        form1.submit();
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
                </Button>,
              ]}
              width={500}
            >
              <Form
                {...formItemLayout}
                initialValues={{
                  size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                  maxWidth: 1000,
                }}
                onFinish={updateChatLieu}
                form={form1}
              >
                <Form.Item
                  label={<b>Tên</b>}
                  hasFeedback
                  rules={[
                    { required: true, message: "Vui lòng không để trống tên!" },
                  ]}
                >
                  <Input
                    className="border"
                    value={clUpdate.ten}
                    onChange={(e) =>
                      setClUpdate({ ...clUpdate, ten: e.target.value })
                    }
                  ></Input>
                </Form.Item>
                <Form.Item label={<b>Trạng thái </b>}>
                  <Radio.Group
                    onChange={(e) =>
                      setClUpdate({ ...clUpdate, trangThai: e.target.value })
                    }
                    value={clUpdate.trangThai}
                  >
                    <Radio value={0}>Còn bán</Radio>
                    <Radio value={1}>Dừng bán</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <div>
              <Table
                className="text-center"
                dataSource={chatLieu}
                columns={columns}
                pagination={{
                  showQuickJumper: true,
                  defaultPageSize: 5,
                  position: ["bottomCenter"],
                  defaultCurrent: 1,
                  total: 100,
                }}
              />
            </div>
          </div>
        </div>
      </div>
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
  );
}