export const categoryPayload = {
  name: 'Loan',
  description: 'Long-term personal loan',
};

export const categoryResponse = {
  id: 'uuid-category-123',
  name: 'Loan',
  description: 'Long-term personal loan',
  created_at: new Date('2024-11-08T10:30:00Z'),
};

export const categoryUpdateResponse = {
  id: 'uuid-category-123',
  name: 'Changed name',
  description: 'Long-term personal loan',
  created_at: new Date('2024-11-08T10:30:00Z'),
};

export const listCategoryResponse = {
  data: [
    {
      id: 'uuid-category-123',
      name: 'Loan',
      description: 'Long-term personal loan',
      created_at: new Date('2024-11-08T10:30:00Z'),
    },
    {
      id: 'uuid-category-124',
      name: 'Cartão de crédito',
      description: 'Monthly credit card expenses',
      created_at: new Date('2024-11-08T10:32:00Z'),
    },
  ],
  metaData: {
    offset: 1,
    total: 2,
    limit: 10,
  },
};
