import React from 'react';
import Project from './Projects';
import '../Styles/MyProjects.css'; 

const MyProjects = () => {
  return (
    <section className="ProjectListContainer">
        <h1 className="MyProjectTitle">My Projects</h1>
        <div className="DueTodayContainer"> 
          <Project 
            color="#e8544c" 
            title="Areo Project" 
            subtitle="Logo, Brand Identity, Brand Strategy" 
          />
          <Project 
            color="#b787f1" 
            title="Website Redesign" 
            subtitle="User Interface, User Experience" 
          />
          <Project 
            color="#e0ec5c" 
            title="Strategy Meeting" 
            subtitle="Planning, Research, Analysis" 
          />
          <Project 
            color="#d8d4d4" 
            title="Product Launch" 
            subtitle="Marketing, Logistics, Coordination" 
          />
          <Project 
            color="#e8544c" 
            title="Client Presentation" 
            subtitle="Sales Pitch, Design Review" 
          />
        </div>
    </section>
  );
}

export default MyProjects;
