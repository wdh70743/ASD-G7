import { useState, useCallback } from 'react';
import ProjectService from '../services/ProjectService.js';

const useProjects = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState([])


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

  const createProject = useCallback(async (newProject) => {
    console.log('Creating project:', newProject); // Log to see the payload
    setLoading(true);
    setError(null);
    try {
        const response = await ProjectService.createProject(newProject);
        console.log('Create response:', response.data);
        setProjects(prevProjects => [...prevProjects, response.data]);
    } catch (err) {
        console.error('Create task error:', err.response?.data || err); // Log the full error response
        setError(err.response?.data?.message || 'Failed to create task');
    } finally {
        setLoading(false);
    }
}, []);

const fetchProjectByProjectID = useCallback(async (projectID) => {
  setLoading(true);
  setError(null);
  console.log(`Fetching projects for project ID: ${projectID}`);

  try {
    const response = await ProjectService.getProjectByProjectId(projectID);
    console.log('API Response:', response.data);

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

  return { fetchProjectsByUser, fetchProjectByProjectID, createProject, loading, projects, project, error};
};

export default useProjects;




