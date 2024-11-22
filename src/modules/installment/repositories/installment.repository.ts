import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Installment } from '../entities/installment.entity';
import { FindParamsInstallmentDTO } from '../dto/find-params-installment.dto';

@Injectable()
export class InstallmentRepository extends Repository<Installment> {
  constructor(private dataSource: DataSource) {
    super(Installment, dataSource.manager);
  }

  public async findAll(params: FindParamsInstallmentDTO) {
    const { limit, page } = params;

    const createQueryBuild = this.createQueryBuilder('installment')
      .leftJoinAndSelect('installment.debt', 'debt')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('installment.due_date', 'ASC');

    return createQueryBuild.getManyAndCount();
  }
}
