import { forwardRef, Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { DebtRepository } from './repositories/debt.repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Debt]), forwardRef(() => CategoryModule)],
  controllers: [DebtController],
  providers: [DebtService, DebtRepository],
  exports: [DebtService],
})
export class DebtModule {}
