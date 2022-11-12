import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdDate: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedDate: Date;
}
