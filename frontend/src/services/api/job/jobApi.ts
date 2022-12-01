import { Job } from '../../../types/Job';
import axiosClient from '../config';

export const getJobs = ({
  page=1,
  city='',
  keyword='',
  skill='',
  take
}: {
  page?: number;
  city?: string;
  keyword?: string;
  skill?:string;
  take?:number
}): Promise<{ count: number; data: Job[] }> => {
  return axiosClient
    .get<{ count: number; data: Job[] }>(`job?page=${page}&city=${city}&keyword=${keyword}&skill=${skill}&${take && `take=${take}`}`)
    .then(({ data }) => data);
};
export const getJob = ({ slug }: { slug?: string }): Promise<Job> => {
  return axiosClient.get<Job>(`job/${slug}`).then(({ data }) => data);
};
export const getRelatedJobs = ({ slug }: { slug?: string }): Promise<Job[]> => {
  return axiosClient.get<Job[]>(`job/related/${slug}`).then(({ data }) => data);
};
