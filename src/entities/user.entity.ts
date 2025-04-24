import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { Exclude } from 'class-transformer';
// import { Payment } from './payment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ default: 'active' })
  status: string;

  // @OneToMany(() => Payment, payment => payment.user)
  // payments: Payment[];

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


