import React from 'react'
import SimpleHero from '../components/Dashboard/Components/SimpleHero';
import TaskList from '../components/Tasks/Components/TaskList';

const TasksPage = () => {
  return (
    <div>
        <SimpleHero />
        <TaskList />
    </div>

  )
}

export default TasksPage