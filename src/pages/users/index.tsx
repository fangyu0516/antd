import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Card,
  Button,
  Tag,
  Space,
  Pagination,
  Row,
  Col,
  Statistic,
  message,
  Popconfirm,
  Badge,
} from 'antd';
import ProList from '@ant-design/pro-list';
import { ActionType } from '@ant-design/pro-table';
import type { ReactText } from 'react';
import React, { useState, useRef } from 'react';
import { MailTwoTone, ShakeOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { getUserList, deleteUser } from '@/services/ant-design-pro/users';
import Avatar from 'antd/lib/avatar/avatar';
import UserModal from './usermodal';
import moment from 'moment';
const roleColor = {
  0: {
    color: 'gold',
  },
  1: {
    color: 'magenta',
  },
  2: {
    color: 'blue',
  },
  3: {
    color: 'cyan',
  },
};

const activeEnum = {
  true: {
    color: 'lime',
    text: '激活',
  },
  false: {
    text: '未激活',
  },
};

const onlineEnmu = {
  1: { text: '在线', status: 'Processing' },
  0: { text: '离线', status: 'Default' },
};

interface DataType {
  _id: number;
  username: string;
  last_login?: string;
  rolecode: number;
  phone?: string;
  email?: string;
  avatar?: string;
  login_status: number;
  rolename: string;
  is_active: boolean;
}

const Users: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [modalVisable, setModalVisable] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  // 点击添加用户按钮，设置窗口弹出
  const addUser = () => {
    setModalVisable(true);
  };

  //并行删除
  const { run: beginDelete, fetches } = useRequest(
    async (_id) => {
      const { status, message: msg } = await deleteUser(_id);
      if (status === 0) {
        message.success(msg);
        refresh();
      } else {
        message.error(msg);
      }
    },
    {
      manual: true,
      fetchKey: (_id) => _id,
    },
  );

  //请求用户列表数据
  const { data, pagination, refresh } = useRequest(
    ({ current, pageSize }) => getUserList({ current, pageSize }),
    {
      paginated: true,
      cacheKey: 'userlist',
      formatResult: (response) => ({ data: response.data, total: response.total }),
    },
  );

  //当全部选中的时候
  const selectAll = () => {
    setSelectedRowKeys(data?.data.map((item: DataType) => item._id));
  };

  //定义选中行
  const rowSelection = {
    preserveSelectedRowKeys: true,
    selectedRowKeys,
    onChange: (keys: ReactText[], selectedRows: DataType[]) => {
      setSelectedRowKeys(keys);
    },
  };
  console.log('pagination :>> ', pagination);
  return (
    <PageHeaderWrapper>
      <Card>
        <ProList
          actionRef={actionRef}
          dataSource={data?.data}
          pagination={{
            ...pagination,
            showQuickJumper: true,
            size: 'small',
          }}
          toolBarRender={() => {
            return [
              <Space size="small">
                {/* <Button key="selectAll" type="default" onClick={selectAll}>
                  全选
                </Button> */}
                <Button key="addUser" type="primary" onClick={addUser}>
                  添加
                </Button>
                <Popconfirm
                  placement="topRight"
                  title="确认删除吗？"
                  onConfirm={beginDelete}
                  okText="Yes"
                  cancelText="No"
                  key="deleteManyTip"
                >
                  {/* <Button
                    danger
                    key="deleteMany"
                    type="primary"
                    disabled={selectedRowKeys.length > 0 ? false : true}
                    // onClick={() => {
                    //   ;
                    // }}
                  >
                    删除
                  </Button> */}
                </Popconfirm>
              </Space>,
            ];
          }}
          rowKey="_id"
          headerTitle="用户列表"
          showActions="always"
          showExtra="always"
          // rowSelection={rowSelection}
          split={true}
          metas={{
            title: {
              title: '用户',
              dataIndex: 'username',
            },
            subTitle: {
              dataIndex: 'rolecode',
              render: (dom, row) => {
                return (
                  <Row gutter={[4, 8]}>
                    <Col>
                      <Tag color={roleColor[row.rolecode]['color']}>{row.rolename}</Tag>
                    </Col>
                    <Col>
                      <Tag color={activeEnum[String(row.is_active)]['color']}>
                        {activeEnum[String(row.is_active)]['text']}
                      </Tag>
                    </Col>
                  </Row>
                );
              },
            },

            avatar: {
              dataIndex: 'avatar',
              render: (_, row) => {
                return (
                  <Row gutter={[4, 8]}>
                    {row.avatar ? (
                      <Avatar shape="square" src={row.avatar} />
                    ) : (
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    )}
                  </Row>
                );
              },
            },
            actions: {
              dataIndex: 'actions',
              render: (text, row) => [
                <Button key="editUser" type="link">
                  编辑
                </Button>,
                <Popconfirm
                  placement="topRight"
                  title="确认删除吗？"
                  onConfirm={(params) => {
                    beginDelete(row?._id);
                  }}
                  okText="Yes"
                  cancelText="No"
                  key="deleteTip"
                >
                  <Button
                    key="deleteOne"
                    loading={fetches[row._id]?.loading}
                    type="link"
                    // onClick={() => {
                    //   beginDelete(row?._id);
                    // }}
                  >
                    删除
                  </Button>
                  ,
                </Popconfirm>,
              ],
            },
            content: {
              dataIndex: 'login_status',
              valueEnum: {
                1: { text: '在线', status: 'Processing' },
                0: { text: '离线', status: 'Default' },
              },
              render: (_, row) => {
                return (
                  <Row gutter={[16, 8]}>
                    <Col>{_}</Col>
                    <Col>
                      {row.phone ? (
                        <Tag icon={<ShakeOutlined twoToneColor="red" />} color="red">
                          {row.phone}
                        </Tag>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col>
                      {row.email !== '' ? (
                        <Tag icon={<MailTwoTone twoToneColor="blue" />} color="blue">
                          {row.email}
                        </Tag>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col>{row.last_login ? moment(row.last_login).fromNow() : null}</Col>
                  </Row>
                );
              },
            },
          }}
        />
      </Card>
      <UserModal refresh={refresh} modalVisable={modalVisable} setModalVisable={setModalVisable} />
    </PageHeaderWrapper>
  );
};

export default Users;
