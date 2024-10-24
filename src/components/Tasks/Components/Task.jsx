import React, { useState } from 'react';
import '../Styles/Task.css';

const Task = ({ title, description, startDate, endDate, priority, status, isArchived, onEdit, onDelete, onToggleStatus, onArchive, files }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible((prevState) => !prevState);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="task-box" style={{ backgroundColor: status ? 'rgba(64, 217, 43, 0.5)' : 'rgba(240, 240, 240, 0.8)' }}>
      <input checked={status} onChange={onToggleStatus} type="checkbox" />
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
            {files && (
              files.map((file) => (<div><strong>Task File:</strong> <a href={file.file_uri} download>Download</a></div>))
            )}
          </div>
        )}
      </div>
      <div className="alter-task">      
        <button className='detail-button' onClick={toggleDetails}>
          {detailsVisible ? 'Hide Details' : 'Show Details'}
        </button>
        <button className='TaskEdit-button' onClick={onEdit}>
          Edit
        </button>
        <button className='delete-button' onClick={onDelete}>Delete</button>
        {/* Change button text based on archive status */}
        <button className='archive-button' onClick={onArchive}>
          {isArchived ? 'Reassign' : 'Archive'}
        </button>
      </div>
    </div>
  );
};

export default Task;
