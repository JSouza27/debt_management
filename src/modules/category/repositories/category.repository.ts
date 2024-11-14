import { Repository } from 'typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { FindParamsDto } from '../dto/find-params.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  async findAll(params: FindParamsDto) {
    const { limit, offset } = params;

    const queryBuilder = this.createQueryBuilder('category')
      .orderBy('category.name', 'ASC')
      .limit(limit)
      .offset(offset);

    return queryBuilder.getManyAndCount();
  }
}
