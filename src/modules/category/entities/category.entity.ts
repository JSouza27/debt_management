import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Debt } from '@/modules/debt/entities/debt.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => `now()` })
  created_at: Date;

  @OneToMany(() => Debt, (debt) => debt.category)
  debts: Debt[];
}
