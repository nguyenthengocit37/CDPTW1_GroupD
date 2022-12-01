import { useQuery } from '@tanstack/react-query';
import { Image, Col, List, Row, Spin } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ERROR_IMAGE } from '../../common/enum';
import { getShortDescription } from '../../common/helper';
import Carousel from '../../components/carousel/Carousel';
import { getJob, getJobs, getRelatedJobs } from '../../services/api/job/jobApi';
import { Job } from '../../types/Job';
import {
  DescriptionWrapper,
  MainContentWrapper,
  NewJobTitle,
  NewJobWrapper,
  PageDetailWrapper,
  TitleWrapper,
} from './detailpage.style';

function DetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isLoading, data: job } = useQuery(['job', slug], () => {
    return getJob({ slug });
  });
  const { isLoading:newJobLoading, data: newJobs } = useQuery(['newJobs'], () => {
    return getJobs({ take:5 });
  });
  
  const { isLoading: isRelatedLoading, data: relatedJob } = useQuery(['relatedJob', slug], () => {
    return getRelatedJobs({ slug });
  });

  return (
    <PageDetailWrapper>
      <Row>
        <Col span={6}>
          <NewJobWrapper>
            <List
              itemLayout="horizontal"
              dataSource={newJobs?.data}
              loading={newJobLoading}
              style={{background: '#fff',padding:'0 10px',borderRadius:'20px'}}
              header={<div style={{fontSize:'24px',fontWeight:'600'}}>New Jobs</div>}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Image src={item.company.imageUrl || 'error'}
                    fallback={ERROR_IMAGE}
                    height={50}
                    width={50} />}
                    title={<NewJobTitle onClick={() => navigate(`/job/${item.slug}`)}>{item.jobTitle.title}</NewJobTitle>}
                    description={ getShortDescription(item.description, '.job-details__paragraph')}
                  />
                </List.Item>
              )}
            />
          </NewJobWrapper>
        </Col>
        <Col span={17} offset={1}>
          <MainContentWrapper>
            {isLoading ? (
              <div style={{ textAlign: 'center' }}>
                <Spin size="large" />
              </div>
            ) : (
              job && (
                <>
                  <TitleWrapper>{job?.jobTitle.title}</TitleWrapper>
                  <DescriptionWrapper>
                    <div dangerouslySetInnerHTML={{ __html: job?.description }} />;
                  </DescriptionWrapper>
                </>
              )
            )}
          </MainContentWrapper>
        </Col>
      </Row>
      <div style={{marginTop:'20px'}}>
        <h1 style={{ fontWeight: '600' }}>Related Jobs</h1>
      </div>
      {isRelatedLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Carousel data={relatedJob} isLoading={isRelatedLoading} />
      )}
    </PageDetailWrapper>
  );
}

export default DetailPage;
