import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { FindParamsDto } from '../dto/find-params.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.manager);
  }

  async findAll(params: FindParamsDto) {
    const { limit, offset } = params;

    const queryBuilder = this.createQueryBuilder('category')
      .orderBy('category.name', 'ASC')
      .limit(limit)
      .offset(offset);

    return queryBuilder.getManyAndCount();
  }
}
