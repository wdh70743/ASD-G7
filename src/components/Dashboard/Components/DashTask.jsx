import React from 'react';
import '../Styles/DashTask.css'; 
import '../Styles/DashTaskList.css'; 
import { useNavigate } from 'react-router-dom';

const DashTask = ({ color, title, subtitle, project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Projects/'+project); 
  };

  return (
    <div className="rectangle-box" style={{ backgroundColor: color }} onClick={handleClick}>
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
    </div>
  );
}

export default DashTask;
