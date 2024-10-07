import React from 'react';
import '../Styles/ArchiveList.css';
import ArchiveButton from './ArchiveButton';
import taskService from '../../../services/TaskService';

const ArchiveList = ({ archivedTasks = [], deleteTask, projects = [], setArchivedTasks, setSearchResults }) => {
  // Create a mapping of project IDs to project names using the `projectname` field
  const projectMapping = projects.reduce((acc, project) => {
    acc[project.id.toString()] = project.projectname;
    return acc;
  }, {});

  // Group tasks by project ID, using `archivedTasks` array
  const groupedTasks = archivedTasks.reduce((acc, task) => {
    const projectId = task.project ? task.project.toString() : "Unknown";
    if (!acc[projectId]) acc[projectId] = [];
    acc[projectId].push(task);
    return acc;
  }, {});

  // Toggle the archive status of the task and update both `archivedTasks` and `searchResults`
  const handleReassignTask = async (taskId) => {
    try {
      // Call the API to toggle the archive status
      await taskService.archiveTask(taskId);

      // Update both states (`archivedTasks` and `searchResults`)
      setArchivedTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
        setSearchResults(updatedTasks); // Also update searchResults with new reference
        return updatedTasks; // Return the new reference to trigger a re-render
      });
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
                    onClick={() => handleReassignTask(task.id)} // Call handleReassignTask when clicked
                  />
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
