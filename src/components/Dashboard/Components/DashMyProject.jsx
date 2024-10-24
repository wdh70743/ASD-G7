import React from 'react';
import { useNavigate } from 'react-router-dom';


const DashMyProject = ({ color, title, description, id, status}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Projects/'+ id); 
  };

  // // Set the class or style based on the status
  // const backgroundColor = status ? '#d8d4d4' : '#e8544c'; // Change to gray if completed, otherwise default color
  // const projectClass = status ? 'rectangle-box gray-out' : 'rectangle-box'; // Add a class for gray-out
  
  return (
    <div className="rectangle-box" style={{ backgroundColor: color }} onClick={handleClick}>
      <div className="title-section">
        <h1 className="title">{title}</h1>
        {status && <span className="completed-badge">Completed</span>} {/* Badge moved inside title-section */}
      </div>

      <p className="subtitle">{description}</p>
    </div>
  );
};

export default DashMyProject;