import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import { DebtStatus } from '@/common/enums';
import { Installment } from '@/modules/installment/entities/installment.entity';

@Entity()
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  category_id: string;

  @ManyToOne(() => Category, (category) => category.debts)
  category: Category;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount_paid: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => `now()` })
  created_at: Date;

  @Column({ type: 'timestamptz', default: null })
  due_date: Date;

  @Column({ type: 'enum', enum: DebtStatus, default: DebtStatus.ACTIVE })
  status: DebtStatus;

  @OneToMany(() => Installment, (installment) => installment.debt)
  installments: Installment[];
}
