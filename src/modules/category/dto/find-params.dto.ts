import { IsPositive, IsNumber, Min } from 'class-validator';

export class FindParamsDto {
  @IsNumber()
  @IsPositive({ message: '"limit" deve ser um numero positivo' })
  @Min(1, { message: '"limit" não pode ser menos que 1' })
  limit: number;

  @IsNumber()
  @IsPositive({ message: '"offset" deve ser um numero positivo' })
  @Min(1, { message: '"offset" não pode ser menos que 1' })
  offset: number;
}
