import React, { useState } from 'react';
import '../Styles/Task.css';

const Task = ({ title, description, startDate, endDate, priority, status, onEdit, onDelete, onToggleStatus }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible(prevState => !prevState);
  };

  return (
    <div className="task-box" style={{ backgroundColor: status ? 'rgba(64, 217, 43, 0.5)' : 'rgba(240, 240, 240, 0.8)' }}>
      <input 
        checked={status} 
        onChange={onToggleStatus} // Call the toggle function
        type="checkbox" 
      />
      <div>
        <div className="task-title" onClick={toggleDetails}>
          <h4>{title}</h4>
        </div>
        {detailsVisible && (
          <div className="task-details">
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Start Date:</strong> {startDate}</p>
            <p><strong>Due Date:</strong> {endDate}</p>
            <p><strong>Priority:</strong> {priority}</p>
          </div>
        )}
      </div>
      <div className="alter-task">      
        <button className='detail-button' onClick={toggleDetails}>
          {detailsVisible ? 'Hide Details' : 'Show Details'}
        </button>
        <button className='edit-button' onClick={onEdit}>
          Edit
        </button>
        <button className='delete-button' onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Task;


