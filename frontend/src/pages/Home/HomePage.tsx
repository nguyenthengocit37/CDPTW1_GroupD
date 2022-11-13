import React, { useState } from 'react';
import { Button, Form, Input, Select, Spin, Empty, Pagination, PaginationProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Container, ContentWrapper, SearchWrapper } from './homepage.style';
import JobComponent from '../../components/Job/Job';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../../services/api/job/jobApi';
import { Job } from '../../types/Job';

const { Option } = Select;

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const onCityChange = (value: string) => {};

  const { isLoading, data } = useQuery(
    ['jobs', page],
    () => {
      return getJobs({ page });
    },
    {
      keepPreviousData: true,
    }
  );
  console.log(data);
  const onPageChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

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
          data?.data && data?.data.length > 0 ? (
            data?.data.map((job: Job) => <JobComponent key={job.id} data={job} />)
          ) : (
            <Empty />
          )
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        )}
        {!isLoading && data?.count && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Pagination defaultCurrent={page} onChange={onPageChange} pageSize={20} showSizeChanger={false} total={data?.count} />
          </div>
        )}
      </ContentWrapper>
    </Container>
  );
}
