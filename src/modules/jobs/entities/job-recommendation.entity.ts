import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Job } from './job.entity';
import { User } from '@user/entities/user.entity';
import { AbstractBaseEntity } from '@entities/base.entity';

@Entity('job_recommendations')
export class JobRecommendation extends AbstractBaseEntity {
  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Job, job => job.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  job: Job;
}
