import { useQuery } from '@tanstack/react-query';
import { Col, Row, Spin } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../../components/carousel/Carousel';
import { getJob, getRelatedJobs } from '../../services/api/job/jobApi';
import { Job } from '../../types/Job';
import {
  DescriptionWrapper,
  MainContentWrapper,
  NewJobWrapper,
  PageDetailWrapper,
  TitleWrapper,
} from './detailpage.style';

function DetailPage() {
  const { slug } = useParams();
  const { isLoading, data: job } = useQuery(['job', slug], () => {
    return getJob({ slug });
  });
  const { isLoading: isRelatedLoading, data: relatedJob } = useQuery(['relatedJob', slug], () => {
    return getRelatedJobs({ slug });
  });
  console.log(relatedJob);

  return (
    <PageDetailWrapper>
      <Row>
        <Col span={6}>
          <NewJobWrapper></NewJobWrapper>
        </Col>
        <Col span={18}>
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
        <div><h1 style={{fontWeight:'600'}}>Related Jobs</h1></div>
        {isRelatedLoading ?
          (<div style={{ textAlign: 'center' }}>
            <Spin size="large" />
          </div>) :
          <Carousel data={relatedJob} isLoading={isRelatedLoading} />
        }

    </PageDetailWrapper>
  );
}

export default DetailPage;
