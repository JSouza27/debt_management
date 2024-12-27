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
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserParamsDTO } from './dto/user-params.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @Get()
  public async findAll(@Query() params: UserParamsDTO) {
    params.offset = Number(params.offset);
    params.limit = Number(params.limit);

    return this.userService.findAll(params);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() UpdateUserDTO: UpdateUserDTO,
  ) {
    return this.userService.update(id, UpdateUserDTO);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
