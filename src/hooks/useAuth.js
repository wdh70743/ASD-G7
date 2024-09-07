import { useState } from 'react';
import userService from '../services/UserService.js'; // Your UserService that handles API calls

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (user) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.register(user);
      setLoading(false);
      return response;  // Return the data to the component for further actions
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
      setLoading(false);
      return response;  // Return the data to the component for further actions
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return { register, login, loading, error };
};

export default useAuth;
