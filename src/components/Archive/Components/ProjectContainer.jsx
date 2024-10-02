import React, { useState } from 'react';
import '../Styles/ProjectContainer.css';

const ProjectContainer = ({ projectId, projectName, tasks }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="project-container">
      <div className="project-header" onClick={handleExpand}>
        <h3>{projectName}</h3>
        <button>{isExpanded ? 'Collapse' : 'Expand'}</button>
      </div>
      {isExpanded && (
        <div className="project-tasks">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <h4>{task.description}</h4>
              <p>Priority: {task.priority}</p>
              <p>Archived At: {new Date(task.archived_at).toLocaleString()}</p>
              <div className="task-actions">
                <button onClick={() => console.log('Unarchive Task:', task.id)}>Unarchive</button>
                <button onClick={() => console.log('Delete Task:', task.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectContainer;
