import { useState } from 'react';
import userService from '../services/UserService.js';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (user) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.register(user);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.login(email, password);
      if (response && response.data) {
        localStorage.clear();

        const { id, email, username } = response.data.user;
        
        localStorage.setItem('userId', id);
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
      }
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.clear();
  };

  return { register, login, logout, loading, error };
};

export default useAuth;
