import { Test, TestingModule } from '@nestjs/testing';
import { DebtController } from './debt.controller';
import { DebtService } from './debt.service';
import {
  debtPayload,
  debtResponse,
  debtUpdated,
  listDebtResponse,
} from '../../../test/__mocks__/debt.mock';

describe('DebtController', () => {
  let controller: DebtController;
  let service: DebtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DebtController],
      providers: [
        {
          provide: DebtService,
          useValue: {
            create: jest.fn().mockResolvedValue(debtResponse),
            findAll: jest.fn().mockResolvedValue(listDebtResponse),
            findOne: jest.fn().mockResolvedValue(debtResponse),
            update: jest
              .fn()
              .mockResolvedValue({ data: debtUpdated, updated: true }),
            remove: jest
              .fn()
              .mockResolvedValue({ data: debtResponse, removed: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<DebtController>(DebtController);
    service = module.get<DebtService>(DebtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a debt', async () => {
      const resp = await controller.create(debtPayload);

      expect(resp).toEqual(debtResponse);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all debts', async () => {
      const resp = await controller.findAll({ limit: 10, offset: 1 });

      expect(resp).toEqual(listDebtResponse);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the debt passed by id', async () => {
      const resp = await service.findOne('uuid-debt');

      expect(resp).toEqual(debtResponse);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update the division of the id entered', async () => {
      const resp = await controller.update('uuid-debt', {
        total_amount: 4000.0,
      });

      expect(resp).toEqual({ data: debtUpdated, updated: true });
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the divide from the id', async () => {
      const resp = await controller.remove('uuid-debt');

      expect(resp).toEqual({ data: debtResponse, removed: true });
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
