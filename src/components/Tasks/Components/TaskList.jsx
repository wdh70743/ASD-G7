import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/TaskList.css'
import Task from './Task';

const TaskList = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/Projects'); // Change to your actual projects route
  };

  const [taskForm, showTaskForm] = useState(false);

    
  const toggleForm = () => {
    showTaskForm(!taskForm)
  }

  return (
    <div className="main-container">
      <div className="task-list-header">
          <button className="back-button" onClick={handleBack}>Back</button>
          <div className="projectTitleDescription">
            <h2 >Project Name</h2>
            <p>This project will be based  on xxxxxxxj djnejejnqewekqfwefon xxxxxxxj</p>
          </div>
          <button onClick={toggleForm} className="new-task-button">{taskForm?"Cancel Task" : "New Task"}</button>
      </div>
        <div className="taskList">
        {taskForm &&           
          <div>
            Noza cant code
          </div> 
        }
          <Task
            title="Areo Branding Project" 
          />
          <Task
            title="Areo Branding Project" 
          />
          <Task
            title="Areo Branding Project" 
          />
          <Task
            title="Areo Branding Project" 
          />
          <Task
            title="Areo Branding Project" 
          />
          <Task
            title="Areo Branding Project" 
          />
      </div>
  </div>
  );
};

export default TaskList;