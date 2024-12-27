import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { OrderBy } from '../../../common/enums/enums';

export class UserParamsDTO {
  @IsNumber({}, { message: 'Limit deve ser um número' })
  @IsPositive({ message: 'Limit deve ser um número positivo' })
  limit: number;

  @IsNumber({}, { message: 'Offset deve ser um número' })
  @IsPositive({ message: 'Offset deve ser um número positivo' })
  offset: number;

  @IsEnum(OrderBy, { message: 'Order by deve ser ASC ou DESC' })
  order_by: string;
}
