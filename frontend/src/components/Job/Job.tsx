import React from 'react';
import { ERROR_IMAGE } from '../../common/enum';
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

type Props = {
  image?: string;
  title: string;
  city: string;
  description?: string;
  createdAt?: string;
  skills: string[];
};

function Job({ image = '', title, city, createdAt, description, skills }: Props) {
  return (
    <JobWrapper>
      <ImageCompanyWrapper>
        <CompanyImage src={image || 'error'} fallback={ERROR_IMAGE} height={120} width={120} />
      </ImageCompanyWrapper>
      <JobDetailWrapper>
        <JobTitle>{title}</JobTitle>
        <JobDescription>{description}</JobDescription>
        <SkillWrapper>
          {skills &&
            skills.length > 0 &&
            skills.map((skill) => (
              <SkillStyled>
                <span>{skill}</span>
              </SkillStyled>
            ))}
        </SkillWrapper>
      </JobDetailWrapper>
      <MoreInfoWrapper>
        <CityStyled>{city}</CityStyled>
        <DistanceTimeCreatedStyled>{createdAt || '5h'}</DistanceTimeCreatedStyled>
      </MoreInfoWrapper>
    </JobWrapper>
  );
}

export default Job;
