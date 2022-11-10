import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class JobTitle extends AbstractEntity {
  @Column({ type: 'longtext' })
  title: string;

  @Column({ default: '' })
  subTitle?: string = '';
}
