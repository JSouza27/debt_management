import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';
import { InstallmentStatus } from '../../../common/enums/enums';

export class CreateInstallmentDto {
  @IsUUID('4', { message: 'O campo "debt_id" precisa ser um UUUID' })
  @IsEmpty({ message: 'O campo "debt_id" é obrigatório' })
  debt_id: string;

  @IsNumber({}, { message: 'O campo "number_installment" deve ser um número' })
  @IsPositive({
    message: 'O campo "number_installment" deve ser um número positivo',
  })
  @Min(1, {
    message: 'O campo "number_installment" não pode ter o valor menor que 1',
  })
  number_installment: number;

  @IsNumber({}, { message: 'O campo "amount_installment" deve ser um número' })
  @IsPositive({
    message: 'O campo "amount_installment" deve ser um número positivo',
  })
  @Min(1, {
    message: 'O campo "amount_installment" não pode ter o valor menor que 1',
  })
  amount_installment: number;

  @IsDate({ message: 'O campo "due_date" deve ser uma data válida' })
  due_date: Date;

  @IsDate({ message: 'O campo "payment_date" deve ser uma data válida' })
  payment_date: Date;

  @IsEnum(InstallmentStatus, { message: 'O campo "status" está invalido' })
  status: InstallmentStatus;
}
