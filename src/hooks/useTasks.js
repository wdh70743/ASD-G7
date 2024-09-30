import { useState, useCallback } from 'react';
import taskService from '../services/TaskService.js';

const useTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);

  const fetchTasksByUser = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    console.log(`Fetching tasks for user ID: ${userId}`);

    try {
      const response = await taskService.getTasksByUser(userId);
      console.log('API Response:', response.data);

      if (response && response.data) {
        const allTasks = response.data.tasks || response.data;
        setTasks(allTasks);

        // Filter tasks due today
        const today = new Date();
        const dueToday = allTasks.filter(task => {
          const dueDate = new Date(task.due_date); 
          return (
            dueDate.getFullYear() === today.getFullYear() &&
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getDate() === today.getDate()
          );
        });
        setTodayTasks(dueToday);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTasksByProject = useCallback(async (projectID) => {
    setLoading(true);
    setError(null);
    console.log(`Fetching tasks for project ID: ${projectID}`);

    try {
      const response = await taskService.getTasksByProject(projectID);
      console.log('API Response:', response.data);

      if (response && response.data) {
        const allTasks = response.data.tasks || response.data;
        setTasks(allTasks);
      } else {
        // Handle case where response indicates no tasks
        setTasks([]);
      }
    } catch (err) {
      // Only set error if it is not a "no tasks" scenario
      if (err.response?.status !== 204) {
        setError(err.response?.data?.message || 'Failed to fetch tasks');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    console.log(`Attempting to delete task with ID: ${taskId}`);
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.deleteTask(taskId);
      console.log('Delete response:', response);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchTasksByUser, fetchTasksByProject, deleteTask, tasks, todayTasks, loading, error };
};

export default useTasks;




