import ProCard from '@ant-design/pro-card';
import { Row, Col, Card, Select } from 'antd';
import AddNewSite from './newsite';
export default () => {
  return (
    <ProCard ghost headerBordered={true} split="vertical">
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <ProCard ghost>
            <AddNewSite />
          </ProCard>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <ProCard ghost>
            <Card>123123123123</Card>
          </ProCard>
        </Col>
      </Row>
    </ProCard>
  );
};
