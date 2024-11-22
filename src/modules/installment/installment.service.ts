import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { InstallmentRepository } from './repositories/installment.repository';
import { DebtService } from '../debt/debt.service';
import { FindParamsInstallmentDTO } from './dto/find-params-installment.dto';
import { addMonths } from 'date-fns';

@Injectable()
export class InstallmentService {
  constructor(
    private readonly repository: InstallmentRepository,
    private readonly debtService: DebtService,
  ) {}

  private generateInstallment(end: number) {
    const installments = [];

    for (let i = 1; i <= end; i++) {
      installments.push(i);
    }

    return installments;
  }

  public async create(createInstallmentDto: CreateInstallmentDto) {
    if (createInstallmentDto.number_installment <= 0) {
      throw new BadRequestException(
        'O número de parcelas não pode ser inferior a 1',
      );
    }
    try {
      const debt = await this.debtService.findOne(createInstallmentDto.debt_id);
      const numberInstallments = this.generateInstallment(
        createInstallmentDto.number_installment,
      );

      const installments = numberInstallments.map((number) => {
        return this.repository.create({
          ...createInstallmentDto,
          number_installment: number,
          due_date: addMonths(createInstallmentDto.due_date, number - 1),
          debt,
        });
      });

      return this.repository.save(installments);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async findAll(params: FindParamsInstallmentDTO) {
    try {
      const { limit, page } = params;
      const [installment, total] = await this.repository.findAll(params);

      return {
        data: installment,
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
      const installment = await this.repository.findOne({
        where: { id },
        relations: { debt: true },
      });

      if (!installment) {
        throw new HttpException(
          'A parcela informada não existe',
          HttpStatus.NOT_FOUND,
        );
      }

      installment['amount_installment'] = parseFloat(
        installment.amount_installment as any,
      );

      return installment;
    } catch (e) {
      if (e.status === 404) throw new NotFoundException(e.response);

      throw new BadRequestException(e);
    }
  }

  public async update(id: string, updateInstallmentDto: UpdateInstallmentDto) {
    const installment = await this.findOne(id);

    try {
      const installmentUpdated = await this.repository.save(
        Object.assign(installment, updateInstallmentDto),
      );

      installment['amount_installment'] = parseFloat(
        installment.amount_installment as any,
      );

      return { data: installmentUpdated, updated: true };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  public async remove(id: string) {
    const installment = await this.findOne(id);

    try {
      const { affected } = await this.repository.delete(id);

      if (affected !== 1) {
        throw new BadRequestException('Ocorreu um erro ao remover a parcela');
      }

      return { data: installment, removed: true };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
