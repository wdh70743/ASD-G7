import React, { useEffect, useCallback } from 'react';
import SimpleHero from '../components/Dashboard/Components/SimpleHero';
import TaskList from '../components/Tasks/Components/TaskList';
import useTasks from '../hooks/useTasks';
import { useParams } from 'react-router-dom';
import './Styles/TasksPage.css';

const TasksPage = () => {
  const userId = localStorage.getItem('userId');
  const { fetchTasksByProject, deleteTask, tasks, loading } = useTasks();
  const { id } = useParams(); // project_ID

  const stableFetchTasks = useCallback(() => {
    if (id) {
      fetchTasksByProject(id);
    }
  }, [fetchTasksByProject, id]);

  useEffect(() => {
    stableFetchTasks();
  }, [stableFetchTasks]);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <SimpleHero />
      {userId ? (
        <>
          <TaskList userId={userId} tasks={tasks} deleteTask={deleteTask} />
          {tasks.length === 0}
        </>
      ) : (
        <p>Please log in to view your tasks.</p>
      )}
    </div>
  );
};

export default TasksPage;







