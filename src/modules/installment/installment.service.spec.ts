import { Test, TestingModule } from '@nestjs/testing';
import { InstallmentService } from './installment.service';
import { InstallmentRepository } from './repositories/installment.repository';
import {
  installmentPayload,
  installmentPayload2,
  installmentResponse,
  installmentResponse2,
  listInstallmente,
  updateInstallmentPayload,
  updateInstallmentResponse,
} from '../../../test/__mocks__/installment.mock';
import { DebtService } from '../debt/debt.service';
import { debtResponse } from '../../../test/__mocks__/debt.mock';

describe('InstallmentService', () => {
  let service: InstallmentService;
  let repository: InstallmentRepository;
  let debtService: DebtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstallmentService,
        {
          provide: InstallmentRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn().mockResolvedValue(installmentResponse),
            findAll: jest
              .fn()
              .mockResolvedValue([
                listInstallmente.data,
                listInstallmente.metaData.total,
              ]),
            findOne: jest.fn().mockResolvedValue(installmentResponse),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
        {
          provide: DebtService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(debtResponse),
          },
        },
      ],
    }).compile();

    service = module.get<InstallmentService>(InstallmentService);
    repository = module.get<InstallmentRepository>(InstallmentRepository);
    debtService = module.get<DebtService>(DebtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(debtService).toBeDefined();
  });

  describe('create', () => {
    it('should create the installment successfully', async () => {
      const resp = await service.create(installmentPayload);

      expect(resp).toEqual([installmentResponse]);
      expect(repository.save).toHaveBeenCalled();
    });

    it('should create more plots when the "number_installment" is greater than 1', async () => {
      const resp = await service.create(installmentPayload2);

      expect(resp).toEqual(installmentResponse2);
      expect(repository.save).toHaveBeenCalled();
    });

    it('should return an error if the total of installments is different from the total amount to be paid', async () => {});
  });

  describe('findAll', () => {
    it('should return a list of installments', async () => {
      const resp = await service.findAll({ limit: 10, page: 1 });

      expect(resp).toEqual(listInstallmente);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the portion of the id informed', async () => {
      const resp = await service.findOne('uuid-installment-123');

      expect(resp).toEqual(installmentResponse);
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a part successfully', async () => {
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(updateInstallmentResponse);

      const resp = await service.update(
        'uuid-installment-123',
        updateInstallmentPayload,
      );

      expect(resp).toEqual({
        data: updateInstallmentResponse,
        updated: true,
      });
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the parcel', async () => {
      const resp = await service.remove('uuid-installment-123');

      expect(resp).toEqual({
        data: installmentResponse,
        removed: true,
      });
      expect(repository.delete).toHaveBeenCalled();
    });
  });
});
