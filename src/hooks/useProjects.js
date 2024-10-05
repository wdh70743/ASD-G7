import { useState, useCallback } from 'react';
import ProjectService from '../services/ProjectService.js';
import projectService from '../services/ProjectService.js';

const useProjects = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);


  const fetchProjectsByUser = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    console.log(`Fetching projects for user ID: ${userId}`);

    try {
      const response = await ProjectService.getProjectsByUser(userId);
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

  const deleteProject = useCallback(async (id) => {
    console.log(`Attempting to delete task with ID: ${id}`);
    setLoading(true);
    setError(null);
    try {
      const response = await projectService.deleteProject(id);
      console.log('Delete response:', response);
      setProjects(prevTasks => prevTasks.filter(project => project.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (newProject) => {
    console.log('Creating project:', newProject);
    setLoading(true);
    setError(null);
    try {
        const response = await ProjectService.createProject(newProject);
        console.log('Create response:', response.data);
        setProjects(prevProjects => [...prevProjects, response.data]);
    } catch (err) {
        console.error('Create task error:', err.response?.data || err); 
        setError(err.response?.data?.message || 'Failed to create task');
    } finally {
        setLoading(false);
    }
}, []);


const updateProject = useCallback(async (id, updatedProject) => {
  console.log('Updating project:', id); 
  setLoading(true);
  setError(null);
  try {
      const response = await projectService.updateProject(id, updatedProject); 
      console.log('Update response:', response.data);
      setProjects(prevTasks => 
          prevTasks.map(project => (project.id === id ? response.data : project)) 
      );
  } catch (err) {
      console.error('Update task error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to update project');
  } finally {
      setLoading(false);
  }
}, []);

  return {updateProject, deleteProject, fetchProjectsByUser, createProject, loading, projects, error};
};

export default useProjects;




