import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdDate: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedDate: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
