import { useState, useEffect } from 'react';
import { useRequest } from 'umi';
import ProCard from '@ant-design/pro-card';
import { Row, Col, Card, Badge } from 'antd';
import { getToolList } from '@/services/ant-design-pro/tool';
import styles from './index.less';
import Articleoriginal from './articleoriginal';
import Baidupcrank from './baidupcrank';

const dynamicPanes = {
  articleoriginal: <Articleoriginal />,
  baidupcrank: <Baidupcrank />,
};

type toolboxPanel = {
  title: string;
  key: string;
};

export default function index() {
  const { Meta } = Card;
  const [panes, setPanes] = useState<toolboxPanel[]>([]);
  const [activeKey, setActiveKey] = useState('toolbox');
  const [tool, setTool] = useState<string>();
  const [lastIndex, setLastindex] = useState<number>(-1);
  const [skipEffect, setSkipEffect] = useState<boolean>(false);

  const { data, error, loading } = useRequest(getToolList, {
    formatResult: (response) => response.data,
    cacheKey: 'toollist',
  });

  const changeTabs = (key: string) => {
    setActiveKey(key);
    setTool(key);
  };

  const remove = (key: string) => {
    panes.forEach((pane, i) => {
      if (pane.key === key) {
        setLastindex(i - 1);
      }
    });
    setSkipEffect(false);
    setPanes(panes.filter((pane) => pane.key !== key));
  };

  const editTabs = (targetKey: string, action: string) => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };

  //新增
  //永远最新

  //删除
  //后面还有没有，有就后面，没有就检查前面，有就前面，没有就box

  const openTool = (tool) => {
    const { toolname, toolPath } = tool;
    const exist = panes.find((item) => item.key === toolPath);
    if (!exist) {
      setSkipEffect(true);
      setPanes([...panes, { title: toolname, key: toolPath }]);
    }
    changeTabs(toolPath);
  };

  useEffect(() => {
    if (!skipEffect) {
      if (panes.length <= 0) {
        setActiveKey('toolbox');
        setTool(undefined);
      } else {
        if (lastIndex === -1) {
          changeTabs(panes[lastIndex + 1].key);
        } else {
          changeTabs(panes[lastIndex].key);
        }
      }
    }
  }, [panes, skipEffect]);

  return (
    <ProCard
      ghost
      bordered={true}
      tabs={{
        type: 'editable-card',
        hideAdd: true,
        onChange: changeTabs,
        activeKey: activeKey,
        onEdit: editTabs,
        animated: false,
      }}
      headerBordered={false}
      layout="center"
    >
      <ProCard.TabPane key="toolbox" tab="工具箱" closable={false}>
        <Row gutter={[16, 16]}>
          {data?.map((item: any) => {
            return (
              <Col
                xs={24}
                sm={24}
                md={8}
                lg={8}
                xl={4}
                key={item._id}
                onClick={() => {
                  openTool(item);
                }}
              >
                <Card loading={loading} bordered hoverable>
                  <Meta
                    title={
                      <Badge
                        showZero
                        style={{
                          backgroundColor: item.toolApiRest < 50 ? 'red' : '#52c41a',
                        }}
                        count={item.toolApiRest}
                        offset={[20, 7]}
                      >
                        {item.toolname}
                      </Badge>
                    }
                    description={item.tooldesc}
                  />
                  <div className={styles.provider}>
                    <a>{item.toolProvider}</a>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </ProCard.TabPane>
      {panes?.map((pane) => (
        <ProCard.TabPane tab={pane.title} key={pane.key}>
          {tool ? dynamicPanes[tool] : null}
        </ProCard.TabPane>
      ))}
    </ProCard>
  );
}
