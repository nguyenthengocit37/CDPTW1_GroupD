import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ERROR_IMAGE } from '../../common/enum';
import { getShortDescription, trimString } from '../../common/helper';
import { City } from '../../types/City';
import { Job } from '../../types/Job';
import { Skill } from '../../types/Skill';
import {
  CompanyImage,
  JobDescription,
  JobDetailWrapper,
  JobTitle,
  JobWrapper,
  SkillStyled,
  SkillWrapper,
  MoreInfoWrapper,
  CityStyled,
  DistanceTimeCreatedStyled,
  ImageCompanyWrapper,
} from './job.style';

interface props {
  data: Job;
}

function JobComponent({ data: job }: props) {
  const navigate = useNavigate();
  return (
    <JobWrapper className="job" onClick={() => navigate(`/job/${job.slug}`)}>
      <ImageCompanyWrapper>
        <CompanyImage
          src={job.company.imageUrl || 'error'}
          fallback={ERROR_IMAGE}
          height={120}
          width={120}
        />
      </ImageCompanyWrapper>
      <JobDetailWrapper>
        <JobTitle onClick={() => navigate(`/job/${job.slug}`)}>
          {trimString(job.jobTitle.title, 50)}
        </JobTitle>
        <JobDescription>
          {getShortDescription(job.description, '.job-details__paragraph')}
        </JobDescription>
        <SkillWrapper>
          {job.skills &&
            job.skills.length > 0 &&
            job.skills.map((skill) => (
              <SkillStyled key={skill.name}>
                <span>{skill.name}</span>
              </SkillStyled>
            ))}
        </SkillWrapper>
      </JobDetailWrapper>
      <MoreInfoWrapper>
        {job.company.city &&
          job.company.city.length > 0 &&
          job.company.city.map((city) => <CityStyled key={city.name}>{city.name}</CityStyled>)}
        <DistanceTimeCreatedStyled>
          {job.createdDate?.toString() || `10 m`}
        </DistanceTimeCreatedStyled>
      </MoreInfoWrapper>
    </JobWrapper>
  );
}

export default JobComponent;
