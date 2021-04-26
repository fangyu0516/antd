import { Suspense } from 'react';
import { InfoCircleOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-card';
import { Row, Col, Space, Tooltip, Typography, Card, Tabs, DatePicker } from 'antd';
import styles from './index.less';
import DemoArea from './demoArea';
import DemoTinyColumn from './demoColumn';
import DemoProgress from './demoProgress';
import NormalColumn from './normalColumn';
import moment from 'moment';
import numeral from 'numeral';

const { RangePicker } = DatePicker;
const { Statistic } = StatisticCard;
const { Text } = Typography;
const dateFormat = 'YYYY/MM/DD';
const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}
export default () => {
  return (
    <>
      <Row gutter={[24, 12]}>
        <Col xs={24} sm={24} md={6}>
          <StatisticCard
            title="日销售"
            extra={
              <Tooltip title="所有渠道总和">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,0.5)' }} />
              </Tooltip>
            }
            statistic={{
              value: 55160,
              prefix: '¥',
              description: (
                <Space size="middle">
                  <Statistic
                    suffix={<CaretUpOutlined style={{ color: 'green', fontSize: 10 }} />}
                    title={<Text className={styles.statisticTitle}> 周同比 </Text>}
                    value="11.3%"
                    valueStyle={{ color: 'black', fontSize: 14 }}
                  />
                  <Statistic
                    suffix={<CaretDownOutlined style={{ color: 'red', fontSize: 10 }} />}
                    title={<Text className={styles.statisticTitle}> 日同比 </Text>}
                    value="12.6%"
                    valueStyle={{ color: 'black', fontSize: 14 }}
                  />
                </Space>
              ),
            }}
            footer={
              <>
                <Statistic
                  value={126.13}
                  precision={2}
                  title="月销售额"
                  suffix="万"
                  layout="horizontal"
                />
                <Statistic
                  suffix={<CaretUpOutlined style={{ color: 'green', fontSize: 10 }} />}
                  title="月同比"
                  value="5.6%"
                  valueStyle={{ color: 'black' }}
                  layout="horizontal"
                />
              </>
            }
          />
        </Col>

        <Col xs={24} sm={24} md={6}>
          <StatisticCard
            title="新用户"
            extra={
              <Tooltip title="所有渠道总和">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,0.5)' }} />
              </Tooltip>
            }
            statistic={{
              value: 9,
            }}
            footer={
              <Statistic
                title={<Text className={styles.statisticTitle}> 转化率 </Text>}
                value="11.3%"
                valueStyle={{ color: 'black', fontSize: 14 }}
              />
            }
            chart={<DemoArea />}
          />
        </Col>

        <Col xs={24} sm={24} md={6}>
          <StatisticCard
            title="日访问量（ UV ）"
            extra={
              <Tooltip title="所有渠道总和">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,0.5)' }} />
              </Tooltip>
            }
            statistic={{
              value: 325,
            }}
            footer={
              <Space size="middle">
                <Statistic
                  suffix={<CaretUpOutlined style={{ color: 'green', fontSize: 10 }} />}
                  title={<Text className={styles.statisticTitle}> 周同比 </Text>}
                  value="11.3%"
                  valueStyle={{ color: 'black', fontSize: 14 }}
                />
                <Statistic
                  suffix={<CaretDownOutlined style={{ color: 'red', fontSize: 10 }} />}
                  title={<Text className={styles.statisticTitle}> 日同比 </Text>}
                  value="12.6%"
                  valueStyle={{ color: 'black', fontSize: 14 }}
                />
              </Space>
            }
            chart={<DemoTinyColumn />}
          />
        </Col>

        <Col xs={24} sm={24} md={6}>
          <StatisticCard
            title="目标进度"
            extra={
              <Tooltip title="所有渠道总和">
                <InfoCircleOutlined style={{ color: 'rgba(0,0,0,0.5)' }} />
              </Tooltip>
            }
            statistic={{
              suffix: '%',
              value: 60,
            }}
            footer={
              <Space size="middle">
                <Statistic
                  suffix={<CaretUpOutlined style={{ color: 'green', fontSize: 10 }} />}
                  title={<Text className={styles.statisticTitle}> 周同比 </Text>}
                  value="11.3%"
                  valueStyle={{ color: 'black', fontSize: 14 }}
                />
                <Statistic
                  suffix={<CaretDownOutlined style={{ color: 'red', fontSize: 10 }} />}
                  title={<Text className={styles.statisticTitle}> 日同比 </Text>}
                  value="12.6%"
                  valueStyle={{ color: 'black', fontSize: 14 }}
                />
              </Space>
            }
            chart={<DemoProgress />}
          />
        </Col>
      </Row>

      <Row gutter={[24, 12]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card bodyStyle={{ marginTop: 24 }}>
            <Tabs
              tabBarExtraContent={
                <Space size="large">
                  <a>今日</a>
                  <a>本周</a>
                  <a>本月</a>
                  <a>全年</a>
                  <RangePicker
                    defaultValue={[
                      moment('2015/01/01', dateFormat),
                      moment('2015/12/31', dateFormat),
                    ]}
                    format={dateFormat}
                    style={{ width: 256 }}
                  />
                </Space>
              }
            >
              <Tabs.TabPane tab="销售额" key="1">
                <Row gutter={[12, 12]} style={{ marginTop: 24 }}>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <NormalColumn />
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${
                                i < 3 ? styles.active : ''
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <span className={styles.rankingItemValue}>
                              {numeral(item.total).format('0,0')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="访问量" key="2">
                <NormalColumn />
              </Tabs.TabPane>
            </Tabs>
          </Card>

          <Row gutter={24}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}></Suspense>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
