import React from 'react';
import Project from './Project';
import './ProjectList.css'; 

const ProjectList = () => {
  return (
    <section className="ProjectListContainer">
    <section className="AdditionContainer">
    <div className="addition-box" >
    <h1 className="title">New Project</h1>
    </div>
    </section>    
          <Project 
            color="#e8544c" 
            title="Areo Branding Project" 
          />
          <Project 
            color="#b787f1" 
            title="Project 2" 
          />
          <Project 
            color="#e0ec5c" 
            title="PRoject 3" 
          /> 
    </section>
  );
}

export default ProjectList;

