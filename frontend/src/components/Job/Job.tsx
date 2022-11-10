import React from 'react';
import { ERROR_IMAGE } from '../../common/enum';
import {
  CompanyImage,
  JobDetailWrapper,
  JobTitle,
  JobWrapper,
  Skill,
  SkillWrapper,
} from './job.style';

type Props = {
  image?: string;
  title: string;
  city: string;
  skills: string[];
};

function Job({ image = '', title, city, skills }: Props) {
  return (
    <JobWrapper>
      <CompanyImage src={image || 'error'} fallback={ERROR_IMAGE} />
      <JobDetailWrapper>
        <JobTitle>{title}</JobTitle>
        <SkillWrapper>
          {skills && skills.length > 0 && skills.map((skill) => <Skill>{skill}</Skill>)}
        </SkillWrapper>
      </JobDetailWrapper>
    </JobWrapper>
  );
}

export default Job;
