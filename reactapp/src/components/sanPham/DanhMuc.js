import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Tag,
  Modal
} from 'antd';
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { DeleteFilled } from "@ant-design/icons";
import { InfoCircleFilled } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { MdSearch } from 'react-icons/md';
import axios from 'axios';
import { BiSolidCategory } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import FormItem from 'antd/es/form/FormItem';
import { BsFillEyeFill } from 'react-icons/bs';

export default function DanhMuc() {
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
  //Ấn add 
  const [open, setOpen] = useState(false);
  const [bordered] = useState(false);
  const addDanhMuc = (value) => {
    const checkTrung = (code) => {
      return danhMuc.some(dm => dm.ten === code);
    };
    if(!(checkTrung(value.ten))){
      axios.post('http://localhost:8080/admin/danh-muc/add', value)
      .then(response => {
        console.log(response.data);
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
        loadDanhMuc();
        form.resetFields();

      })
      .catch(error => console.error('Error adding item:', error));

    }else{
      toast.error('Danh mục đã tồn tại!', {
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
  const [dmUpdate, setDmUpdate] = useState(false);
  const [tenCheck, setTenCheck] = useState(false);
  const showModal = async (id) => {
    const result = await axios.get(`http://localhost:8080/admin/danh-muc/detail/${id}`, {
      validateStatus: () => {
        return true;
      }
    });;
    setTenCheck(result.data.ten)
    setDmUpdate(result.data)
    setOpenUpdate(true);
  };
  console.log(dmUpdate)
  const updateDanhMuc = () => {

      if(dmUpdate.ten != tenCheck){
        const checkTrung = (ten) => {
          return danhMuc.some(dm =>
            dm.ten === ten
          );
        };
  
        if (checkTrung(dmUpdate.ten)) {
          toast.error('Sản phẩm có tên trùng với sản phẩm khác !', {
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
      
    axios.put(`http://localhost:8080/admin/danh-muc/update/${dmUpdate.id}`, dmUpdate)
      .then(response => {
        console.log(response.data);
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
        loadDanhMuc();
      })
      .catch(error => console.error('Error adding item:', error));
  }
  //Tìm kiếm
  const onChangeFilter = (changedValues, allValues) => {
    console.log("All values : ", allValues)
    timKiemCT(allValues);
  }
  const timKiemCT = (dataSearch) => {
    axios.post(`http://localhost:8080/admin/danh-muc/tim-kiem`, dataSearch)
      .then(response => {
        setDanhMucs(response.data);
      })
      .catch(error => console.error('Error adding item:', error));
  }
  //Table
  const [danhMuc, setDanhMucs] = useState([]);

  const loadDanhMuc = async () => {
    const result = await axios.get("http://localhost:8080/admin/danh-muc", {
      validateStatus: () => {
        return true;
      }
    });
    if (result.status === 302) {
      setDanhMucs(result.data);
    }
  };
  
  useEffect(() => {
    loadDanhMuc();
  }, []);

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
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (title) => (
        <Space size="middle">
          <a className='btn btn-danger'><BsFillEyeFill className='mb-1' onClick={() => showModal(`${title}`)}/></a>
        </Space>
      ),
    },
  ]
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  return (
    <div className='container-fluid' style={{ borderRadius: 20 }}>
      <div className="container-fluid">
        <Divider orientation="center" color="#d0aa73"><h4 className="text-first pt-1 fw-bold"> <BiSolidCategory size={35} /> Quản lý danh mục</h4></Divider>
        <div className=' bg-light m-2 p-3 pt-2' style={{
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px'
        }}>
          <h5><FilterFilled size={30} /> Bộ lọc</h5>
          <hr />
          <Form className="row"
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
            form={form}
          >
            <div className="col-md-5">
              <Form.Item label="Tên & Mã" name="ten">
                <Input className='rounded-pill border-warning' placeholder='Nhập tên hoặc mã' />
              </Form.Item>
            </div>
            <div className='col-md-5'>
              <Form.Item placeholder="Chọn trạng thái"  label="Trạng Thái" name="trangThai">
                <Select value={selectedValue} onChange={handleChange}>
                  <Select.Option value="0">Còn Bán</Select.Option>
                  <Select.Option value="1">Dừng Bán</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className='text-center' style={{ paddingLeft: 200 }}>
              <Button type="primary" htmlType='reset'  icon={<RetweetOutlined/>} onClick={loadDanhMuc}>Làm mới</Button>
            </Form.Item>
          </Form>
        </div>
        <div className='text-end'>
          <a className="btn btn-warning bg-gradient fw-bold nut-them rounded-pill" role="button" onClick={() => setOpen(true)}> <PlusCircleOutlined />  Thêm danh mục</a>
        </div>
        <div className=' bg-light m-2 p-3 pt-2' style={{
          border: '1px solid #ddd', // Border color
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Box shadow
          borderRadius: '8px'
        }}>
          <h5><BookFilled size={30} /> Danh sách danh mục</h5>
          <hr />
          <div className="ms-3">
            {/* Add danh mục */}

            <Modal
              title="Thêm Danh Mục"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              footer={[
                <Button onClick={() => setOpen(false)}>Hủy</Button>,
                <Button type="primary" onClick={() => {
                  Modal.confirm({
                    centered: true,
                    title: 'Thông báo',
                    content: 'Bạn có chắc chắn muốn thêm không?',
                    onOk: () => { form1.submit(); },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
                }}>Thêm</Button>
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
                onFinish={addDanhMuc}
                form={form1}>
                <Form.Item label="Tên" name='ten' hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                     <Input className='border'></Input>
                </Form.Item>
              </Form>
            </Modal>

            {/* Update danh mục */}
            <Modal
              title="Sửa Danh Mục"
              centered
              open={openUpdate}
              onOk={() => setOpenUpdate(false)}
              onCancel={() => setOpenUpdate(false)}
              footer={[
                <Button onClick={() => setOpenUpdate(false)}>Hủy</Button>,
                <Button type="primary" onClick={() => {
                  Modal.confirm({
                    centered: true,
                    title: 'Thông báo',
                    content: 'Bạn có chắc chắn muốn sửa không?',
                    onOk: () => { form1.submit(); },
                    footer: (_, { OkBtn, CancelBtn }) => (
                      <>
                        <CancelBtn />
                        <OkBtn />
                      </>
                    ),
                  });
                }}>Sửa</Button>
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
                onFinish={updateDanhMuc}
                form={form1}>
                <Form.Item label={<b>Tên</b>} hasFeedback rules={[{ required: true, message: 'Vui lòng không để trống tên!', },]} >
                     <Input className='border' value={dmUpdate.ten} onChange={(e) => setDmUpdate({ ...dmUpdate, ten: e.target.value })}></Input>
                </Form.Item>
                <Form.Item label={<b>Trạng thái </b>}>
                      <Select defaultValue={dmUpdate.trangThai == 0 ? 'Còn bán' : 'Dừng bán'} onChange={(e) => setDmUpdate({ ...dmUpdate, trangThai: e })}>
                        <Select.Option value='0'>Còn Bán</Select.Option>
                        <Select.Option value='1'>Dừng Bán</Select.Option>
                      </Select>
                    </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="container-fluid mt-4">
            <Table align="center" dataSource={danhMuc} columns={columns} pagination={{
              showQuickJumper: true,
              defaultPageSize: 5,
              position: ['bottomCenter'],
              defaultCurrent: 1,
              total: 100,
            }} />
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
  )
}