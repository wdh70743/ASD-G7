import React from 'react';
import { useNavigate } from 'react-router-dom';


const DashMyProject = ({ color, title, description, id}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Projects/'+ id); 
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

export default DashMyProject;