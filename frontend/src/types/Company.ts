import { AbstractType } from './abstractType';
import { City } from './City';

export interface Company extends AbstractType {
  name: string;
  description: string;
  imageUrl: string;
  city: City[];
}
