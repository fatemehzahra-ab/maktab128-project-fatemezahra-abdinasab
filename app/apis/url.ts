const API_BASE_URL = "http://localhost:8000/api";

export const api = {
  baseURL: API_BASE_URL,

  auth: {
    login: `${API_BASE_URL}/auth/login`,
    signup: `${API_BASE_URL}/auth/signup`,
    logout: `${API_BASE_URL}/auth/logout`,
  },

  products: {
    list: `${API_BASE_URL}/products`,
    create: `${API_BASE_URL}/products`,
    update: (id: string | number) => `${API_BASE_URL}/products/${id}`,
    delete: (id: string | number) => `${API_BASE_URL}/products/${id}`,
    getById: (id: string | number) => `${API_BASE_URL}/products/${id}`,
  },

  categories: {
    list: `${API_BASE_URL}/categories`,
    create: `${API_BASE_URL}/categories`,
    update: (id: string | number) => `${API_BASE_URL}/categories/${id}`,
    delete: (id: string | number) => `${API_BASE_URL}/categories/${id}`,
    getById: (id: string | number) => `${API_BASE_URL}/categories/${id}`,
  },

  subcategories: {
    list: `${API_BASE_URL}/subcategories`,
    create: `${API_BASE_URL}/subcategories`,
    update: (id: string | number) => `${API_BASE_URL}/subcategories/${id}`,
    delete: (id: string | number) => `${API_BASE_URL}/subcategories/${id}`,
    getById: (id: string | number) => `${API_BASE_URL}/subcategories/${id}`,
    getByCategory: (categoryId: string | number) =>
      `${API_BASE_URL}/subcategories?category=${categoryId}`,
  },
};

export default api;
