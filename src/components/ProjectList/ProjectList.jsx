import React, { useState } from 'react';
import Project from './Project';
import './ProjectList.css'; 

const ProjectList = () => {

  const [projects, setProjects] = useState([
    {
      id: 432,
      projectName: "Project 1",
      description: "This is a description for Project 1.",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      priority: "High",
      status: 'Not Started', 
    },
    {
      id: 21212,
      projectName: "Project 2",
      description: "This is a description for Project 1.",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      priority: "High",
      status: 'Not Started', 
    },

    {
      id: 6746,
      projectName: "Project 3",
      description: "This is a description for Project 1.",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      priority: "High",
      status: 'Not Started', 
    },

  ]);
  return (
    <section className="ProjectListContainer">
    <section className="AdditionContainer">
    <div className="addition-box" >
    <h1 className="title">New Project</h1>
    </div>
    </section>    
        {projects.map((project, index) => (
            <Project 
            key = {index}
            id = {project.id}
            color="#f0f0f0" 
            title= {project.projectName} 
            description={project.description}
          />
        ))}
    </section>
  );
}
export default ProjectList;

