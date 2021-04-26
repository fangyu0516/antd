import { memo, useState } from 'react';
import { Button, Space, Select } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import Text from 'antd/lib/typography/Text';
import { DrawerForm } from '@ant-design/pro-form';
import AddNewSite from '@/pages/toolbox/baidupcrank/newsite';

export type Status = {
  color: string;
  text: string;
};

const statusMap = {
  0: {
    color: 'blue',
    text: '进行中',
  },
  1: {
    color: 'green',
    text: '已完成',
  },
  2: {
    color: 'volcano',
    text: '警告',
  },
  3: {
    color: 'red',
    text: '失败',
  },
  4: {
    color: '',
    text: '未完成',
  },
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: Status;
  createdAt: number;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'www.anbe3d.com',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: statusMap[Math.floor(Math.random() * 10) % 5],
    createdAt: Date.now() - Math.floor(Math.random() * 100000),
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '网站',
    width: 120,
    dataIndex: 'name',
    // ellipsis: true,
    align: 'center',
    filters: true,
    render: (_) => <a> {_}</a>,
  },
  {
    title: '收录',
    width: 120,
    dataIndex: 'status',
    align: 'center',
    search: false,
    render: (_, record) => (
      <Space size="middle">
        <Text type="secondary">123</Text>
        <Space size="small">
          <ArrowUpOutlined style={{ fontSize: 15, color: '#52c41a' }} />
          <Text type="success">12</Text>
          <ArrowDownOutlined style={{ fontSize: 15, color: 'red' }} />
          <Text type="danger">15</Text>
        </Space>
      </Space>
    ),
  },
  {
    title: '关键词数量',
    width: 120,
    dataIndex: 'containers',
    align: 'center',
    search: false,
    sorter: (a, b) => a.containers - b.containers,
    render: (_, record) => (
      <Space size="middle">
        <Text type="secondary">123</Text>
        <Space size="small">
          <ArrowUpOutlined style={{ fontSize: 15, color: '#52c41a' }} />
          <Text type="success">12</Text>
          <ArrowDownOutlined style={{ fontSize: 15, color: 'red' }} />
          <Text type="danger">15</Text>
        </Space>
      </Space>
    ),
  },

  {
    title: '前10名',
    width: 120,
    dataIndex: 'containers',
    align: 'center',
    search: false,
    sorter: (a, b) => a.containers - b.containers,
    render: (_, record) => (
      <Space size="middle">
        <Text type="secondary">123</Text>
        <Space size="small">
          <ArrowUpOutlined style={{ fontSize: 15, color: '#52c41a' }} />
          <Text type="success">12</Text>
          <ArrowDownOutlined style={{ fontSize: 15, color: 'red' }} />
          <Text type="danger">15</Text>
        </Space>
      </Space>
    ),
  },
  {
    title: '前50名',
    width: 120,
    search: false,
    dataIndex: 'containers',
    align: 'center',
    sorter: (a, b) => a.containers - b.containers,
    render: (_, record) => (
      <Space size="middle">
        <Text type="secondary">123</Text>
        <Space size="small">
          <ArrowUpOutlined style={{ fontSize: 15, color: '#52c41a' }} />
          <Text type="success">12</Text>
          <ArrowDownOutlined style={{ fontSize: 15, color: 'red' }} />
          <Text type="danger">15</Text>
        </Space>
      </Space>
    ),
  },
  {
    title: '前100名',
    width: 120,
    dataIndex: 'containers',
    align: 'center',
    search: false,
    sorter: (a, b) => a.containers - b.containers,
    render: (_, record) => (
      <Space size="middle">
        <Text type="secondary">123</Text>
        <Space size="small">
          <ArrowUpOutlined style={{ fontSize: 15, color: '#52c41a' }} />
          <Text type="success">12</Text>
          <ArrowDownOutlined style={{ fontSize: 15, color: 'red' }} />
          <Text type="danger">15</Text>
        </Space>
      </Space>
    ),
  },
  {
    title: '添加时间',
    width: 80,
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'date',
    align: 'center',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },

  {
    title: '管理',
    width: 80,
    key: 'since',
    dataIndex: 'creator',
    align: 'center',
  },

  {
    title: '操作',
    width: 100,
    key: 'option',
    valueType: 'option',
    align: 'center',
    render: () => [<a key="1">加词</a>, <a key="2">监控</a>],
  },
];

const expandedRowRender = () => {
  const data = [];
  for (let i = 0; i < 3; i += 1) {
    data.push({
      key: i,
      keywords: '网站模板哪个公司的比较好' + i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    });
  }
  return (
    <ProTable
      columns={[
        { title: '关键词', dataIndex: 'keywords', key: 'keywords' },
        { title: '百度PC', dataIndex: 'name', key: 'name' },
        { title: '百度移动', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        { title: '360好搜', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        { title: '搜狗', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          valueType: 'option',
          render: () => [<a key="pause">停止</a>, <a key="stop">删除</a>],
        },
      ]}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
    />
  );
};

export default memo(() => {
  const [showAddNewSite, setShowAddNewSite] = useState<boolean>(false);
  return (
    <>
      <ProTable<TableListItem>
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        expandable={{ expandedRowRender }}
        search={{
          searchText: '搜索查询',
          resetText: '重置吧',
          defaultCollapsed: false,
        }}
        dateFormatter="string"
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
        }}
        toolBarRender={() => [
          <Space size="large">
            <Button key="primary" type="primary" onClick={() => setShowAddNewSite(true)}>
              添加网站
            </Button>
            <Select
              defaultValue="week"
              style={{ width: 120 }}
              options={[
                { label: '按周', value: 'week' },
                { label: '按月', value: 'month' },
                { label: '按年', value: 'year' },
              ]}
            ></Select>
            <Select
              key="out"
              defaultValue="current"
              style={{ width: 120 }}
              defaultActiveFirstOption={true}
              options={[
                { label: '导出当前页', value: 'current' },
                { label: '导出选择项', value: 'selected' },
                { label: '导出所有', value: 'all' },
              ]}
            ></Select>
          </Space>,
        ]}
      />

      <DrawerForm
        onVisibleChange={(value) => {
          setShowAddNewSite(value);
        }}
        width={480}
        title="新增网站"
        visible={showAddNewSite}
        onFinish={async () => {
          return true;
        }}
      >
        <AddNewSite />
      </DrawerForm>
    </>
  );
});
