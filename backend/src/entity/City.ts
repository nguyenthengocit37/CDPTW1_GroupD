import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class City extends AbstractEntity {
  @Column({ unique: true })
  name: string;
}
