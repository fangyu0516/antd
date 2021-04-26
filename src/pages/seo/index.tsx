import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormUploadButton, ProFormText } from '@ant-design/pro-form';
import { uploadAvatar } from '@/services/ant-design-pro/users';
import { useState } from 'react';
import { message, UploadProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
export default (params) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [fileList, setFileList] = useState([]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file, fileList) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleFinish = async (values) => {
    const result = await uploadAvatar(values);
    console.log('result :>> ', result);
  };

  const handleChange = (info) => {
    console.log('info :>> ', info);
    let fileList = [...info.fileList];
    setFileList(fileList);
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    // if (info.file.status === 'uploading') {
    //   console.log('uploading');
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   setFileList(info.fileList)
    //   console.log('done');
    //   // Get this url from response in real world.
    //   // getBase64(info.file.originFileObj, (imageUrl) => {
    //   //   setImageUrl(imageUrl);
    //   //   setLoading(false);
    //   // });
    // }
  };

  const fieldProps: UploadProps = {
    action: 'http://localhost:8000/api/user/uploadAvatar/',
    listType: 'picture-card',
    maxCount: 1,
    // progress: {
    //   strokeColor: {
    //     '0%': '#108ee9',
    //     '100%': '#87d068',
    //   },
    //   strokeWidth: 3,
    //   format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    // },
    beforeUpload: beforeUpload,
    onChange: handleChange,
    name: 'avatar',
    fileList: fileList,
  };

  return (
    <PageContainer>
      <ProForm
        encType="multipart/form-data"
        onFinish={handleFinish}
        submitter={{
          // 配置按钮文本
          searchConfig: {
            submitText: '保存',
          },
          resetButtonProps: {
            style: {
              // 隐藏重置按钮
              display: 'none',
            },
          },
        }}
      >
        <ProFormText name="text" label="名称" placeholder="请输入名称" />
        <ProFormUploadButton
          fieldProps={{
            ...fieldProps,
          }}
          icon={<UserOutlined />}
          title="上传头像"
          name="avatar"
        ></ProFormUploadButton>
      </ProForm>
    </PageContainer>
  );
};
