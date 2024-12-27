import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderBy } from '../../../common/enums/enums';

export class UserParamsDTO {
  @IsNotEmpty({ message: 'Limit é obrigatório' })
  limit: number;

  @IsNotEmpty({ message: 'Offset é obrigatório' })
  offset: number;

  @IsNotEmpty({ message: 'Order by é obrigatório' })
  @IsEnum(OrderBy, { message: 'Order by deve ser ASC ou DESC' })
  order_by_sort: string;
}
