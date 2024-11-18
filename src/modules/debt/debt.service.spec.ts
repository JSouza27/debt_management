import { Test, TestingModule } from '@nestjs/testing';
import { DebtService } from './debt.service';
import { DebtRepository } from './repositories/debt.repository';
import {
  debtPayload,
  debtResponse,
  debtUpdated,
  listDebtResponse,
} from '../../../test/__mocks__/debt.mock';
import { CategoryService } from '../category/category.service';
import { categoryResponse } from '../../../test/__mocks__/category.mock';

describe('DebtService', () => {
  let service: DebtService;
  let repository: DebtRepository;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebtService,
        {
          provide: DebtRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn().mockResolvedValue(debtResponse),
            findAll: jest
              .fn()
              .mockResolvedValue([
                listDebtResponse.data,
                listDebtResponse.metaData.total,
              ]),
            findOneBy: jest.fn().mockResolvedValue(debtResponse),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
            exists: jest.fn().mockResolvedValue(false),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(categoryResponse),
          },
        },
      ],
    }).compile();

    service = module.get<DebtService>(DebtService);
    repository = module.get<DebtRepository>(DebtRepository);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  describe('create', () => {
    it('should create a debt', async () => {
      const resp = await service.create(debtPayload);

      expect(resp).toEqual(debtResponse);
      expect(repository.save).toHaveBeenCalled();
    });

    it('should return an error message if the debt already exists', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValueOnce(true);

      expect(service.create(debtPayload)).rejects.toThrow(
        'Já existe uma dívida com esse nome cadastrado',
      );
    });
  });

  describe('findAll', () => {
    it('should return all debts', async () => {
      const resp = await service.findAll({ limit: 10, page: 1 });

      expect(resp).toEqual(listDebtResponse);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the debt passed by id', async () => {
      const resp = await service.findOne('uuid-debt');

      expect(resp).toEqual(debtResponse);
      expect(repository.findOneBy).toHaveBeenCalled();
    });

    it('should return the error "A dívida informada não existe" if it does not find the division of the id entered', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      expect(service.findOne('uuid-debt')).rejects.toThrow(
        'A dívida informada não existe',
      );
      expect(repository.findOneBy).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update the division of the id entered', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(debtUpdated);
      const resp = await service.update('uuid-debt', { total_amount: 4000.0 });

      expect(resp).toEqual({ data: debtUpdated, updated: true });
      expect(repository.save).toHaveBeenCalled();
    });

    it('should return an error message if you pass the id of a debt that does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      expect(service.remove('uuid-debt')).rejects.toThrow(
        'A dívida informada não existe',
      );
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the divide from the id', async () => {
      const resp = await service.remove('uuid-debt');

      expect(resp).toEqual({ data: debtResponse, removed: true });
      expect(repository.delete).toHaveBeenCalled();
    });

    it('should return an error message if you pass the id of a debt that does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      expect(service.remove('uuid-debt')).rejects.toThrow(
        'A dívida informada não existe',
      );
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
