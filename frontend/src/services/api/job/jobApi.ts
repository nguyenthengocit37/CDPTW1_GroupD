import { Job } from '../../../types/Job';
import axiosClient from '../config';

export const getJobs = (): Promise<Job[]> => {
  return axiosClient.get<Job[]>('job').then(({ data }) => data);
};
