import { AbstractType } from './abstractType';

export interface JobTitle extends AbstractType {
  title: string;
  subTitle?: string;
}
