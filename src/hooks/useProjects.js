import { useState, useCallback } from 'react';
import ProjectService from '../services/ProjectService.js';
import projectService from '../services/ProjectService.js';

const useProjects = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState([])


  const fetchProjectsByUser = useCallback(async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ProjectService.getProjectsByUser(userId);

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
    setLoading(true);
    setError(null);
    try {
      const response = await projectService.deleteProject(id);
      setProjects(prevTasks => prevTasks.filter(project => project.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (newProject) => {
    setLoading(true);
    setError(null);
    try {
        const response = await ProjectService.createProject(newProject);
        setProjects(prevProjects => [...prevProjects, response.data]);
    } catch (err) {
        console.error('Create task error:', err.response?.data || err); 
        setError(err.response?.data?.message || 'Failed to create task');
    } finally {
        setLoading(false);
    }
}, []);

const updateProject = useCallback(async (id, updatedProject) => {
  setLoading(true);
  setError(null);
  try {
      const response = await projectService.updateProject(id, updatedProject); 
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

const fetchProjectByProjectID = useCallback(async (projectID) => {
  setLoading(true);
  setError(null);

  try {
    const response = await ProjectService.getProjectByProjectId(projectID);

    if (response && response.data) {
      const project = response.data.projects || response.data;
      setProject(project);
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to fetch project');
  } finally {
    setLoading(false);
  }
}, []);

  return {updateProject,deleteProject, fetchProjectsByUser, fetchProjectByProjectID, createProject, loading, projects, project, error};
};

export default useProjects;




