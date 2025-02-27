import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Company } from '@companies/entities/company.entity';
import { AbstractBaseEntity } from '@/entities/base.entity';

export enum UserType {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  USER = 'user',
}

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
}

export enum JobStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

@Entity('jobs')
export class Job extends AbstractBaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  salary_range: string;

  @Column({ nullable: true })
  skills_required: string;

  @Column({ nullable: true })
  company_name: string;

  @ManyToOne(() => Company, company => company.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  company: Company;

  @Column({
    type: 'enum',
    enum: JobType,
    default: JobType.FULL_TIME,
  })
  job_type: JobType;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.OPEN,
  })
  status: JobStatus;

  @DeleteDateColumn()
  deletedAt: Date;
}
