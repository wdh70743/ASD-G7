import { useState, useCallback } from 'react';
import taskService from '../services/TaskService.js';

const useProjects = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);


  const fetchProjectsByUser = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    console.log(`Fetching projects for user ID: ${userId}`);

    try {
      const response = await taskService.fetchProjectsByUser(userId);
      console.log('API Response:', response.data);

      if (response && response.data) {
        const allProjects = response.data.projects || response.data;
        setProjects(allProjects);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchProjectsByUser};
};

export default useProjects;




