import ProForm, { ProFormTextArea } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { useState } from 'react';
import {
  Typography,
  Tooltip,
  Button,
  Row,
  Col,
  Input,
  Space,
  Card,
  Spin,
  message,
  Statistic,
} from 'antd';
import {
  EditOutlined,
  ExperimentTwoTone,
  EllipsisOutlined,
  EditTwoTone,
  SettingOutlined,
  CopyTwoTone,
  DiffTwoTone,
} from '@ant-design/icons';
import { useRequest } from 'umi';
import { getAfterArticle } from '@/services/ant-design-pro/tool';
import styles from './index.less';

const { Title, Text, Paragraph } = Typography;
export default (params) => {
  const [beforeArticle, setBeforeArticle] = useState();
  const [afterArticle, setAfterArticle] = useState();
  const [editing, setEditing] = useState(false);
  console.log("qunidaye")
  const inputTextAreaProps = {
    showCount: true,
    maxLength: 5000,
    allowClear: true,
    bordered: false,
    autoSize: { minRows: 20, maxRows: 20 },
  };

  const collectBefore = (event) => {
    const { value } = event.target;
    setBeforeArticle(value);
  };

  const { data, loading, run } = useRequest(
    () => {
      if (beforeArticle === undefined || beforeArticle.trim() === '') {
        return Promise.reject('请输入一段文字');
      }
      return getAfterArticle({ beforeArticle });
    },
    {
      manual: true,
      throwOnError: true,
      onError: (err) => {
        message.warn(err);
      },
      formatResult: (result) => {
        if (result.errcode === '0') {
          return {
            data: result.data,
            like: result.like,
            corewords: result.corewords || 'undefined',
          };
        } else {
          message.error(result.errmsg);
          return {};
        }
      },
    },
  );
  return (
    <>
      <ProCard ghost split="vertical">
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <ProCard ghost>
              <Card
                actions={[
                  <ExperimentTwoTone
                    disabled
                    style={{ animationPlayState: loading ? 'running' : 'paused' }}
                    className={styles.experiment}
                    onClick={run}
                    title="一键改写"
                  />,
                ]}
              >
                <Text type="secondary">之前:</Text>
                <Input.TextArea
                  name="beforeArticle"
                  placeholder="请输入文章内容,不超过5000字"
                  key="beforeArticle"
                  {...inputTextAreaProps}
                  onChange={collectBefore}
                />
              </Card>
            </ProCard>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <ProCard ghost>
              <Card
                actions={[
                  <Row>
                    <Col xs={24} md={24}>
                      <Space>
                        <Text>相似度:</Text>
                        <Statistic
                          valueStyle={{ color: '#3f8600' }}
                          precision={1}
                          value={(data?.like || 0) * 100}
                          suffix="%"
                        ></Statistic>
                      </Space>
                    </Col>
                  </Row>,
                ]}
              >
                <Text type="secondary">之后:</Text>
                {loading ? (
                  <Spin size="small" />
                ) : (
                  <Paragraph
                    ellipsis={{ rows: 21, expandable: true }}
                    editable={loading ? false : true}
                    copyable={loading ? false : true}
                  >
                    {data?.data}
                  </Paragraph>
                )}
              </Card>
            </ProCard>
          </Col>
        </Row>
      </ProCard>
    </>
  );
};
