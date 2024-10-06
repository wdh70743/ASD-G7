import React from 'react';
import '../Styles/ArchiveList.css';
import ArchiveButton from './ArchiveButton';

const ArchiveList = ({ archivedTasks = [], deleteTask, projects = [] }) => {
  // Create a mapping of project IDs to project names using the `projectname` field
  const projectMapping = projects.reduce((acc, project) => {
    acc[project.id.toString()] = project.projectname; // Ensure mapping uses `projectname`
    return acc;
  }, {});

  // Group tasks by project ID, using `archivedTasks` array
  const groupedTasks = archivedTasks.reduce((acc, task) => {
    const projectId = task.project ? task.project.toString() : "Unknown"; // Ensure project ID is a string
    if (!acc[projectId]) acc[projectId] = [];
    acc[projectId].push(task);
    return acc;
  }, {});

  return (
    <div className="archive-list">
      {Object.keys(groupedTasks).length > 0 ? (
        Object.keys(groupedTasks).map((projectId) => (
          <div key={projectId} className="project-container">
            {/* Use `projectMapping` to get the project name */}
            <h2 className="project-title">
              {projectMapping[projectId] || `Unknown Project (${projectId})`}
            </h2>
            {groupedTasks[projectId].map((task) => (
              <div key={task.id} className="archive-item">
                <div className="archive-info">
                  <h3>{task.title}</h3>
                  <p>Archived on: {task.archived_at || 'N/A'}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Description: {task.description}</p>
                </div>
                <div className="archive-buttons">
                  <ArchiveButton name="Reassign" />
                  <ArchiveButton
                    name="Delete"
                    onClick={() => deleteTask(task.id)} // Call deleteTask with task ID
                  />
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
