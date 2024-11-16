import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DebtService } from './debt.service';
import { CreateDebtDTO } from './dto/create-debt.dto';
import { UpdateDebtDTO } from './dto/update-debt.dto';
import { FindParamsDTO } from './dto/find-params.dto';

@Controller('/api/debts')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Post()
  public async create(@Body() createDebtDto: CreateDebtDTO) {
    return this.debtService.create(createDebtDto);
  }

  @Get()
  public async findAll(params: FindParamsDTO) {
    return this.debtService.findAll(params);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.debtService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateDebtDto: UpdateDebtDTO,
  ) {
    return this.debtService.update(id, updateDebtDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.debtService.remove(id);
  }
}
