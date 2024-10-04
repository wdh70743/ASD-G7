import React, { useEffect, useCallback } from 'react';
import SimpleHero from '../components/Dashboard/Components/SimpleHero';
import useProjects from '../hooks/useProjects';
import ProjectList from '../components/ProjectList/ProjectList.jsx';


const ProjectsPage = () => {
  const userId = localStorage.getItem('userId');
  const {fetchProjectsByUser, createProject, deleteProject, loading, projects} = useProjects();

  const stableFetchTasks = useCallback(() => {
    if (userId) {
      fetchProjectsByUser(userId);
    }
  }, [fetchProjectsByUser, userId]);

  useEffect(() => {
    stableFetchTasks();
  }, [stableFetchTasks]);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <>
      <SimpleHero />
      <ProjectList userId={userId} projects={projects} createProject={createProject} deleteProject={deleteProject}/>
    </>
  );
};

export default ProjectsPage;