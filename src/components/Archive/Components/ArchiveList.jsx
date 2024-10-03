import React from 'react';
import '../Styles/ArchiveList.css';
import ArchiveButton from './ArchiveButton';

const ArchiveList = ({ archivedTasks }) => {
  // Group tasks by project
  const groupedTasks = archivedTasks.reduce((acc, task) => {
    if (!acc[task.project]) acc[task.project] = [];
    acc[task.project].push(task);
    return acc;
  }, {});

  return (
    <div className="archive-list">
      {Object.keys(groupedTasks).length > 0 ? (
        Object.keys(groupedTasks).map(projectId => (
          <div key={projectId} className="project-container">
            <h2 className="project-title">Project {projectId}</h2> {/* Replace with actual project name if available */}
            {groupedTasks[projectId].map(task => (
              <div key={task.id} className="archive-item">
                <div className="archive-info">
                  <h3>{task.title}</h3>
                  <p>Archived on: {task.archived_at}</p>
                  <p>Priority: {task.priority}</p>
                </div>
                <div className="archive-buttons">
                  <ArchiveButton name="Reassign" />
                  <ArchiveButton name="Delete" />
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No archived tasks found</p>
      )}
    </div>
  );
};

export default ArchiveList;
