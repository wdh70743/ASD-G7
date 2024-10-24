import React from 'react';
import CompletedProject from './CompletedProject';
import '../Styles/CompletedProjectsList.css';

const CompletedProjectsList = ({ completedProjects}) => {
  if (!completedProjects.length) return <p className='No-Projects-Warnings' >There are no completed projects.</p>;

  return (
    <section className="CompletedProjectsListContainer">
      <div className="CompletedProjectsContainer">
        {completedProjects.map((project) => (
          <div className="ProjectContainer" key={project.id}> {/* Each project in its own container */}
            <CompletedProject project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompletedProjectsList;
