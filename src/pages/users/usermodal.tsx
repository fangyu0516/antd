import { useState, useEffect } from 'react';
import { DrawerForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import { message, Upload, Form, Button, Modal } from 'antd';
import {
  PlusOutlined,
  LoadingOutlined,
  LockOutlined,
  UserOutlined,
  MobileOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { addUser, checkUserName } from '@/services/ant-design-pro/users';
import { getRoleOption } from '@/services/ant-design-pro/role';
import { useRequest } from 'umi';

type ValidateStatus = 'success' | 'warning' | 'error' | 'validating' | '';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.warn('只能上传jpg,png格式');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.warn('图片不能大于2M');
    return false;
  }
  return isJpgOrPng && isLt2M;
}

export default (props: any) => {
  const { modalVisable, setModalVisable, refresh } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [uploadding, setUploading] = useState(false);
  const [validateStatus, setValidateStatus] = useState<ValidateStatus>('');
  const [helpText, setHelpText] = useState<string>();
  const [prevalue, setPrevalue] = useState<string>();
  const [form] = Form.useForm();
  //定义上传按钮
  const uploadButton = (
    <div>
      {uploadding ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>头像上传</div>
    </div>
  );

  //检查用户名是否重复
  const { run: beginCheck } = useRequest(
    async (values) => {
      setValidateStatus('validating');
      let result = await checkUserName(values.trim());
      if (result.status === 0) {
        setValidateStatus('success');
        setHelpText(values.trim() + '可以注册');
      }
      if (result.status === 1) {
        setValidateStatus('error');
        setHelpText(values.trim() + '已被注册');
      }
    },
    { debounceInterval: 500, manual: true },
  );

  //提交表单处理
  const finishHandle = () => {
    let username = form.getFieldValue('username');

    if (!username || username.trim() === 0) {
      setValidateStatus('error');
      setHelpText('用户名不能为空');
      return;
    }
    if (!/^[0-9a-zA-Z\u4e00-\u9fa5]+$/.test(username)) {
      setValidateStatus('error');
      setHelpText('不能包含特殊字符');
      return;
    }
    if (validateStatus === 'success') {
      form
        .validateFields(['password', 'phone', 'email', 'is_active', 'rolecode'])
        .then(async (values) => {
          values.username = username;
          console.log('values :>> ', values);
          const { status, message: msg } = await addUser(values);
          if (status === 0) {
            message.success(msg);
            setModalVisable(false);
            resetAllfields();
            refresh();
            // 不返回不会关闭弹框
            return true;
          }
        });
    }
  };

  //上传处理
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setUploading(false);
        setImageUrl(imageUrl);
      });
    }
  };

  //预览处理
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setImageUrl(file.url || file.preview);
  };

  //加载角色
  const { data: roleOption, run } = useRequest(getRoleOption, {
    cacheKey: 'roleOption',
    throttleInterval: 1000 * 60,
    manual: true,
    formatResult: (result) =>
      result.map((item) => ({
        label: item.rolename,
        value: item.rolecode,
      })),
  });

  const resetAllfields = () => {
    form.resetFields();
    setValidateStatus('');
    setHelpText(undefined);
  };

  //检测弹窗变化
  useEffect(() => {
    if (modalVisable) {
      console.log('modalVisable11 :>> ', modalVisable);
      run();
    } else {
      resetAllfields();
    }
  }, [modalVisable]);

  return (
    <DrawerForm
      width={450}
      title="新建用户"
      visible={modalVisable}
      form={form}
      onVisibleChange={(visible) => setModalVisable(visible)}
      drawerProps={{
        forceRender: false,
        destroyOnClose: true,
      }}
      submitter={{
        render: (props, doms) => {
          return [
            <Button key="rest" onClick={resetAllfields}>
              重置
            </Button>,
            <Button type="primary" key="submit" onClick={finishHandle}>
              提交
            </Button>,
          ];
        },
      }}
    >
      <ProFormText
        name="username"
        label="用户名"
        tooltip={{
          placement: 'topLeft',
          title: '不能包含特殊符号,支持中文',
        }}
        placeholder="用户名"
        validateStatus={validateStatus}
        hasFeedback
        validateFirst
        help={helpText}
        requiredMark={true}
        rules={[
          {
            validator: (_, value) => beginCheck(value),
          },
        ]}
        fieldProps={{
          // size: "middle",
          // onChange: ({ target: { value } }) => setValidateStatus('validating'),
          prefix: <UserOutlined />,
        }}
      />
      <ProFormText.Password
        name="password"
        label="密码"
        tooltip={{
          placement: 'topLeft',
          title: '不能包含特殊符号',
        }}
        placeholder="密码"
        fieldProps={{
          prefix: <LockOutlined />,
        }}
        rules={[
          {
            required: true,
            message: '必填',
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '不能包含特殊符号',
          },
        ]}
      />

      <ProFormText
        fieldProps={{
          prefix: <MobileOutlined />,
        }}
        name="phone"
        label="电话"
      />
      <ProFormText
        fieldProps={{
          prefix: <MailOutlined />,
        }}
        name="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            message: '必须为邮箱格式',
          },
        ]}
      />
      <ProFormRadio.Group name="rolecode" label="用户权限" initialValue={2} options={roleOption} />

      <ProFormRadio.Group
        name="is_active"
        label="用户状态"
        initialValue={1}
        options={[
          {
            label: '激活',
            value: 1,
          },
          {
            label: '冻结',
            value: 0,
          },
        ]}
      />
      {/* <Form.Item style={{ marginTop: 100 }} wrapperCol={{ span: 14, offset: 10 }}>
        <Upload
          name="avatar"
          listType="picture-card"
          action="http://localhost:8000/api/user/uploadAvatar/"
          onPreview={handlePreview}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} width={150} height={150} /> : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title="查看" footer={null}>
          <img alt="example" style={{ width: '100%' }} src={imageUrl} />
        </Modal>
      </Form.Item> */}
    </DrawerForm>
  );
};
