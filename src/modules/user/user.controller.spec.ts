import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  allUsers,
  userPayload,
  userRemovedResponse,
  userResponse,
  userUpdatedResponse,
} from '../../../test/__mocks__/user.mock';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(userResponse),
            findAll: jest.fn().mockResolvedValue(allUsers),
            findOne: jest.fn().mockResolvedValue(userResponse),
            update: jest.fn().mockResolvedValue(userUpdatedResponse),
            remove: jest.fn().mockResolvedValue(userRemovedResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create the user successfully', async () => {
      const user = await controller.create(userPayload);

      expect(user).toEqual(userResponse);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const users = await controller.findAll({
        limit: 10,
        offset: 1,
        order_by: 'DESC',
      });

      expect(users).toEqual(allUsers);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = await controller.findOne('uuid-user-123');

      expect(user).toEqual(userResponse);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const user = await controller.update('uuid-user-123', {
        email: 'user-123@example.com',
      });

      expect(user).toEqual(userUpdatedResponse);
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const user = await controller.remove('uuid-user-123');

      expect(user).toEqual(userRemovedResponse);
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
