import { DebtStatus } from '../../src/common/enums/enums';
import { Category } from '../../src/modules/category/entities/category.entity';
import { Installment } from '../../src/modules/installment/entities/installment.entity';

export const debtPayload = {
  name: 'Visa Card',
  category_id: 'uuid-category',
  total_amount: 5000.0,
  amount_paid: 0.0,
  due_date: new Date('2024-12-15'),
};

export const debtResponse = {
  id: 'uuid-debt',
  name: 'Visa Card',
  category_id: 'uuid-category',
  total_amount: 5000.0,
  amount_paid: 0,
  created_at: new Date('2024-11-08'),
  due_date: new Date('2024-12-15'),
  status: DebtStatus.ACTIVE,
  category: new Category(),
  installments: [new Installment()],
};

export const listDebtResponse = {
  data: [
    {
      id: 'uuid-debt',
      name: 'Visa Card',
      category_id: 'uuid-category-123',
      total_amount: 5000.0,
      amount_paid: 0.0,
      created_at: new Date('2024-11-08'),
      due_date: new Date('2024-12-15'),
      status: 'Active',
      category: {
        id: 'uuid-category-123',
        name: 'Loan',
        description: 'Long-term personal loan',
        created_at: new Date('2024-11-08T10:30:00Z'),
      },
    },
    {
      id: 'uuid-debt-2',
      name: 'Empréstimo Itaú',
      category_id: 'uuid-category-124',
      total_amount: 400.0,
      amount_paid: 0.0,
      created_at: new Date('2024-11-08'),
      due_date: new Date('2024-12-15'),
      status: 'Active',
      category: {
        id: 'uuid-category-124',
        name: 'Loan-2',
        description: 'Long-term personal loan',
        created_at: new Date('2024-11-08T10:30:00Z'),
      },
    },
  ],
  metaData: {
    page: 1,
    total: 2,
    limit: 10,
  },
};

export const debtUpdated = Object.assign(debtResponse, {
  total_amount: 4000.0,
  category: new Category(),
  installments: [new Installment()],
});
