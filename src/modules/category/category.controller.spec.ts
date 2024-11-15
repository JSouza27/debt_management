import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import {
  categoryPayload,
  categoryResponse,
  categoryUpdateResponse,
  listCategoryResponse,
} from '../../../test/__mocks__/category.mock';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            create: jest.fn().mockResolvedValue(categoryResponse),
            findAll: jest.fn().mockResolvedValue(listCategoryResponse),
            findOne: jest.fn().mockResolvedValue(categoryResponse),
            update: jest.fn().mockResolvedValue({
              data: { ...categoryUpdateResponse, debts: [] },
              updated: true,
            }),
            remove: jest.fn().mockResolvedValue({
              data: categoryResponse,
              removed: true,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const resp = await controller.create(categoryPayload);

      expect(resp).toEqual(categoryResponse);
      expect(service.create).toHaveBeenCalled();
    });

    it('should return an object', async () => {
      const resp = await controller.create(categoryPayload);

      expect(resp).toHaveProperty('id');
      expect(resp).toHaveProperty('name');
      expect(resp).toHaveProperty('description');
    });
  });

  describe('findAll', () => {
    it('should list all categories', async () => {
      const resp = await controller.findAll({ limit: 10, offset: 1 });

      expect(resp).toEqual(listCategoryResponse);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should get a specific category', async () => {
      const resp = await controller.findOne('uuid-category-123');

      expect(resp).toEqual(categoryResponse);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing category', async () => {
      const resp = await service.update('uuid-category-123', {
        name: 'Changed name',
      });

      expect(resp).toEqual({
        data: { ...categoryUpdateResponse, debts: [] },
        updated: true,
      });
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const resp = await controller.remove('uuid-category-123');

      expect(resp).toEqual({
        data: categoryResponse,
        removed: true,
      });
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
