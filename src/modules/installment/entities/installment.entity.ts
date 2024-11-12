import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Debt } from '@/modules/debt/entities/debt.entity';
import { InstallmentStatus } from '@/common/enums';

@Entity()
export class Installment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  debt_id: string;

  @ManyToOne(() => Debt, (debt) => debt.installments)
  debt: Debt;

  @Column('number')
  number_installment: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount_installment: number;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  payment_date: Date | null;

  @Column({ type: 'timestamptz' })
  due_date: Date;

  @Column({ type: 'enum', enum: InstallmentStatus })
  status: InstallmentStatus;
}
