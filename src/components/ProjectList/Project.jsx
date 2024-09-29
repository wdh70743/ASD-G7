import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Project.css'; 
import './ProjectList.css'; 

const Project = ({ color, title, description, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Projects/'+id); 
  };
  
  return (
    <div className="rectangle-box" style={{ backgroundColor: color }} onClick={handleClick}>
        <h1 className="title">{title}</h1>
        <p className="subtitle">{description}</p>
        
    </div>
  );
}

export default Project;