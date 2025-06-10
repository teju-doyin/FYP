export const QueryKeys = {
  // Auth
  auth: ['auth'] as const,

  // Users
  users: {
    all: ['users'] as const,
    detail: (userId: string) => ['users', userId] as const,
    profile: (userId: string) => [...QueryKeys.users.detail(userId), 'profile'] as const,
  },

  // Products
  products: {
    all: ['products'] as const,
    detail: (productId: string) => ['products', productId] as const,
    search: (query: string) => [...QueryKeys.products.all, 'search', query] as const,
  },

  // Add more feature-specific keys here
  orders: {
    all: ['orders'] as const,
    detail: (orderId: string) => ['orders', orderId] as const,
  },
};