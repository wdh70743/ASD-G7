import React from 'react';
import './Project.css'; 
import './ProjectList.css'; 

const Project = ({ color, title, subtitle }) => {
  return (
    <div className="rectangle-box" style={{ backgroundColor: color }}>
        <h1 className="title">{title}</h1>
    </div>
  );
}

export default Project;
