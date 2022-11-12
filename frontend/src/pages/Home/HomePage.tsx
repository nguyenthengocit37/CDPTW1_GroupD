import React from 'react';
import { Button, Form, Input, Select, Space, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Container, ContentWrapper, SearchWrapper } from './homepage.style';
import JobComponent from '../../components/Job/Job';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../../services/api/job/jobApi';

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

  const {
    isLoading,
    data: jobs,
    error,
  } = useQuery(['jobs'], () => {
    return getJobs();
  });

  return (
    <Container>
      <SearchWrapper>
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          style={{
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <Form.Item name="job" style={{ width: '40%' }}>
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
              defaultValue="all"
            >
              <Option value="all">All cities</Option>
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
        {(jobs &&
          jobs.data.map(() => (
            <JobComponent
              title="hehehe"
              city="Ho chi minh"
              skills={['he', 'hi']}
              description="Thiết kế, xây dựng và phát triển các ứng dụng, phần mềm theo yêu cầu của khách hàng doanh nghiệp, nhà máy."
            />
          ))) || (
          <Space size="middle">
            <Spin size="large" />
          </Space>
        )}
      </ContentWrapper>
    </Container>
  );
}
