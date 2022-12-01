import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Spin, Empty, Pagination, PaginationProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Container, ContentWrapper, SearchWrapper } from './homepage.style';
import JobComponent from '../../components/Job/Job';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../../services/api/job/jobApi';
import { Job } from '../../types/Job';
import { getCities } from '../../services/api/city/cityApi';
import useDebounce from '../../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';

const { Option } = Select;

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [citySelected, setCitySelected] = useState('');
  const [keyword, setKeyword] = useState('');
  const [skill, setSkill] = useState('');
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  
  const debounceValue = useDebounce(keyword, 800);

  const { isLoading, data } = useQuery(
    ['jobs', page, citySelected, debounceValue,skill],
    () => {
      return getJobs({ page, city: citySelected, keyword: debounceValue,skill });
    },
    {
      keepPreviousData: true,
    }
  );
  const { isLoading: isCityLoading, data: cityData } = useQuery(['cities'], () => {
    return getCities();
  });
  const onPageChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };
  
  useEffect(()=>{
    if(debounceValue)setPage(1)
  },[debounceValue])

  useEffect(()=>{
    let skillQuery = searchParams.get("skill");
    if(skillQuery){
      if(skillQuery==='all')skillQuery=''
      setSkill(skillQuery)
    }
    let cityQuery = searchParams.get("city");
    if(cityQuery){
      if(cityQuery === 'all') cityQuery ='';
      setCitySelected(cityQuery)
    }
    let keyword = searchParams.get("keyword");
    if(keyword !== undefined && keyword !== null){
      setKeyword(keyword)
    }
  },[searchParams])
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
              style={{borderRadius: '10px'}}
              value={keyword}
              onChange={(element) => setKeyword(element.target.value)}
            />
          </Form.Item>
          <Form.Item name="city">
            <Select
              placeholder="Select a option and change input text above"
              onChange={(value) => setCitySelected(value)}
              style={{ width: 150 }}
              size="large"
              className='citySelect'
              loading={isCityLoading}
              value={citySelected}
            >
              <Option value="">All cities</Option>
              {!isCityLoading &&
                cityData &&
                cityData.length > 0 &&
                cityData.map((city) => (
                  <Option key={city.name} value={city.name}>
                    {city.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </SearchWrapper>
      <ContentWrapper>
        {!isLoading ? (
          data?.data && data?.data.length > 0 ? (
            data?.data.map((job: Job) => <JobComponent key={job.id} data={job} setSkill={setSkill} currentSearchSkill={skill} setCitySelected={setCitySelected} />)
          ) : (
            <Empty />
          )
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        )}
        {!isLoading && data && data.count > 0 && (
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <Pagination
              defaultCurrent={page}
              current={page}
              onChange={onPageChange}
              pageSize={20}
              showSizeChanger={false}
              total={data.count}
            />
          </div>
        )}
      </ContentWrapper>
    </Container>
  );
}
