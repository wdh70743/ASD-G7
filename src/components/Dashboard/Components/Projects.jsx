import React from 'react'
import '../Styles/Project.css'; 
import '../Styles/DashTaskList.css'; 

const Projects = ({color, title, subtitle}) => {
  return (
    <div className="rectangle-box" style={{ backgroundColor: color }}>
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
    </div>
  );
}

export default Projects