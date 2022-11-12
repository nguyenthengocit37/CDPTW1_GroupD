import React from 'react';
import { ERROR_IMAGE } from '../../common/enum';
import { getShortDescription } from '../../common/helper';
import { City } from '../../types/City';
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

type Props = {
  image?: string;
  title: string;
  cities: City[];
  description: string;
  createdDate?: Date;
  skills: Skill[];
};

function Job({ image = '', title, cities, createdDate, description, skills }: Props) {
  return (
    <JobWrapper className="job">
      <ImageCompanyWrapper>
        <CompanyImage src={image || 'error'} fallback={ERROR_IMAGE} height={120} width={120} />
      </ImageCompanyWrapper>
      <JobDetailWrapper>
        <JobTitle>{title}</JobTitle>
        <JobDescription>
          {getShortDescription(description, '.job-details__paragraph')}
        </JobDescription>
        <SkillWrapper>
          {skills &&
            skills.length > 0 &&
            skills.map((skill) => (
              <SkillStyled key={skill.name}>
                <span>{skill.name}</span>
              </SkillStyled>
            ))}
        </SkillWrapper>
      </JobDetailWrapper>
      <MoreInfoWrapper>
        {cities &&
          cities.length > 0 &&
          cities.map((city) => <CityStyled key={city.name}>{city.name}</CityStyled>)}
        <DistanceTimeCreatedStyled>{createdDate?.toString() || `10 m`}</DistanceTimeCreatedStyled>
      </MoreInfoWrapper>
    </JobWrapper>
  );
}

export default Job;
