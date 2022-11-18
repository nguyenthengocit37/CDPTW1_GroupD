import React from 'react';
import { Card } from 'antd';
import { Job } from '../../types/Job';
import { getShortDescription } from '../../common/helper';
import { useNavigate } from 'react-router-dom';

type Props = {
  job: Job;
};

const JobCard = ({ job }: Props) => {
  const navigate = useNavigate();
  
  return (
    <Card
    hoverable
    style={{ width: 240,borderRadius:'20px',marginBottom:'20px' }}
    cover={<div style={{background:`url('${job.company.imageUrl}') center no-repeat`,height:'200px'}}></div>}
    bodyStyle={{borderTop:'1px solid #d3d3d3'}}
    onClick={() => navigate(`/job/${job.slug}`)}
  >
    <Card.Meta title={job?.jobTitle.title} style={{color:'#000000'}} description={getShortDescription(job.description, '.job-details__paragraph',40)} />
  </Card>
  );
};

export default JobCard;
