import { IsPositive, IsNumber, Min } from 'class-validator';

export class FindParamsDto {
  @IsNumber({}, { message: 'O campo "limit" é obrigatório' })
  @IsPositive({ message: 'O campo "limit" deve ser um numero positivo' })
  @Min(1, { message: 'O campo "limit" não pode ser menos que 1' })
  limit: number;

  @IsNumber({}, { message: 'O campo "page" é obrigatório' })
  @IsPositive({ message: 'O campo "page" deve ser um numero positivo' })
  @Min(1, { message: 'O campo "page" não pode ser menos que 1' })
  page: number;
}
