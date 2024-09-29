import React from 'react'
import SimpleHero from '../components/Dashboard/Components/SimpleHero';
import TaskList from '../components/Tasks/Components/TaskList';
import { useParams } from 'react-router-dom';

const TasksPage = () => {
const {id} = useParams();
  return (
    <div>
        <SimpleHero />
        <TaskList />
    </div>

  )
}

export default TasksPage