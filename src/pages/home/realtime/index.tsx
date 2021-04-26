import { forwardRef,useState } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import TweenOneGroup from 'rc-tween-one/lib/TweenOneGroup';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const initData = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default function index() {
  const [data, setData] = useState(initData);

  const handleAdd = () => {
    let newData = {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    };
    setData([newData, ...data]);
  };

  return (
    <div>
      <Table
        components={{
          body: {
            wrapper: (params) => {
              return (
                <TweenOneGroup
                  component="tbody"
                  enter={[
                    {
                      opacity: 0,
                      x: 30,
                      backgroundColor: '#fffeee',
                      duration: 0,
                    },
                    {
                      height: 0,
                      duration: 200,
                      type: 'from',
                      delay: 250,
                      ease: 'easeOutQuad',
                    },
                    {
                      opacity: 1,
                      x: 0,
                      duration: 250,
                      ease: 'easeOutQuad',
                    },
                    { delay: 1000, backgroundColor: '#fff' },
                  ]}
                  appear={false}
                  exclusive
                  className={params.className}
                >
                  {params.children}
                </TweenOneGroup>
              );
            },
          },
        }}
        columns={columns}
        dataSource={data}
      ></Table>
      <Button onClick={handleAdd}> add </Button>
    </div>
  );
}
