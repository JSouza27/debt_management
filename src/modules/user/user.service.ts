import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserParamsDTO } from './dto/user-params.dto';
import { ERROR_MESSAGES } from './constants/error-messages';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  protected async checkUserExists(email: string) {
    const user = await this.repository.exists({ where: { email } });

    if (user) {
      throw new BadRequestException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }
  }

  public async create(createUserDto: CreateUserDTO) {
    await this.checkUserExists(createUserDto.email);

    try {
      const newUser = this.repository.create(createUserDto);
      const user = await this.repository.save(newUser);

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async findAll(params: UserParamsDTO) {
    try {
      const [data, total] = await this.repository.findAll(params);

      return {
        data,
        metaData: { page: params.offset, total, limit: params.limit },
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async findOne(id: string) {
    try {
      const user = await this.repository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
      }

      if (user.password) delete user.password;

      return user;
    } catch (error) {
      if (error.message === ERROR_MESSAGES.USER_NOT_FOUND) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException(error);
    }
  }

  public async update(id: string, updateUserDto: UpdateUserDTO) {
    try {
      const user = await this.findOne(id);

      const updatedUser = await this.repository.save({
        ...user,
        ...updateUserDto,
      });

      delete updatedUser.password;

      return { data: updatedUser, updated: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async remove(id: string) {
    try {
      const user = await this.findOne(id);

      await this.repository.delete(id);

      return { data: user, deleted: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
