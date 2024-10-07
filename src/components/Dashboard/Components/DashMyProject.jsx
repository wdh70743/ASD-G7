import React from 'react';
import { useNavigate } from 'react-router-dom';


const DashTask = ({ color, title, description, project}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Projects/'+project); 
  };

  return (
    <div className="rectangle-box" style={{ backgroundColor: color }} onClick={handleClick}>
      <div className="title-section">
        <h1 className="title">{title}</h1>
      </div>

        <p className="subtitle">{description}</p>
    </div>
  );
}

export default DashTask;