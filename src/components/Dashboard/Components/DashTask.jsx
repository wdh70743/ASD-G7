import React from 'react';
import '../Styles/DashTask.css'; 
import { useNavigate } from 'react-router-dom';
import { MdPriorityHigh } from 'react-icons/md';

const DashTask = ({ color, title, subtitle, project, priority, status }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Projects/' + project); 
  };

  // Set the class or style based on the status
  const backgroundColor = status ? '#d8d4d4' : '#e8544c'; // Change to gray if completed, otherwise default color
  const taskClass = status ? 'rectangle-box gray-out' : 'rectangle-box'; // Add a class for gray-out


  return (
    <div className={taskClass} style={{ backgroundColor }} onClick={handleClick}>
      <div className="title-section">
        <h1 className="title">{title}</h1>
        <p className="priority">{priority} Priority</p>
      </div>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
}

export default DashTask;

