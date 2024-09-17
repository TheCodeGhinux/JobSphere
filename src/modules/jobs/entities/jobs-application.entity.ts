import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Job } from './job.entity';
import { User } from '@user/entities/user.entity';
import { AbstractBaseEntity } from '@entities/base.entity';

@Entity('job_applications')
export class JobApplication extends AbstractBaseEntity {
  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Job, job => job.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  job: Job;

  @Column({
    type: 'enum',
    enum: ['applied', 'interview', 'offer', 'rejected', 'hired'],
    default: 'applied',
  })
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'hired';

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  appliedAt: Date;
}
