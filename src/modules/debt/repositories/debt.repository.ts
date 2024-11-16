import { DataSource, Repository } from 'typeorm';
import { Debt } from '../entities/debt.entity';
import { Injectable } from '@nestjs/common';
import { FindParamsDTO } from '../dto/find-params.dto';

@Injectable()
export class DebtRepository extends Repository<Debt> {
  constructor(private dataSource: DataSource) {
    super(Debt, dataSource.manager);
  }

  public async findAll(params: FindParamsDTO) {
    const { limit, offset } = params;

    const queryBuilder = await this.createQueryBuilder('debt')
      .leftJoinAndSelect('debt.category', 'category')
      .orderBy('debt.due_date', 'ASC')
      .limit(limit)
      .offset(offset);

    return queryBuilder.getManyAndCount();
  }
}
