import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('blacklisted_tokens')
export class BlacklistedToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('text')
  token: string;

  @Column('timestamptz')
  expiresAt: Date;
}
