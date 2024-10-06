import { useState, useCallback } from 'react';
import taskService from '../services/TaskService.js';

const useTasks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [taskCompletionRate, setTaskCompletionRate] = useState(null);

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

        setTaskCompletionRate(Math.floor((dueToday.filter(task => task.status === true).length / dueToday.length)*100))
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchArchivedTasksByUser = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    console.log(`Fetching archived tasks for user ID: ${userId}`);

    try {
      const response = await taskService.getArchivedTasksByUser(userId);
      console.log('Archived Tasks API Response:', response.data);

      if (response && response.data) {
        const allArchivedTasks = response.data.tasks || response.data;
        setArchivedTasks(allArchivedTasks);
      } else {
        setArchivedTasks([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch archived tasks');
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
  
      // Update both `tasks` and `archivedTasks` states to reflect the deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setArchivedTasks((prevArchivedTasks) => prevArchivedTasks.filter((task) => task.id !== taskId)); // Ensure archivedTasks state is updated
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  }, []);
  

  const createTask = useCallback(async (newTask) => {
    console.log('Creating task:', newTask); // Log to see the payload
    setLoading(true);
    setError(null);
    try {
        const response = await taskService.createTask(newTask);
        console.log('Create response:', response.data);
        setTasks(prevTasks => [...prevTasks, response.data]); // Update state
    } catch (err) {
        console.error('Create task error:', err.response?.data || err); // Log the full error response
        setError(err.response?.data?.message || 'Failed to create task');
    } finally {
        setLoading(false);
    }
}, []);

const updateTask = useCallback(async (taskId, updatedTask) => {
  console.log('Updating task:', taskId); // Log to see the payload
  setLoading(true);
  setError(null);
  try {
      const response = await taskService.updateTask(taskId, updatedTask); // Call the updated service method
      console.log('Update response:', response.data);
      setTasks(prevTasks => 
          prevTasks.map(task => (task.id === taskId ? response.data : task)) // Update the task in state
      );
  } catch (err) {
      console.error('Update task error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to update task');
  } finally {
      setLoading(false);
  }
}, []);


return { 
  fetchTasksByUser, 
  fetchArchivedTasksByUser,
  fetchTasksByProject, 
  deleteTask, 
  createTask, 
  updateTask, 
  tasks, 
  todayTasks, 
  taskCompletionRate,
  archivedTasks,
  loading, 
  error 
};
};

export default useTasks;




