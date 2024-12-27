import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserParamsDTO } from '../dto/user-params.dto';
import { OrderBy } from '../../../common/enums/enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSourse: DataSource) {
    super(User, dataSourse.manager);
  }

  async findAll(params: UserParamsDTO): Promise<[User[], number]> {
    const { limit, offset, order_by } = params;

    const createQueryBuild = this.createQueryBuilder('user')
      .skip((offset - 1) * limit)
      .take(limit)
      .orderBy('user.created_at', OrderBy[order_by])
      .cache({ milliseconds: 24 * 60 * 60 * 1000 });

    return createQueryBuild.getManyAndCount();
  }
}
