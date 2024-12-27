import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashPasswordTransform } from '../../../common/transformers/hash-password-transform';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, select: false, transformer: hashPasswordTransform })
  password: string;

  @Column({ unique: true, nullable: true, default: null })
  google_id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => `now()` })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: null })
  updated_at: Date;
}
