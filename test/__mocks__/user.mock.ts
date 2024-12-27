export const userPayload = {
  email: 'user@example.com',
  password: 'securepassword123',
};

export const userResponse = {
  id: 'uuid-user-123',
  email: 'user@example.com',
  created_at: '2024-11-08T12:00:00Z',
  google_id: null,
  updated_at: null,
};

export const metaData = {
  page: 1,
  total: 2,
  limit: 10,
};

export const allUsers = [
  {
    id: 'uuid-user-123',
    email: 'user@example.com',
    created_at: '2024-11-08T10:00:00Z',
    google_id: null,
    updated_at: null,
  },
  {
    id: 'uuid-user-456',
    email: 'user2@example.com',
    created_at: '2024-11-08T12:00:00Z',
    google_id: null,
    updated_at: null,
  },
];

export const allUsersResponse = {
  data: allUsers,
  metaData,
};

export const userUpdatedResponse = {
  data: {
    id: 'uuid-user-123',
    email: 'user-123@example.com',
    created_at: new Date('2024-11-08T12:00:00Z'),
    google_id: null,
    updated_at: new Date('2024-11-09T14:00:00Z'),
  },
  updated: true,
};

export const userRemovedResponse = { data: userResponse, deleted: true };
