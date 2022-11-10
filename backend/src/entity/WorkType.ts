import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class WorkType extends AbstractEntity {
  @Column({ unique: true })
  name: string;
}
