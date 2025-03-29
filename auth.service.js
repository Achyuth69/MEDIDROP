
import api from './api';

const AuthService = {
  register: async (name, email, password, role) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        role
      });
      
      if (response.data.token) {
        localStorage.setItem('medidrop-token', response.data.token);
        localStorage.setItem('medidrop-user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },
  
  login: async (email, password, role) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        role
      });
      
      if (response.data.token) {
        localStorage.setItem('medidrop-token', response.data.token);
        localStorage.setItem('medidrop-user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },
  
  logout: () => {
    localStorage.removeItem('medidrop-token');
    localStorage.removeItem('medidrop-user');
  },
  
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('medidrop-user'));
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('medidrop-token');
  }
};

export default AuthService;
