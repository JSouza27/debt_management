import { InstallmentStatus } from '../../src/common/enums';
import { debtResponse } from './debt.mock';

export const installmentPayload = {
  debt_id: 'uuid-debt-123',
  number_installment: 1,
  amount_installment: 500.0,
  due_date: new Date('2024-01-10'),
  payment_date: null,
  status: InstallmentStatus.PENDING,
};

export const installmentPayload2 = {
  debt_id: 'uuid-debt-123',
  number_installment: 2,
  amount_installment: 500.0,
  due_date: new Date('2024-01-10'),
  payment_date: null,
  status: InstallmentStatus.PENDING,
};

export const installmentResponse = [
  {
    id: 'uuid-installment-123',
    debt_id: 'uuid-debt-123',
    number_installment: 1,
    amount_installment: 500.0,
    due_date: new Date('2024-01-10'),
    payment_date: null,
    status: 'Pending',
    debt: debtResponse,
  },
];

export const installmentResponse2 = [
  {
    id: 'uuid-installment-123',
    debt_id: 'uuid-debt-123',
    number_installment: 1,
    amount_installment: 500.0,
    due_date: new Date('2024-01-10'),
    payment_date: null,
    status: 'Pending',
    debt: debtResponse,
  },
  {
    id: 'uuid-installment-123',
    debt_id: 'uuid-debt-123',
    number_installment: 2,
    amount_installment: 500.0,
    due_date: new Date('2024-02-10'),
    payment_date: null,
    status: 'Pending',
    debt: debtResponse,
  },
];

export const listInstallmente = {
  data: [
    {
      id: 'uuid-installment-123',
      debt_id: 'uuid-debt-123',
      number_installment: 1,
      amount_installment: 500.0,
      due_date: new Date('2024-01-10'),
      payment_date: null,
      status: 'Pending',
    },
    {
      id: 'uuid-installment-124',
      debt_id: 'uuid-debt-123',
      number_installment: 2,
      amount_installment: 500.0,
      due_date: new Date('2024-02-10'),
      payment_date: new Date('2024-02-15'),
      status: 'Paid',
    },
  ],
  metaData: {
    page: 1,
    total: 2,
    limit: 10,
  },
};

export const updateInstallmentPayload = {
  payment_date: new Date('2024-01-11'),
  status: InstallmentStatus.PAID,
};

export const updateInstallmentResponse = {
  id: 'uuid-installment-123',
  debt_id: 'uuid-debt-123',
  number_installment: 1,
  amount_installment: 500,
  due_date: new Date('2024-01-10'),
  payment_date: new Date('2024-01-11'),
  status: InstallmentStatus.PAID,
  debt: debtResponse,
};
