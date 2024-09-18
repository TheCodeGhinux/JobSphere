import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { AbstractBaseEntity } from '@entities/base.entity';
import * as bcrypt from 'bcryptjs';
import { UserType } from '@user/entities/user.entity';

@Entity('companies')
export class Company extends AbstractBaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column()
  company_email: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.COMPANY, nullable: true })
  user_type: UserType;

  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
