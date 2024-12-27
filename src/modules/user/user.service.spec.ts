import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import {
  allUsers,
  allUsersResponse,
  metaData,
  userPayload,
  userRemovedResponse,
  userResponse,
  userUpdatedResponse,
} from '../../../test/__mocks__/user.mock';
import { ERROR_MESSAGES } from './constants/error-messages';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn().mockResolvedValue(userResponse),
            findAll: jest.fn().mockResolvedValue([allUsers, metaData.total]),
            findOne: jest.fn().mockResolvedValue(userResponse),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
            exists: jest.fn().mockResolvedValue(false),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = await service.create(userPayload);

      expect(user).toEqual(userResponse);
      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
    });

    it('should return message "Usuário já existe"', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValue(true);
      try {
        await service.create(userPayload);
      } catch (error) {
        expect(error.message).toEqual(ERROR_MESSAGES.USER_ALREADY_EXISTS);
        expect(error.status).toEqual(400);
        expect(repository.exists).toHaveBeenCalled();
      }
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = await service.findAll({
        limit: 10,
        offset: 1,
        order_by: 'DESC',
      });

      expect(users).toEqual(allUsersResponse);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = await service.findOne('uuid-user-123');

      expect(user).toEqual(userResponse);
      expect(repository.findOne).toHaveBeenCalled();
    });

    it('should return message "Usuário não existe"', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      try {
        await service.findOne('uuid-user-123');
      } catch (error) {
        expect(error.message).toEqual(ERROR_MESSAGES.USER_NOT_FOUND);
        expect(error.status).toEqual(404);
      }
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const obj = {
        ...userUpdatedResponse.data,
        password: 'securepassword123',
      };

      jest.spyOn(repository, 'save').mockResolvedValue(obj);
      const user = await service.update('uuid-user-123', {
        email: 'user-123@example.com',
      });

      expect(user).toEqual(userUpdatedResponse);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const resp = await service.remove('uuid-user-123');

      expect(resp).toEqual(userRemovedResponse);
      expect(repository.delete).toHaveBeenCalled();
    });
  });
});
