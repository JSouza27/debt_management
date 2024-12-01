import {
  IsDate,
  IsEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateDebtDTO {
  @IsString({ message: 'O nome deve ser uma "string"' })
  @IsEmpty({ message: 'O campo "name" é obrigatório' })
  @MinLength(3, { message: 'O campo "name" precisa ter mais que 3 caracteres' })
  name: string;

  @IsUUID('4', { message: 'O campo "category_id" precisa ser um UUUID' })
  @IsEmpty({ message: 'O campo "category_id" é obrigatório' })
  category_id: string;

  @IsNumber({}, { message: 'O campo "total_amount" deve ser um número' })
  @IsPositive({ message: 'O campo "total_amount" deve ser um número positivo' })
  total_amount: number;

  @IsNumber({}, { message: 'O campo "amount_paid" deve ser um número' })
  @IsPositive({ message: 'O campo "amount_paid" deve ser um número positivo' })
  amount_paid: number;

  @IsDate({ message: 'O campo "due_date" deve ser uma data válida' })
  due_date: Date;
}
