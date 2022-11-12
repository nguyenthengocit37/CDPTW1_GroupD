import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { City } from './City';

@Entity()
export class Company extends AbstractEntity {
  @Column({ unique: true })
  name: string;
  @Column({ type: 'longtext' })
  description: string;
  @Column({ type: 'longtext' })
  imageUrl: string;
  @ManyToMany(() => City, { cascade: ['insert', 'remove'], eager: true })
  @JoinTable()
  city: City[];
}
