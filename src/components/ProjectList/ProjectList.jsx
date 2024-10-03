import React, { useState } from 'react';
import Project from './Project';
import './ProjectList.css'; 

const ProjectList = ({projects, createProject}) => {

  const [projectList, setProjects] = useState(projects || []);
  
  return (
    <section className="ProjectListContainer">
    <section className="AdditionContainer">
    <div className="addition-box" >
    <h1 className="title">New Project</h1>
    </div>
    </section>    
        {projectList.map((project, index) => (
            <Project 
            key = {index}
            id = {project.id}
            color="#f0f0f0" 
            title= {project.projectname} 
            description={project.description}
          />
        ))}
    </section>
  );
}
export default ProjectList;

