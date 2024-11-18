// import { IsPositive, IsNumber, Min } from 'class-validator';

export class FindParamsDto {
  // @IsNumber()
  // @IsPositive({ message: '"limit" deve ser um numero positivo' })
  // @Min(1, { message: '"limit" não pode ser menos que 1' })
  limit: number;

  // @IsNumber()
  // @IsPositive({ message: '"page" deve ser um numero positivo' })
  // @Min(1, { message: '"page" não pode ser menos que 1' })
  page: number;
}
