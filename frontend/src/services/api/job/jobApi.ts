import { Job } from '../../../types/Job';
import axiosClient from '../config';

export const getJobs = ({ page }: { page?: number }): Promise<Job[]> => {
  return axiosClient.get<Job[]>(`job?page=${page}`).then(({ data }) => data);
};
export const getJob = ({ slug }: { slug?: string }): Promise<Job> => {
  return axiosClient.get<Job>(`job/${slug}`).then(({ data }) => data);
};
