import React from 'react';
import { Button, Form, Input, Select, Spin, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Container, ContentWrapper, SearchWrapper } from './homepage.style';
import JobComponent from '../../components/Job/Job';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../../services/api/job/jobApi';
import { Job } from '../../types/Job';

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

  const { isLoading, data: jobs } = useQuery(['jobs'], () => {
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
        {!isLoading ? (
          jobs && jobs.length > 0 ? (
            jobs.map((job: Job) => (
              <JobComponent
                image={job.company.imageUrl}
                title={job.jobTitle.title}
                key={job.slug}
                cities={job.company.city}
                description={job.description}
                skills={job.skills}
              />
            ))
          ) : (
            <Empty />
          )
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        )}
      </ContentWrapper>
    </Container>
  );
}
