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
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';
import { FindParamsDto } from './dto/find-params.dto';

@Controller('/api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  public async create(@Body() createCategoryDto: CreateCategoryDTO) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  public async findAll(@Query() params: FindParamsDto) {
    return this.categoryService.findAll(params);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDTO,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
