import { forwardRef, Module } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { InstallmentController } from './installment.controller';
import { InstallmentRepository } from './repositories/installment.repository';
import { DebtModule } from '../debt/debt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Installment } from './entities/installment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Installment]),
    forwardRef(() => DebtModule),
  ],
  controllers: [InstallmentController],
  providers: [InstallmentRepository, InstallmentService],
})
export class InstallmentModule {}
