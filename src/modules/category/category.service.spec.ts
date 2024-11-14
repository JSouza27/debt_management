import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repositories/category.repository';
import {
  categoryPayload,
  categoryResponse,
  categoryUpdateResponse,
  listCategoryResponse,
} from '../../../test/__mocks__/category.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: {
            save: jest.fn().mockResolvedValue(categoryResponse),
            create: jest.fn(),
            findAll: jest
              .fn()
              .mockResolvedValue([
                listCategoryResponse.data,
                listCategoryResponse.metaData.total,
              ]),
            findOneByOrFail: jest.fn().mockResolvedValue(categoryResponse),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const resp = await service.create(categoryPayload);

      expect(resp).toEqual(categoryResponse);
      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
    });

    it('should return an object', async () => {
      const resp = await service.create(categoryPayload);

      expect(resp).toHaveProperty('name');
      expect(resp).toHaveProperty('description');
    });
  });

  describe('findAll', () => {
    it('should list all categories', async () => {
      const resp = await service.findAll({ limit: 10, offset: 1 });

      expect(resp).toEqual(listCategoryResponse);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('should return an object', async () => {
      const resp = await service.findAll({ limit: 10, offset: 1 });

      expect(resp).toHaveProperty('data');
      expect(resp).toHaveProperty('metaData');
    });

    it('data should be an array', async () => {
      const resp = await service.findAll({ limit: 10, offset: 1 });

      expect(resp.data).toHaveLength(2);
    });

    it('should show the limit', async () => {
      const resp = await service.findAll({ limit: 10, offset: 1 });

      expect(resp.metaData).toHaveProperty('limit', 10);
    });

    it('should show the offset', async () => {
      const resp = await service.findAll({ limit: 10, offset: 1 });

      expect(resp.metaData).toHaveProperty('offset', 1);
    });

    it('should show the total', async () => {
      const resp = await service.findAll({ limit: 10, offset: 1 });

      expect(resp.metaData).toHaveProperty('total', 2);
    });
  });

  describe('findOne', () => {
    it('should get a specific category', async () => {
      const resp = await service.findOne('uuid-category-123');

      expect(resp).toEqual(categoryResponse);
      expect(repository.findOneByOrFail).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing category', async () => {
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce({ ...categoryUpdateResponse, debts: [] });

      const resp = await service.update('uuid-category-123', {
        name: 'Changed name',
      });

      expect(resp).toEqual({
        data: { ...categoryUpdateResponse, debts: [] },
        updated: true,
      });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const resp = await service.remove('uuid-category-123');

      expect(resp).toEqual({
        data: categoryResponse,
        removed: true,
      });
      expect(repository.delete).toHaveBeenCalled();
    });
  });
});
