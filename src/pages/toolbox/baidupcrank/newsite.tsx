import { useState } from 'react';
import ProForm, { ProFormText, ProFormCheckbox, ProFormTextArea } from '@ant-design/pro-form';
import { Card, Select } from 'antd';
import { queryKeywordsRank } from '@/services/ant-design-pro/tool';
const searchEngine = [
  {
    label: '百度PC',
    value: 'bdpc',
  },
  {
    label: '百度移动',
    value: 'bdmo',
  },
  {
    label: '360',
    value: '360',
  },
  {
    label: '搜狗',
    value: 'sogou',
  },
];
const { Option } = Select;
export default function newsite() {
  const [domainPrefix, setDomainPrefix] = useState<string>('http://');

  const changeDomianPrefix = (value) => {
    setDomainPrefix(value);
  };

  const handleFinish = async (values) => {
    let { domain, keywordlist } = values;
    let newKeywordslist = keywordlist
      .split(/\s/)
      .filter((item: string) => item !== '')
      .map((item: string) => item.trim());
    let data = { ...values, keywordlist: newKeywordslist, domain: domainPrefix + domain.trim() };
    const result = await queryKeywordsRank(data);
  };
  return (
    <Card>
      <ProForm
        onFinish={handleFinish}
        initialValues={{
          searchEngine: ['bdpc'],
        }}
      >
        <ProFormText
          name="domain"
          key="domain"
          label="域名"
          placeholder="请输入域名，如：www.baidu.com"
          rules={[
            {
              required: true,
              whitespace: true,
              message: '请填写域名',
            },
            {
              pattern: /[a-zA-Z0-9\u4e00-\u9fa5-]+[.]+[a-zA-Z0-9\u4e00-\u9fa5]{2,10}$/,
              message: '请填写正确的域名',
            },
          ]}
          fieldProps={{
            addonBefore: (
              <Select
                defaultValue="http://"
                className="select-before"
                onChange={changeDomianPrefix}
              >
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
              </Select>
            ),
          }}
        />
        <ProFormTextArea
          name="keywordlist"
          label="关键词"
          key="keywordlist"
          placeholder="请输入关键词一行一个"
          allowClear
          rules={[
            {
              required: true,
              whitespace: true,
              message: '请至少填写一个关键词',
            },
          ]}
          fieldProps={{
            autoSize: { maxRows: 15, minRows: 15 },
          }}
        />
        <ProFormCheckbox.Group
          name="searchEngine"
          layout="horizontal"
          label="搜索引擎"
          rules={[
            {
              required: true,
              message: '请至少选择一种搜索引擎',
            },
          ]}
          options={searchEngine}
        />
      </ProForm>
    </Card>
  );
}
