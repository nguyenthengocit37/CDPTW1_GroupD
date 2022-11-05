import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class JobTitle extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  subTitle?: string;
}
