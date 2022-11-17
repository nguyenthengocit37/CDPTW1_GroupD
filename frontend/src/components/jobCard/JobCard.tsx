import React from 'react';
import { Card } from 'antd';
import { Job } from '../../types/Job';

type Props = {
  job: Job;
};

const JobCard = ({ job }: Props) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={job.description} src={job.company.imageUrl} />}
    >
      <Card.Meta title={job.jobTitle.title} description={job.description} />
    </Card>
  );
};

export default JobCard;
