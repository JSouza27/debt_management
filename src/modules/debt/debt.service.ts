import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDebtDTO } from './dto/create-debt.dto';
import { UpdateDebtDTO } from './dto/update-debt.dto';
import { DebtRepository } from './repositories/debt.repository';
import { CategoryService } from '../category/category.service';
import { FindParamsDTO } from './dto/find-params.dto';

@Injectable()
export class DebtService {
  constructor(
    private readonly repository: DebtRepository,
    private readonly categoryService: CategoryService,
  ) {}

  public async create(createDebtDto: CreateDebtDTO) {
    const category = await this.categoryService.findOne(
      createDebtDto.category_id,
    );
    const debt = await this.repository.create(
      Object.assign(createDebtDto, category),
    );

    return this.repository.save(debt);
  }

  public async findAll(params: FindParamsDTO) {
    const { limit, offset } = params;
    const [debts, total] = await this.repository.findAll(params);

    return {
      data: debts,
      metaData: {
        offset,
        total,
        limit,
      },
    };
  }

  public async findOne(id: string) {
    try {
      const debt = await this.repository.findOneBy({ id });

      if (!debt) {
        throw new HttpException(
          'A divída informada não existe',
          HttpStatus.NOT_FOUND,
        );
      }

      return debt;
    } catch (e) {
      if (e.status === 404) throw new NotFoundException(e.response);

      throw new BadRequestException(e);
    }
  }

  public async update(id: string, updateDebtDto: UpdateDebtDTO) {
    const debt = await this.findOne(id);

    try {
      const debtUpdated = await this.repository.save(
        Object.assign(debt, updateDebtDto),
      );

      return { data: debtUpdated, updated: true };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async remove(id: string) {
    const debt = await this.findOne(id);

    try {
      const { affected } = await this.repository.delete(id);

      if (affected !== 1) {
        throw new BadRequestException('Ocorreu um erro ao remover a divida');
      }

      return { data: debt, removed: true };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
