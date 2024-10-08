import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./shop.css";
import { Button, Slider, Checkbox, Card, Col, Collapse, Dropdown, Input, Popover, Row, Space, Form, Pagination, Flex } from "antd";
import { ProductCard } from "../productCard";
import ModalDetailSP from "./modalDetailSP";
import { HomeAPI } from "../../../pages/censor/api/home/homeApi";
import { HangAPI } from "../../../pages/censor/api/SanPham/hang.api";
import { MauSacAPI } from "../../../pages/censor/api/SanPham/mauSac.api";
import { KichThuocAPI } from "../../../pages/censor/api/SanPham/kichThuoc.api";
import {  LeftOutlined, RightOutlined, SortDescendingOutlined } from "@ant-design/icons";
import ReactPaginate from 'react-paginate';
import logoBanner from '../../../assets/images/page-header-bg.jpg';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
export const Shop = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [hang, setHangs] = useState([]);
  const [mauSac, setMauSacs] = useState([]);
  const [kichThuoc, setKichThuocs] = useState([]);
  const [openModalDetailSP, setOpenModalDetailSP] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sortType, setSortType] = useState('');
  const { Search } = Input;

  const onChangeComplete = (value) => {
    // console.log('onChangeComplete: ', value);
  };

  // const handleMouseEnter = (cardId) => {
  //   setHoveredCard(cardId);
  // };

  // const handleMouseLeave = () => {
  //   setHoveredCard(null);
  // };


  const getAll = () => {
    HomeAPI.getAllSanPham()
      .then((res) => {
        setProducts(res.data);
     
      })
  }

  const getAllHang = () => {
    HangAPI.getAll()
      .then((res) => {
        setHangs(res.data);
      })
  }

  const getAllMauSac = () => {
    MauSacAPI.getAll()
      .then((res) => {
        setMauSacs(res.data);
   
      })
  }

  const getAllKichThuoc = () => {
    KichThuocAPI.getAll()
      .then((res) => {
        setKichThuocs(res.data);
      })
  }

 var stomp = null;
 const socket = new SockJS("http://localhost:8080/ws");
 stomp = Stomp.over(socket);
 useEffect(() => {
   stomp.connect({}, () => {
     stomp.subscribe("/topic/KH/hoa-don", (mes) => {
       try {
         const pare = JSON.parse(mes.body);
         console.log(pare);
         // ví du: bạn muốn khi khách hàng bấm đặt hàng mà load lại hóa đơn màn admin thì hãy gọi hàm load all hóa đơn ở đây
         // thí dụ: đây là hàm laod hóa đơn: loadHoaDon(); allThongBao(); CountThongBao();
      getAll();
      getAllHang();
      getAllMauSac();
      getAllKichThuoc();
       } catch (e) {
         console.log("lỗi mẹ ròi xem code di: ", e);
       }
     });
   });

   return () => {
     stomp.disconnect();
   };
 }, []);
  useEffect(() => {
    getAll();
    getAllHang();
    getAllMauSac();
    getAllKichThuoc();
  }, [])

  //Sort
  const sortProducts = (type) => {
    let sortedProducts = [...products];
    switch (type) {
      case '1': // Giá tăng dần
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case '2': // Giá giảm dần
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case '3': // Từ A-Z
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case '4': // Từ Z-A
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  const handleSortChange = (type) => {
    setSortType(type);
    sortProducts(type);
  };

  const items = [
    {
      key: '1',
      label: (
        <a onClick={() => handleSortChange('1')}>
          Giá tăng dần
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={() => handleSortChange('2')}>
          Giá giảm dần
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a onClick={() => handleSortChange('3')}>
          Từ A-Z
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a onClick={() => handleSortChange('4')}>
          Từ Z-A
        </a>
      ),
    },
  ]

  //Tìm kiếm đa trường
  const [arraySanPham, setArraySanPham] = useState([]);
  const [arrayMauSac, setArrayMauSac] = useState([]);
  const [arrayKichThuoc, setArrayKichThuoc] = useState([]);
  const [giaBatDau, setGiaBatDau] = useState(1000000);
  const [giaKetThuc, setGiaKetThuc] = useState(40000000);

  const dataTimKiem = {
    arraySanPham: arraySanPham,
    arrayMauSac: arrayMauSac,
    arrayKichThuoc: arrayKichThuoc,
    giaBatDau: giaBatDau,
    giaKetThuc: giaKetThuc
  }

  const changeSanPham = (idHang, checked) => {
    if (checked) {
      setArraySanPham(prevArray => [...prevArray, idHang]);
    } else {
      setArraySanPham(prevArray => prevArray.filter(item => item !== idHang));
    }
  };

  const changeMauSac = (idMau, checked) => {
    if (checked) {
      setArrayMauSac(prevArray => [...prevArray, idMau]);
    } else {
      setArrayMauSac(prevArray => prevArray.filter(item => item !== idMau));
    }
  };

  const changeKichThuoc = (idKichThuoc, checked) => {
    if (checked) {
      setArrayKichThuoc(prevArray => [...prevArray, idKichThuoc]);
    } else {
      setArrayKichThuoc(prevArray => prevArray.filter(item => item !== idKichThuoc));
    }
  };

  const onChange = (value) => {
    setGiaBatDau(value[0]);
    setGiaKetThuc(value[1]);
  };

  const getTimMang = (data) => {

    HomeAPI.timMang(data)
      .then((res) => {
       
        setProducts(res.data)
      })
  }

  useEffect(() => {
    getTimMang(dataTimKiem);
  }, [dataTimKiem.arraySanPham, dataTimKiem.arrayMauSac, dataTimKiem.arrayKichThuoc, dataTimKiem.giaBatDau, dataTimKiem.giaKetThuc])

  //Phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(products.length / productsPerPage);
  
  const offset = currentPage * productsPerPage;
  const currentPageData = products.slice(offset, offset + productsPerPage);


  return (
    <div>
      <div className="banner-san-pham-shop">
        <img src={logoBanner} alt="Logo Banner"></img>
        <h1 className="banner-title-logo">Sản phẩm</h1>
      </div>
      <br></br> <br></br>
      <div className="row mt-5">
        {/* lọc filter */}
        <Space direction="vertical" className="col-md-2">
          <Collapse
            className="mb-2"
            collapsible="header"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Giá",
                children: (
                  <Slider
                    range
                    step={1000000}
                    defaultValue={[1000000, 40000000]}
                    min={1000000}
                    max={40000000}
                    onChange={onChange}
                    onChangeComplete={onChangeComplete}
                  />
                ),
              },
            ]}
          />
          <Collapse
            className="mb-2"
            collapsible="header"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Hãng",
                children: (
                  <div className="scrollable-content">
                    <Checkbox.Group>
                      {hang.map((hang, index) => {
                        return (
                          <Checkbox
                            key={hang.id}
                            value={hang.id}
                            onChange={(e) =>
                              changeSanPham(hang.id, e.target.checked)
                            }
                          >
                            <b>{hang.ten}</b>
                          </Checkbox>
                        );
                      })}
                    </Checkbox.Group>
                  </div>
                ),
              },
            ]}
          />
          <Collapse
            className="mb-2"
            collapsible="icon"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Màu sắc",
                children: (
                  <div>
                    <div className="scrollable-content">
                      <Checkbox.Group>
                        {mauSac.map((mau, index) => {
                          return (
                            <Checkbox
                         
                              key={mau.id}
                              value={mau.id}
                              onChange={(e) =>
                                changeMauSac(mau.id, e.target.checked)
                              }
                            >
                              <b>
                                {mau.ten.charAt(0).toUpperCase() +
                                  mau.ten.slice(1)}
                              </b>
                       
                            </Checkbox>
                          );
                        })}
                      </Checkbox.Group>
                    </div>
                  </div>
                ),
              },
            ]}
          />
          <Collapse
            className="mb-2"
            collapsible="icon"
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Size",
                children: (
                  <div>
                    <Checkbox.Group>
                      {kichThuoc.map((kichThuoc, index) => {
                        return (
                          <Col>
                            <Checkbox
                              key={kichThuoc.id}
                              value={kichThuoc.id}
                              onChange={(e) =>
                                changeKichThuoc(kichThuoc.id, e.target.checked)
                              }
                            >
                              <b>{kichThuoc.ten}</b>
                            </Checkbox>
                          </Col>
                        );
                      })}
                    </Checkbox.Group>
                  </div>
                ),
              },
            ]}
          />
        </Space>
        <div className="col-md-10  ">
          <Row gutter={16} className="mb-3">
            <div class="container">
              <div className="d-flex justify-content-end mb-4">
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomLeft"
                  arrow
                >
                  <Button icon={<SortDescendingOutlined />}>Sắp xếp</Button>
                </Dropdown>
              </div>
              <div className="row me-2">
                {currentPageData.map((product, index) => {
                  return (
                    <div className="col-md-3">
                      <ProductCard key={index} product={product} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div class="container mt-3">
              <div className="d-flex justify-content-center">
                <ReactPaginate
                  previousLabel={<LeftOutlined />}
                  nextLabel={<RightOutlined />}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </Row>
        </div>
      </div>
      <ModalDetailSP
        openModalDetailSP={openModalDetailSP}
        setOpenModalDetailSP={setOpenModalDetailSP}
      />
    </div>
  );
};
function roundToThousands(amount) {
  return Math.round(amount / 100) * 100;
}