import { Skill } from '../../../types/Skill';
import axiosClient from '../config';

export const getSkills = (): Promise<Skill[]> => {
  return axiosClient
    .get<Skill[]>(`skill`)
    .then(({ data }) => data);
};