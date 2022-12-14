import styled from 'styled-components';
import { Image } from 'antd';

export const JobWrapper = styled.div`
  display: flex;
  border-top: 1px solid #e7e7e7;
  background: #fff;
  height: 12rem;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 6px 0 #c4c7cc;
  }
  & + .job {
    margin: 2rem 0;
  }
`;
export const MoreInfoWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;
export const DistanceTimeCreatedStyled = styled.div`
  text-align: end;
  color: #ea1e30;
`;
export const CompanyImage = styled(Image)``;
export const JobDetailWrapper = styled.div`
  padding: 2rem;
  flex: 1;
`;
export const JobTitle = styled.h2`
  &:hover {
    color: #ea1e30;
    cursor: pointer;
  }
`;
export const JobDescription = styled.p``;
export const SkillWrapper = styled.div`
  display: flex;
`;
export const SkillStyled = styled.div`
  margin: 0 1rem;
  padding: 7px 9px;
  background: transparent;
  border: 1px solid #d2d3d3;
  font-weight: normal;
  text-decoration: none;
  line-height: 100%;
  display: inline-block;
  border-radius: 10px;
  white-space: nowrap;
  &:hover {
    color: #ea1e30;
    cursor: pointer;
    border: 1px solid #ea1e30;
  }
  &.active {
    background: #ea1e30;
    color: #fff;
  }
  &.active:hover{
    opacity: 0.7;
    color: #fff;
  }
  span {
    font-size: 16px;
  }
`;
export const CityStyled = styled.div`
&:hover{
  color: #ea1e30;
}
`;
export const ImageCompanyWrapper = styled.div`
  width: 15rem;
  height: auto;
  text-align: center;
  margin: auto;
`;
