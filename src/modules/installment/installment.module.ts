import { Module } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { InstallmentController } from './installment.controller';
import { InstallmentRepository } from './repositories/installment.repository';

@Module({
  controllers: [InstallmentController],
  providers: [InstallmentRepository, InstallmentService],
})
export class InstallmentModule {}
