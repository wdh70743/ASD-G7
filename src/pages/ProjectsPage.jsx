import React from 'react';
import SimpleHero from '../components/Dashboard/Components/SimpleHero';
import ShareToggleSection from '../components/Share/ShareToggle.jsx';
import ProjectList from '../components/ProjectList/ProjectList.jsx';

const ProjectsPage = () => {
  return (
    <>
      <SimpleHero />
      {/* <ShareToggleSection /> */}
      <ProjectList />
    </>
  );
};

export default ProjectsPage;