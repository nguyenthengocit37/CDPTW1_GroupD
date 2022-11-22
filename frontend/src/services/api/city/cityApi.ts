import { City } from '../../../types/City';
import axiosClient from '../config';

export const getCities = (): Promise<City[]> => {
  return axiosClient.get('/city').then(({ data }) => data);
};
