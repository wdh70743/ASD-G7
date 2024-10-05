import { useState, useCallback } from 'react';
import userService from '../services/UserService.js';

const useProjects = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setData] = useState(null);


  const fetchUserData = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    console.log(`Fetching information for user ID: ${userId}`);

    try {
      const response = await userService.getUserData(userId);
      console.log('API Response:', response.data);

      if (response && response.data) {
        const userData = response.data.userData || response.data;
        setData(userData);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (userID) => {
    console.log(`Attempting to delete user with ID: ${userID}`);
    setLoading(true);
    setError(null);
    try {
      const response = await userService.deleteUser(userID);
      console.log('Delete response:', response);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete profile');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userID, updatedUser) => {
    console.log('Updating task:', userID); 
    setLoading(true);
    setError(null);
    try {
        const response = await userService.updateUser(userID, updatedUser); 
        console.log('Update response:', response.data);
    } catch (err) {
        console.error('Update profile error:', err.response?.data || err);
        setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
        setLoading(false);
    }
  }, []);


  return { updateUser, deleteUser, fetchUserData, userData, loading, error};
};

export default useProjects;




