import { InstallmentStatus } from '../../../common/enums';

export class CreateInstallmentDto {
  debt_id: string;
  number_installment: number;
  amount_installment: number;
  due_date: Date;
  payment_date: Date;
  status: InstallmentStatus;
}
