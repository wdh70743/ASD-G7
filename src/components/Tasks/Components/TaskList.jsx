import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/TaskList.css';
import Task from './Task';

const TaskList = ({ userId, tasks, projectId, deleteTask, createTask, updateTask }) => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState(tasks || []);
  const [taskForm, setTaskForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskStartDate, setTaskStartDate] = useState('');
  const [taskEndDate, setTaskEndDate] = useState('');
  const [newTaskButtonColor, setNewTaskButtonColor] = useState('#007BFF');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleBack = () => navigate('/Projects'); 

  const toggleForm = () => {
    const newColor = !taskForm ? 'red' : '#007BFF';
    setNewTaskButtonColor(newColor);
    setTaskForm(!taskForm);
    if (taskForm) resetForm();
  };

  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskPriority('Medium');
    setTaskStartDate('');
    setTaskEndDate('');
    setEditingIndex(null);
  };

  const formatDateForAPI = (dateString) => {
    return new Date(dateString).toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { 
      title: taskName, 
      description: taskDescription, 
      start_date: formatDateForAPI(taskStartDate),
      due_date: formatDateForAPI(taskEndDate),
      priority: taskPriority,
      status: false,
      repeat_interval: null,
      is_archived: false,
      archived_at: null,
      owner: userId,
      project: projectId,
    };

    if (editingIndex !== null) {
      const taskId = taskList[editingIndex].id;
      await updateTask(taskId, newTask);
    } else {
      await createTask(newTask);
    }

    resetForm();
    setTaskForm(false);
    setNewTaskButtonColor('#007BFF');
  };

  const handleEditTask = (taskId) => {
    const task = taskList.find(t => t.id === taskId);
    if (task) {
      setTaskName(task.title);
      setTaskDescription(task.description);
      setTaskStartDate(task.start_date.split('T')[0]); // Setting to YYYY-MM-DD for input
      setTaskEndDate(task.due_date.split('T')[0]); // Setting to YYYY-MM-DD for input
      setTaskPriority(task.priority);
      setEditingIndex(taskList.findIndex(t => t.id === taskId));
      setTaskForm(true);
      setNewTaskButtonColor('red');
    } else {
      console.error('Task not found for ID:', taskId);
    }
  };

  const handleDeleteTask = (taskId) => deleteTask(taskId);

  const toggleTaskStatus = (taskId) => {
    setTaskList(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: !task.status } : task
      )
    );
  };

  useEffect(() => {
    console.log('Current tasks:', taskList);
  }, [taskList]);

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
      {taskForm && (
        <div className="task-form-list">
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
        </div>
      )}
      <div>
        {taskList.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          taskList.map((task) => (
            <Task 
              key={task.id}
              title={task.title}
              description={task.description}
              startDate={task.start_date}
              endDate={task.due_date}
              priority={task.priority}
              status={task.status}
              onEdit={() => handleEditTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
              onToggleStatus={() => toggleTaskStatus(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;


