import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

import { Container, ContentWrapper, SearchWrapper } from './homepage.style';
import JobComponent from '../../components/Job/Job';

const { Option } = Select;

export default function HomePage() {
  const [form] = Form.useForm();

  const onCityChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  return (
    <Container>
      <SearchWrapper>
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          style={{ justifyContent: 'center', marginTop: '2rem' }}
        >
          <Form.Item name="job">
            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="Keyword job..."
              size="large"
            />
          </Form.Item>
          <Form.Item name="city">
            <Select
              placeholder="Select a option and change input text above"
              onChange={onCityChange}
              style={{ width: 150 }}
              size="large"
              allowClear
            >
              <Option value="hochiminh">Ho Chi Minh</Option>
              <Option value="Da Nang">Da Nang</Option>
              <Option value="Ha Noi">Ha Noi</Option>
            </Select>
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" htmlType="submit" size="large">
                Search
              </Button>
            )}
          </Form.Item>
        </Form>
      </SearchWrapper>
      <ContentWrapper>
        <JobComponent title="hehehe" city="Ho chi minh" skills={['he', 'hi']} />
      </ContentWrapper>
    </Container>
  );
}
