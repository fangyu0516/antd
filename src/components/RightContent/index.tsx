import React, { useCallback } from 'react';
import { useModel, history, SelectLang } from 'umi';
import { outLogin } from '@/services/ant-design-pro/api';
import styles from './index.less';
import { Menu, Dropdown, Button, Space, Badge, message } from 'antd';
import { DownOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const loginPath = '/user/login';

const GlobalHeaderRight: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const loginOut = async () => {
    try {
      const result = await outLogin();
      console.log('result :>> ', result);
      if (result.status === 0) {
        localStorage.removeItem('authorization');
        const { query = {} } = history.location;
        const { redirect } = query;
        // Note: There may be security issues, please note
        if (window.location.pathname !== loginPath && !redirect) {
          history.replace(loginPath);
        }
      }
    } catch (error) {
      message.error(error);
    }
  };

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'logout' && initialState) {
        setInitialState({ ...initialState, currentUser: undefined });
        console.log('initialState :>> ', initialState);
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [initialState, setInitialState],
  );

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <a>个人中心</a>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <a>退出</a>
      </Menu.Item>
    </Menu>
  );

  return (
    // <Space className={className}>
    //   <HeaderSearch
    //     className={`${styles.action} ${styles.search}`}
    //     placeholder="站内搜索"
    //     defaultValue="umi ui"
    //     options={[
    //       { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
    //       {
    //         label: <a href="next.ant.design">Ant Design</a>,
    //         value: 'Ant Design',
    //       },
    //       {
    //         label: <a href="https://protable.ant.design/">Pro Table</a>,
    //         value: 'Pro Table',
    //       },
    //       {
    //         label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
    //         value: 'Pro Layout',
    //       },
    //     ]}
    //     // onSearch={value => {
    //     //   console.log('input', value);
    //     // }}
    //   />
    //   <span
    //     className={styles.action}
    //     onClick={() => {
    //       window.open('https://pro.ant.design/docs/getting-started');
    //     }}
    //   >
    //     <QuestionCircleOutlined />
    //   </span>

    //   {REACT_APP_ENV && (
    //     <span>
    //       <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
    //     </span>
    //   )}
    //   <SelectLang className={styles.action} />
    // </Space>
    <Space size="small">
      <Dropdown overlay={menu}>
        <Button
          icon={<UserOutlined />}
          type="primary"
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
        >
          {initialState?.currentUser?.username} <DownOutlined />
        </Button>
      </Dropdown>
      <Badge count={5} offset={[-7, -15]}>
        <a href="#" className="head-example" />
      </Badge>
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
