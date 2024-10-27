import { useState, useCallback } from 'react';
import taskService from '../services/TaskService.js';
import projectService from '../services/ProjectService.js';

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

    try {
      const response = await taskService.getTasksByUser(userId);

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

  const fetchArchivedTasksByUserOrOwner = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const userResponse = await taskService.getArchivedTasksByUser(userId);
      let allArchivedTasks = userResponse?.data?.tasks || userResponse?.data || [];

      // Fetch projects to get owner IDs
      const projectResponse = await projectService.getProjectsByUser(userId);
      const ownerIds = projectResponse?.data?.map(project => project.owner);

      // Fetch archived tasks for each owner ID
      const ownerArchivedTasksPromises = ownerIds.map(ownerId =>
        taskService.getArchivedTasksByUser(ownerId)
      );
      const ownerArchivedTasksResponses = await Promise.all(ownerArchivedTasksPromises);

      // Merge user archived tasks and owner archived tasks
      ownerArchivedTasksResponses.forEach(response => {
        if (response && response.data) {
          allArchivedTasks = [...allArchivedTasks, ...response.data.tasks || response.data];
        }
      });

      // Remove duplicate tasks based on task ID
      const uniqueArchivedTasks = allArchivedTasks.filter(
        (task, index, self) => index === self.findIndex(t => t.id === task.id)
      );

      setArchivedTasks(uniqueArchivedTasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch archived tasks');
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchTasksByProject = useCallback(async (projectID) => {
    setLoading(true);
    setError(null);

    try {
      const response = await taskService.getTasksByProject(projectID);

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
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.deleteTask(taskId);
  
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
  

  const createTask = useCallback(async (newTask, taskFile) => {
    setLoading(true);
    setError(null);
    try {
        const response = await taskService.createTask(newTask, taskFile);
        setTasks(prevTasks => [...prevTasks, response.data.data]); // Update state
    } catch (err) {
        setError(err.response?.data?.message || 'Failed to create task');
    } finally {
        setLoading(false);
    }
}, []);

const updateTask = useCallback(async (taskId, updatedTask, taskFile) => {
  setLoading(true);
  setError(null);
  try {
      const response = await taskService.updateTask(taskId, updatedTask, taskFile); // Call the updated service method
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
  fetchArchivedTasksByUserOrOwner,
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




