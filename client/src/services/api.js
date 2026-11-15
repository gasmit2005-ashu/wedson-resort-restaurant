import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('wedson_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('wedson_admin_token');
        localStorage.removeItem('wedson_admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    if (res.data.token) {
      localStorage.setItem('wedson_admin_token', res.data.token);
      localStorage.setItem('wedson_admin_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('wedson_admin_token');
    localStorage.removeItem('wedson_admin_user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('wedson_admin_user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('wedson_admin_token');
  }
};

export const menuService = {
  getAll: async (params) => {
    const res = await api.get('/menu', { params });
    return res.data;
  },
  getCategories: async () => {
    const res = await api.get('/menu/categories');
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/menu', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/menu/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/menu/${id}`);
    return res.data;
  },
  createCategory: async (data) => {
    const res = await api.post('/menu/categories', data);
    return res.data;
  }
};

export const reservationService = {
  create: async (data) => {
    const res = await api.post('/reservations', data);
    return res.data;
  },
  getAll: async (params) => {
    const res = await api.get('/reservations', { params });
    return res.data;
  },
  updateStatus: async (id, data) => {
    const res = await api.put(`/reservations/${id}/status`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/reservations/${id}`);
    return res.data;
  }
};

export const resortService = {
  createInquiry: async (data) => {
    const res = await api.post('/resort-inquiries', data);
    return res.data;
  },
  getAllInquiries: async (params) => {
    const res = await api.get('/resort-inquiries', { params });
    return res.data;
  },
  updateInquiryStatus: async (id, data) => {
    const res = await api.put(`/resort-inquiries/${id}/status`, data);
    return res.data;
  },
  deleteInquiry: async (id) => {
    const res = await api.delete(`/resort-inquiries/${id}`);
    return res.data;
  }
};

export const galleryService = {
  getAll: async (params) => {
    const res = await api.get('/gallery', { params });
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/gallery', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/gallery/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/gallery/${id}`);
    return res.data;
  }
};

export const contactService = {
  create: async (data) => {
    const res = await api.post('/contact', data);
    return res.data;
  },
  getAll: async () => {
    const res = await api.get('/contact');
    return res.data;
  },
  updateStatus: async (id, data) => {
    const res = await api.put(`/contact/${id}/status`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/contact/${id}`);
    return res.data;
  }
};

export const settingsService = {
  get: async () => {
    const res = await api.get('/settings');
    return res.data;
  },
  update: async (data) => {
    const res = await api.put('/settings', data);
    return res.data;
  }
};

export const statsService = {
  getDashboardStats: async () => {
    const res = await api.get('/admin/stats');
    return res.data;
  }
};

export const uploadService = {
  uploadImage: async (formData) => {
    const res = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
};

export default api;
