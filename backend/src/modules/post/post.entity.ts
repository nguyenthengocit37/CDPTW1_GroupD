import { AbstractEntity } from '@common/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'post' })
export class Post extends AbstractEntity {
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  author: string;
  @Column({ type: 'float', nullable: true, default: 0 })
  salary: number;
}
