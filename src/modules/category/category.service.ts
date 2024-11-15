import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/category.repository';
import { FindParamsDto } from './dto/find-params.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  private async categoryCheckExist(name: string) {
    const isExist = await this.repository.exists({ where: { name } });

    if (isExist) {
      throw new BadRequestException('A categoria já existe');
    }
  }

  public async create(createCategoryDto: CreateCategoryDto) {
    await this.categoryCheckExist(createCategoryDto.name);

    try {
      const category = this.repository.create(createCategoryDto);
      return this.repository.save(category);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async findAll(params: FindParamsDto) {
    try {
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
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async findOne(id: string) {
    try {
      const category = await this.repository.findOneBy({ id });

      if (!category) {
        throw new HttpException(
          'A categoria informada não existe',
          HttpStatus.NOT_FOUND,
        );
      }

      return category;
    } catch (e) {
      if (e.status === 404) throw new NotFoundException(e.response);

      throw new BadRequestException(e);
    }
  }

  public async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    try {
      const categoryUpdated = await this.repository.save(
        Object.assign(category, updateCategoryDto),
      );

      return { data: categoryUpdated, updated: true };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async remove(id: string) {
    const category = await this.findOne(id);

    try {
      const { affected } = await this.repository.delete(id);

      if (affected !== 1) {
        throw new BadRequestException('Ocorreu um erro ao remover a categoria');
      }

      return { data: category, removed: true };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
