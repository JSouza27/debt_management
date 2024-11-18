import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { FindParamsDto } from '../dto/find-params.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.manager);
  }

  public async findAll(params: FindParamsDto) {
    const { limit, page } = params;

    const queryBuilder = this.createQueryBuilder('category')
      .orderBy('category.name', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    return queryBuilder.getManyAndCount();
  }
}
