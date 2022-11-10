import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Skill extends AbstractEntity {
  @Column()
  name: string;
}
