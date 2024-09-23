import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Project.css'; 
import './ProjectList.css'; 

const Project = ({ color, title, subtitle }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Tasks'); 
  };
  
  return (
    <div className="rectangle-box" style={{ backgroundColor: color }} onClick={handleClick}>
        <h1 className="title">{title}</h1>
    </div>
  );
}

export default Project;