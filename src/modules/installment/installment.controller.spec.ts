import { Test, TestingModule } from '@nestjs/testing';
import { InstallmentController } from './installment.controller';
import { InstallmentService } from './installment.service';
import {
  installmentPayload,
  installmentResponse,
  listInstallmente,
  updateInstallmentPayload,
  updateInstallmentResponse,
} from '../../../test/__mocks__/installment.mock';

describe('InstallmentController', () => {
  let controller: InstallmentController;
  let service: InstallmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstallmentController],
      providers: [
        {
          provide: InstallmentService,
          useValue: {
            create: jest.fn().mockResolvedValue([installmentResponse]),
            findAll: jest.fn().mockResolvedValue(listInstallmente),
            findOne: jest.fn().mockResolvedValue(installmentResponse),
            update: jest.fn().mockResolvedValue({
              data: updateInstallmentResponse,
              updated: true,
            }),
            remove: jest.fn().mockResolvedValue({
              data: installmentResponse,
              removed: true,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<InstallmentController>(InstallmentController);
    service = module.get<InstallmentService>(InstallmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create the installment successfully', async () => {
      const resp = await controller.create(installmentPayload);

      expect(resp).toEqual([installmentResponse]);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return a list of installments', async () => {
      const resp = await service.findAll({ limit: 10, page: 1 });

      expect(resp).toEqual(listInstallmente);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the portion of the id informed', async () => {
      const resp = await controller.findOne('uuid-installment-123');

      expect(resp).toEqual(installmentResponse);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a part successfully', async () => {
      const resp = await controller.update(
        'uuid-installment-123',
        updateInstallmentPayload,
      );

      expect(resp).toEqual({
        data: updateInstallmentResponse,
        updated: true,
      });
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove the parcel', async () => {
      const resp = await controller.remove('uuid-installment-123');

      expect(resp).toEqual({
        data: installmentResponse,
        removed: true,
      });
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
