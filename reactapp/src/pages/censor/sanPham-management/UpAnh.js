// import React, { useState } from 'react';
// import { Upload, message, Button } from 'antd';
// import { PlusCircleFilled, PlusOutlined, UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const CloudinaryUpload = ({onLinkAnhChange}) => {
//   const [linkAnh, setLinkAnh] = useState(null);

//   const customRequest = async ({ file, onSuccess, onError }) => {
//     try {
//       // Gửi file lên Cloudinary
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', 'mishoes');

//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/dtetgawxc/image/upload',
//         formData
//       );

//       // Lấy URL của ảnh từ response và gán vào biến linkAnh
//       const imageUrl = response.data.secure_url;
//       setLinkAnh(imageUrl);

//       onLinkAnhChange(imageUrl);
//       // Gọi onSuccess để thông báo cho Ant Design rằng upload thành công
//       onSuccess();

//       // Hiển thị thông báo thành công
//     } catch (error) {
//       // Gọi onError để thông báo cho Ant Design rằng có lỗi xảy ra trong quá trình upload
//       onError();

//       // Hiển thị thông báo lỗi
//       message.error('Đã xảy ra lỗi trong quá trình upload.');
//     }
//   };
//   return (
//     <Upload
//       customRequest={customRequest}
//       listType="picture-card"
//       showUploadList={false}
//     >
//         {linkAnh ? (
//         <img src={linkAnh} alt="Ảnh đã upload" style={{ width: '100%' }} />
//       ) : (
//         <div>
//           <p><PlusOutlined size={50} className='mt-3'/><br></br>Upload</p>

//         </div>
//       )}
//     </Upload>
//   );
// };

// export default CloudinaryUpload;

import React, { useState,useEffect } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import './SanPham.css'
const CloudinaryUpload = ({ onLinkAnhChange }) => {
  const [linkAnhList, setLinkAnhList] = useState([]);

  const beforeUpload = (file, fileList) => {
    // Kiểm tra nếu tổng số tệp sau khi thêm tệp mới sẽ vượt quá giới hạn
    if (linkAnhList.length + fileList.length > 5) {
      message.error('Bạn chỉ có thể tải lên tối đa 5 ảnh.');
      return false; // Ngăn chặn việc tải lên thêm
    }
    return true; // Cho phép tải lên nếu dưới giới hạn
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      // Gửi file lên Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'mishoes');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dtetgawxc/image/upload',
        formData
      );

      // Lấy URL của ảnh từ response
      const imageUrl = response.data.secure_url;

      // Thêm URL của ảnh vào mảng linkAnhList
      setLinkAnhList((prevData) => [...prevData, imageUrl])

      // Gọi onSuccess để thông báo cho Ant Design rằng upload thành công
      onSuccess();

      // Hiển thị thông báo thành công

    } catch (error) {
      // Gọi onError để thông báo cho Ant Design rằng có lỗi xảy ra trong quá trình upload
      onError();

      // Hiển thị thông báo lỗi
      message.error('Đã xảy ra lỗi trong quá trình upload.');
    }
  };

  const UpdateLinkAnh = () => {
    onLinkAnhChange(linkAnhList);
  }

  useEffect(() => {
    UpdateLinkAnh();
  }, [linkAnhList]);



  const hasEmptySlot = linkAnhList.length < 5; // kiểm tra xem có ô rỗng hay không

  return (
    <>
      <Upload
        customRequest={customRequest}
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        multiple={true} // Cho phép tải lên nhiều hình ảnh
        maxCount={4}
        className='text-center'
      >
        {hasEmptySlot && ( // Hiển thị ô upload chỉ khi có ít hơn 3 ảnh
          <div>
            <PlusOutlined style={{ fontSize: "32px", color: "#999" }} />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <div style={{ display: "flex", gap: "10px" }}>
        {linkAnhList.map((linkAnh, index) => (
          <div className="row">
            <div>
              <img
                key={index}
                src={linkAnh}
                alt={`Ảnh ${index}`}
                width={90}
                height={90}
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CloudinaryUpload;
