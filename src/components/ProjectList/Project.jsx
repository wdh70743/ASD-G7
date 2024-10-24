import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Project.css'; 
import './ProjectList.css'; 

const Project = ({ color, title, description, startDate, endDate, priority, status, isArchived, id, onEdit, onDelete, onToggleStatus }) => {
  const navigate = useNavigate();
  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleClick = () => {
    navigate('/Projects/' + id); 
  };

  const toggleDetails = (event) => {
    event.stopPropagation(); 
    setDetailsVisible((prevState) => !prevState);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleCheckboxChange = (event) => {
    event.stopPropagation(); 
    onToggleStatus(id);
  };
  
  const boxStyle = {
    backgroundColor: status ? 'rgba(64, 217, 43, 0.5)' : 'rgba(240, 240, 240, 0.8)',
  };

  return (
    <div className="Project-rectangle-box" style={boxStyle} onClick={handleClick}>
      <div className="project-title" onClick={(e) => e.stopPropagation()}>
        <input 
          type="checkbox" 
          checked={status} 
          onChange={handleCheckboxChange}
          className="project-checkbox"
        />
        <h1 className="title" onClick={toggleDetails}>{title}</h1>
      </div>
      {detailsVisible && (
        <div className="project-details">
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Start Date:</strong> {formatDate(startDate)}</p>
          <p><strong>Due Date:</strong> {formatDate(endDate)}</p>
          <p><strong>Priority:</strong> {priority}</p>
          <p><strong>Status:</strong> {status ? 'Active' : 'Inactive'}</p>
        </div>
      )}
      <div className="centered-content">
        <div className="alter-project">
          <button className='detail-button' onClick={toggleDetails}>
            {detailsVisible ? 'Hide Details' : 'Show Details'}
          </button>
          <button className='edit-button' onClick={(event) => { event.stopPropagation(); onEdit(); }}>
            Edit
          </button>
          <button className='delete-button' onClick={(event) => { event.stopPropagation(); onDelete(); }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
