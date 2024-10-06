import React, { useState } from 'react';
import '../Styles/Task.css';

const Task = ({ title, description, startDate, endDate, priority, status, onEdit, onDelete, onToggleStatus, onArchive }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible(prevState => !prevState);
  };

  // Utility function to format date to dd/mm/yy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of year
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="task-box" style={{ backgroundColor: status ? 'rgba(64, 217, 43, 0.5)' : 'rgba(240, 240, 240, 0.8)' }}>
      <input 
        checked={status} 
        onChange={onToggleStatus} 
        type="checkbox" 
      />
      <div>
        <div className="task-title" onClick={toggleDetails}>
          <h4>{title}</h4>
        </div>
        {detailsVisible && (
          <div className="task-details">
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Start Date:</strong> {formatDate(startDate)}</p>
            <p><strong>Due Date:</strong> {formatDate(endDate)}</p>
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
        <button className='archive-button' onClick={onArchive}>Archive</button>
      </div>
    </div>
  );
};

export default Task;
