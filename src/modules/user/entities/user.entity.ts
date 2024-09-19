import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AbstractBaseEntity } from '@entities/base.entity';
import { Exclude } from 'class-transformer';

export enum UserType {
  SUPER_ADMIN = 'super-admin',
  COMPANY = 'company',
  USER = 'user',
}

@Entity({ name: 'users' })
export class User extends AbstractBaseEntity {
  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: false, nullable: true })
  status: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  is_active: boolean;

  @Column({ nullable: false, enum: UserType, default: UserType.USER })
  user_type: UserType;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  // hashPassword: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
