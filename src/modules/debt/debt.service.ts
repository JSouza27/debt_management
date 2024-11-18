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

  protected async debtCheckExist(name: string) {
    const isExist = await this.repository.exists({ where: { name } });

    if (isExist) {
      throw new BadRequestException(
        'Já existe uma dívida com esse nome cadastrado',
      );
    }
  }

  public async create(createDebtDto: CreateDebtDTO) {
    await this.debtCheckExist(createDebtDto.name);

    try {
      const category = await this.categoryService.findOne(
        createDebtDto.category_id,
      );
      const debt = this.repository.create({ ...createDebtDto, category });

      return this.repository.save(debt);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async findAll(params: FindParamsDTO) {
    try {
      const { limit, page } = params;
      const [debts, total] = await this.repository.findAll(params);

      return {
        data: debts.map((debt) => ({
          ...debt,
          amount_paid: parseFloat(debt.amount_paid as any),
          total_amount: parseFloat(debt.total_amount as any),
        })),
        metaData: {
          page,
          total,
          limit,
        },
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async findOne(id: string) {
    try {
      const debt = await this.repository.findOneBy({ id });

      if (!debt) {
        throw new HttpException(
          'A dívida informada não existe',
          HttpStatus.NOT_FOUND,
        );
      }

      debt['amount_paid'] = parseFloat(debt.amount_paid as any);
      debt['total_amount'] = parseFloat(debt.total_amount as any);

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

      debtUpdated['amount_paid'] = parseFloat(debt.amount_paid as any);
      debtUpdated['total_amount'] = parseFloat(debt.total_amount as any);

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
