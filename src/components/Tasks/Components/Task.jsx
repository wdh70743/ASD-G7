import React, { useState } from 'react';
import '../Styles/Task.css';

const Task = ({ title, description, startDate, endDate, priority, onEdit }) => {
  const [taskComplete, setTaskComplete] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const checkHandler = () => {
    setTaskComplete(prevState => !prevState);
  };

  const toggleDetails = () => {
    setDetailsVisible(prevState => !prevState);
  };

  return (
    <div className="task-box" style={{ backgroundColor: taskComplete ? 'rgba(64, 217, 43, 0.5)' : 'rgba(240, 240, 240, 0.8)' }}>
      <input 
        checked={taskComplete} 
        onChange={checkHandler} 
        type="checkbox" 
      />
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
      <div className="alter-task">      
        <button className='detail-button' onClick={toggleDetails}>
          {detailsVisible ? 'Hide Details' : 'Show Details'}
        </button>
        <button className='edit-button' onClick={() => onEdit({ title, description, startDate, endDate, priority })}>
          Edit
        </button>
        <button className='delete-button'>Delete</button>
      </div>
    </div>
  );
};

export default Task;


