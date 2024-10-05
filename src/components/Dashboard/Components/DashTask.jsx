import React from 'react';
import '../Styles/DashTask.css'; 
// import '../Styles/DashTaskList.css'; 
import { useNavigate } from 'react-router-dom';
import { MdPriorityHigh } from 'react-icons/md';

const DashTask = ({ color, title, subtitle, project, priority }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Projects/'+project); 
  };

  return (
    <div className="rectangle-box" style={{ backgroundColor: color }} onClick={handleClick}>
      <div className="title-section">
        <h1 className="title">{title}</h1>
        <p className="priority">{priority} Priority</p>
      </div>

        <p className="subtitle">{subtitle}</p>
    </div>
  );
}

export default DashTask;
