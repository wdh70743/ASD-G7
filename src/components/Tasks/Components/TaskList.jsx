import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/TaskList.css';
import Task from './Task';

const TaskList = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/Projects'); 
  };

  const [taskForm, showTaskForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskStartDate, setTaskStartDate] = useState('');
  const [taskEndDate, setTaskEndDate] = useState('');
  const [newTaskButtonColor, setNewTaskButtonColor] = useState('#007BFF');

  const toggleForm = () => {
    const newColor = !taskForm ? 'red' : '#007BFF';
    setNewTaskButtonColor(newColor);
    showTaskForm(!taskForm);
    if (taskForm) {
      resetForm();
    }
  };

  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskPriority('Medium');
    setTaskStartDate('');
    setTaskEndDate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task Created:', { 
      taskName, 
      taskDescription, 
      taskPriority, 
      taskStartDate, 
      taskEndDate 
    });
    resetForm();
    showTaskForm(false);
    setNewTaskButtonColor('#007BFF');
  };

  // Function to handle editing a task
  const handleEditTask = ({ title, description, startDate, endDate, priority }) => {
    setTaskName(title);
    setTaskDescription(description);
    setTaskStartDate(startDate); 
    setTaskEndDate(endDate);
    setTaskPriority(priority);
    showTaskForm(true); 
  };

  return (
    <div className="main-container">
      <div className="task-list-header">
        <button className="back-button" onClick={handleBack}>Back</button>
        <div className="projectTitleDescription">
          <h2>Project Name</h2>
          <p>This project will be based on xxxxxxxj djnejejnqewekqfwefon xxxxxxxj</p>
        </div>
        <button 
          onClick={toggleForm} 
          className="new-task-button" 
          style={{ backgroundColor: newTaskButtonColor }}
        >
          {taskForm ? "Cancel Task" : "New Task"}
        </button>
      </div>
      <div className="task-form-list">
        {taskForm &&           
          <form className="new-task-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="taskName">Task Name</label>
              <input
                id="taskName"
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Task Description</label>
              <input
                id="taskDescription"
                type="text"
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskStartDate">Start Date</label>
              <input
                id="taskStartDate"
                type="date"
                value={taskStartDate}
                onChange={(e) => setTaskStartDate(e.target.value)}
                required
                className="set-task-date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskEndDate">End Date</label>
              <input
                id="taskEndDate"
                type="date"
                value={taskEndDate}
                onChange={(e) => setTaskEndDate(e.target.value)}
                required
                className="set-task-date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskPriority">Priority</label>
              <select
                id="taskPriority"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                className="priority-dropdown"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="submit-button-container">
              <button type="submit" className="submit-button">Add Task</button>
            </div>
          </form>
        }
      </div>
      <div>
        <Task 
          title="Task 1" 
          description="This is a description for Task 1." 
          startDate="2024-09-01" 
          endDate="2024-09-10" 
          priority="High" 
          onEdit={handleEditTask} // Pass the edit handler
        />
      </div>
    </div>
  );
};

export default TaskList;



