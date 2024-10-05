import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Project.css'; 
import './ProjectList.css'; 

const Project = ({ color, title, description, id, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Projects/' + id); 
  };

  const handleEdit = (event) => {
    event.stopPropagation(); 
    onEdit();
  };

  const handleDelete = (event) => {
    event.stopPropagation(); 
    onDelete();
  };

  return (
    <div className="rectangle-box" style={{ backgroundColor: color }} onClick={handleClick}>
      <h1 className="title">{title}</h1>
      <p className="subtitle">{description}</p>

      <div className="centered-content">
        <div className="alter-project">
          <button className='edit-button' onClick={handleEdit}>
            Edit
          </button>
          <button className='delete-button' onClick={handleDelete}>Delete</button>
        </div>
      
      </div>
    </div>
  );
};

export default Project;
