import React from 'react'
import './TaskList.css'; 
import Task from './Task';

const TaskList = () => {
  return (
    <section className="TaskListContainer">
        <h1 className="TaskListTitle">Due Today</h1>
        <Task color="#EF643B" />
        <Task color="#03C879" />
        <Task color="#5831EE " />
    </section>
  )
}

export default TaskList