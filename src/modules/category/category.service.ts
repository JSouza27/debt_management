import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/category.repository';
import { FindParamsDto } from './dto/find-params.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  public async create(createCategoryDto: CreateCategoryDto) {
    const category = this.repository.create(createCategoryDto);
    return this.repository.save(category);
  }

  public async findAll(params: FindParamsDto) {
    const { limit, offset } = params;

    const [categories, total] = await this.repository.findAll(params);

    return {
      data: categories,
      metaData: {
        limit,
        offset,
        total,
      },
    };
  }

  public async findOne(id: string) {
    return this.repository.findOneByOrFail({ id });
  }

  public async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.repository.save({ id, ...updateCategoryDto });
    return { data: category, updated: true };
  }

  public async remove(id: string) {
    const category = await this.findOne(id);
    const { affected } = await this.repository.delete(id);

    if (affected !== 1) {
      throw new BadRequestException('Ocorreu um erro ao remover a categoria');
    }

    return { data: category, removed: true };
  }
}
