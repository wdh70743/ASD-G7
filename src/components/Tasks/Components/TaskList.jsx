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
  const [tasks, setTasks] = useState([
    {
      id: 343,
      title: "Task 1",
      description: "This is a description for Task 1.",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      priority: "High",
      status: false, 
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);

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
    setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = { 
      title: taskName, 
      description: taskDescription, 
      startDate: taskStartDate, 
      endDate: taskEndDate, 
      priority: taskPriority,
      status: false, 
    };

    if (editingIndex !== null) {
      setTasks(prevTasks => {
        const newTasks = [...prevTasks];
        newTasks[editingIndex] = updatedTask; // Update existing task
        return newTasks;
      });
    } else {
      setTasks(prevTasks => [...prevTasks, updatedTask]); // Add new task
    }

    resetForm();
    showTaskForm(false);
    setNewTaskButtonColor('#007BFF');
  };

  const handleEditTask = (id, task) => {
    setTaskName(task.title);
    setTaskDescription(task.description);
    setTaskStartDate(task.startDate);
    setTaskEndDate(task.endDate);
    setTaskPriority(task.priority);
    showTaskForm(true);
    setEditingIndex(id);
  };

  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== id)); // Remove task at the specified index
  };

  function toggleTaskStatus(id) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      } else {
        return task;
      }
    }));
  }

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
              <button type="submit" className="submit-button">
                {editingIndex !== null ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        }
      </div>
      <div>
        {tasks.map((task) => (
          <Task 
            key={task.id}
            title={task.title}
            description={task.description}
            startDate={task.startDate}
            endDate={task.endDate}
            priority={task.priority}
            status={task.status} // Pass the status
            onEdit={() => handleEditTask(task.id, task)}
            onDelete={() => handleDeleteTask(task.id)}
            onToggleStatus={() => toggleTaskStatus(task.id)} // Pass the toggle handler
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

