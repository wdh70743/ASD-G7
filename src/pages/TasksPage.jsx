import React, { useEffect, useCallback, useState } from 'react';
import SimpleHero from '../components/Dashboard/Components/SimpleHero';
import TaskList from '../components/Tasks/Components/TaskList';
import useTasks from '../hooks/useTasks';
import useProjects from '../hooks/useProjects';
import { useParams } from 'react-router-dom';
import './Styles/TasksPage.css';

const TasksPage = () => {
  const userId = localStorage.getItem('userId');
  const { 
    fetchTasksByProject, 
    deleteTask, 
    createTask, 
    updateTask, 
    tasks, 
    loading 
  } = useTasks();
  
  const { fetchProjectByProjectID, project } = useProjects();
  const { id } = useParams(); // project_ID


  const stableFetchTasks = useCallback(() => {
    if (id) {
      fetchTasksByProject(id);
    }
  }, [fetchTasksByProject, id]);

  const stableFetchProject = useCallback(() => {
    if (id) {
      fetchProjectByProjectID(id);
    }
  }, [fetchProjectByProjectID, id]);

  useEffect(() => {
    stableFetchTasks();
    stableFetchProject();
  }, [stableFetchTasks, stableFetchProject]);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <SimpleHero />
      {userId ? (
        <>
          <TaskList 
            userId={userId} 
            tasks={tasks} 
            projectId={id} 
            projectName={project.projectname} 
            projectDescription={project.description} 
            deleteTask={deleteTask} 
            createTask={createTask} 
            updateTask={updateTask} 
          />
          {tasks.length === 0 && <p>No tasks available for this project.</p>}
        </>
      ) : (
        <p>Please log in to view your tasks.</p>
      )}
    </div>
  );
};
export default TasksPage;






