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

@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Post()
  create(@Body() createDebtDto: CreateDebtDTO) {
    return this.debtService.create(createDebtDto);
  }

  @Get()
  findAll(params) {
    return this.debtService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debtService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDTO) {
    return this.debtService.update(id, updateDebtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debtService.remove(+id);
  }
}
