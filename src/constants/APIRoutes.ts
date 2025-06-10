export const APIRoutes = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refreshToken: '/auth/refresh-token',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },

  // Users
  users: {
    me: '/users/me', // Get current authenticated user
    all: '/users', // Get all users (admin scope)
    detail: (userId: string) => `/users/${userId}`, // Get specific user by ID
    update: (userId: string) => `/users/${userId}`, // Update specific user by ID
    delete: (userId: string) => `/users/${userId}`, // Delete specific user by ID
  },

  // Products
  products: {
    all: '/products', // Get all products
    create: '/products', // Create a new product
    detail: (productId: string) => `/products/${productId}`, // Get specific product by ID
    update: (productId: string) => `/products/${productId}`, // Update specific product by ID
    delete: (productId: string) => `/products/${productId}`, // Delete specific product by ID
  },

  // Orders
  orders: {
    all: '/orders', // Get all orders
    create: '/orders', // Create a new order
    detail: (orderId: string) => `/orders/${orderId}`, // Get specific order by ID
    updateStatus: (orderId: string) => `/orders/${orderId}/status`, // Update order status
  },

  // Add more categories as your API grows
  categories: {
    all: '/categories',
    detail: (categoryId: string) => `/categories/${categoryId}`,
  },
};