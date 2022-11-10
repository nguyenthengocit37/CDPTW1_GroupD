import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { City } from './City';

@Entity()
export class Company extends AbstractEntity {
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToMany(() => City)
  @JoinTable()
  city: City[];
}
