import axiosClient from '../config';
interface Job {
  id: number;
  title: string;
}
export const getJobs = () => {
  return axiosClient.get('/job');
};
