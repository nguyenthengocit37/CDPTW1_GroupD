import { Job } from '../../../types/Job';
import axiosClient from '../config';

export const getJobs = ({ page }: { page?: number }): Promise<{count:number;data:Job[]}> => {
  return axiosClient.get<{count:number;data:Job[]}>(`job?page=${page}`).then(({data}) => data);
};
export const getJob = ({ slug }: { slug?: string }): Promise<Job> => {
  return axiosClient.get<Job>(`job/${slug}`).then(({ data }) => data);
};
