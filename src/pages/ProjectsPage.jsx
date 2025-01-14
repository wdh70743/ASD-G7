import React, { useEffect, useCallback } from 'react';
import SimpleHero from '../components/Dashboard/Components/SimpleHero';
import useProjects from '../hooks/useProjects';
import ProjectList from '../components/ProjectList/ProjectList.jsx';


const ProjectsPage = () => {
  const userId = localStorage.getItem('userId');
  const userEmail = localStorage.getItem('email')
  const {updateProject, fetchProjectsByUser, createProject, deleteProject, loading, projects} = useProjects();

  const stableFetchProjects = useCallback(() => {
    if (userId) {
      fetchProjectsByUser(userId);
    }
  }, [fetchProjectsByUser, userId]);

  useEffect(() => {
    stableFetchProjects();
  }, [stableFetchProjects]);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <>
      <SimpleHero />
      <ProjectList userId={userId} userEmail={userEmail} projects={projects} createProject={createProject} deleteProject={deleteProject} updateProject={updateProject}/>
    </>
  );
};

export default ProjectsPage;