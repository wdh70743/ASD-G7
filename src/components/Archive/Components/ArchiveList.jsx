import React from 'react';
import '../Styles/ArchiveList.css';
import ArchiveButton from './ArchiveButton';
import taskService from '../../../services/TaskService';

const ArchiveList = ({ archivedTasks = [], deleteTask, projects = [], setArchivedTasks }) => {
  const projectMapping = projects.reduce((acc, project) => {
    acc[project.id.toString()] = project.projectname;
    return acc;
  }, {});

  const groupedTasks = archivedTasks.reduce((acc, task) => {
    const projectId = task.project ? task.project.toString() : "Unknown";
    if (!acc[projectId]) acc[projectId] = [];
    acc[projectId].push(task);
    return acc;
  }, {});

  const handleReassignTask = async (taskId) => {
    try {
      await taskService.archiveTask(taskId);

      setArchivedTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Failed to reassign/archive task', error);
    }
  };

  return (
    <div className="archive-list">
      {Object.keys(groupedTasks).length > 0 ? (
        Object.keys(groupedTasks).map((projectId) => (
          <div key={projectId} className="project-container">
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
                  <ArchiveButton
                    name="Reassign"
                    onClick={() => handleReassignTask(task.id)}
                  />
                  <ArchiveButton
                    name="Delete"
                    onClick={() => deleteTask(task.id)}
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
