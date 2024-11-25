import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { FindParamsInstallmentDTO } from './dto/find-params-installment.dto';

@Controller('/api/installments')
export class InstallmentController {
  constructor(private readonly installmentService: InstallmentService) {}

  @Post()
  public async create(@Body() createInstallmentDto: CreateInstallmentDto) {
    return this.installmentService.create(createInstallmentDto);
  }

  @Get()
  public async findAll(@Query() params: FindParamsInstallmentDTO) {
    return this.installmentService.findAll(params);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.installmentService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateInstallmentDto: UpdateInstallmentDto,
  ) {
    return this.installmentService.update(id, updateInstallmentDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.installmentService.remove(id);
  }
}
