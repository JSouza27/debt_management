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

  @Column({ unique: true, length: 150, nullable: false })
  name: string;

  @Column({ length: 200, nullable: false })
  description: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => `now()` })
  created_at: Date;

  @OneToMany(() => Debt, (debt) => debt.category)
  debts: Debt[];
}
