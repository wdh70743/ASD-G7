import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/TaskList.css';
import Task from './Task';
import taskService from '../../../services/TaskService';
import userService from '../../../services/UserService';

const TaskList = ({ userId, userEmail, tasks, projectId, projectName, projectDescription, deleteTask, createTask, updateTask }) => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);
  const [taskForm, setTaskForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskStartDate, setTaskStartDate] = useState('');
  const [taskEndDate, setTaskEndDate] = useState('');
  const [taskFile, setTaskFile] = useState(null); // State for file upload
  const [newTaskButtonColor, setNewTaskButtonColor] = useState('#007BFF');
  const [editingIndex, setEditingIndex] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]); // Selected user ID

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);


  const handleBack = () => navigate('/Projects');

  const toggleForm = async () => {
    const newColor = !taskForm ? 'red' : '#007BFF';
    setNewTaskButtonColor(newColor);
    setTaskForm((prev) => !prev);

    if (!taskForm) {
      try {
        const response = await userService.searchUsers();
        const filteredUsers = response.data.filter((user) => user.email !== userEmail);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  };


  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskPriority('Medium');
    setTaskStartDate('');
    setTaskEndDate('');
    setTaskFile(null);
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
      owner: userId,
      project: projectId,
    };

    let taskId;
    try {
      // Create or update the task
      if (editingIndex !== null) {
        taskId = taskList[editingIndex].id;
        await updateTask(taskId, newTask, taskFile);
  
        // Update assigned users
        if (selectedUserIds.length > 0) {
          await taskService.updateAssignedUsers(userId, taskId, selectedUserIds);
          console.log(`Task ${taskId} users updated to: ${selectedUserIds}`);
        }
      } else {
        const response = await createTask(newTask, taskFile);
        taskId = response.data.id;
  
        // Assign users to newly created task
        if (selectedUserIds.length > 0) {
          await taskService.assignTask(userId, taskId, selectedUserIds);
          console.log(`Task ${taskId} assigned to user IDs: ${selectedUserIds}`);
        }
      }
    } catch (error) {
      console.error('Error creating/updating task or assigning users:', error);
    }
  
    resetForm();
    setTaskForm(false);
    setNewTaskButtonColor('#007BFF');
  };
  

  const handleEditTask = async (taskId) => {
    const task = taskList.find((t) => t.id === taskId);
    if (task) {
      setTaskName(task.title);
      setTaskDescription(task.description);
      setTaskStartDate(task.start_date.split('T')[0]);
      setTaskEndDate(task.due_date.split('T')[0]);
      setTaskPriority(task.priority);
      setSelectedUserIds(task.assigned_users ? task.assigned_users.map(user => user.id) : []);
      setNewTaskButtonColor('red');

      try {
        const response = await userService.searchUsers();
        const filteredUsers = response.data.filter((user) => user.email !== userEmail);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }

      setEditingIndex(taskList.findIndex((t) => t.id === taskId));
      setTaskForm(true);
    } else {
      console.error('Task not found for ID:', taskId);
    }
  };

  const handleDeleteTask = (taskId) => deleteTask(taskId);

  const handleArchiveTask = async (taskId) => {
    const taskToUpdate = taskList.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const newArchivedState = !taskToUpdate.is_archived;
    const currentTimestamp = newArchivedState ? new Date().toISOString() : null;

    try {
      await taskService.archiveTask(taskId);

      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, is_archived: newArchivedState, archived_at: currentTimestamp }
            : task
        )
      );
    } catch (error) {
      console.error('Failed to archive/reassign task', error);
    }
    console.log('Archived At:', currentTimestamp);
  };

  const toggleTaskStatus = async (taskId) => {
    const taskToUpdate = taskList.find(task => task.id === taskId);
    if (taskToUpdate) {
      const newStatus = !taskToUpdate.status;
      await updateTask(taskToUpdate.id, { ...taskToUpdate, status: newStatus });
      
    }

    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: !task.status } : task
        
      )
    );
  };

  return (
    <div className="main-container">
      <div className="task-list-header">
        <button className="back-button" onClick={handleBack}>Back</button>
        <div className="projectTitleDescription">
          <h2>{projectName}</h2>
          <p>{projectDescription}</p>
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
            <div className="form-group">
              <label htmlFor="taskFile">Attach File</label>
              <input
                id="taskFile"
                type="file"
                onChange={(e) => setTaskFile(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label htmlFor="assignUsers">Assign to Users</label>
              <select
                id="assignUsers"
                multiple
                value={selectedUserIds}
                onChange={(e) => {
                  const options = e.target.options;
                  const selectedValues = [];
                  for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                      selectedValues.push(options[i].value);
                    }
                  }
                  setSelectedUserIds(selectedValues);
                  console.log("Selected User IDs:", selectedValues); // Debugging line
                }}
                className="user-dropdown"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email} - {user.username}
                  </option>
                ))}
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
            <div key={task.id}>
              <Task
                title={task.title}
                description={task.description}
                startDate={task.start_date}
                endDate={task.due_date}
                priority={task.priority}
                status={task.status}
                files={task.files}
                isArchived={task.is_archived}
                assignedUsers={(task.assigned_users || []).map((user) => user.username)} // Display multiple assigned users
                onEdit={() => handleEditTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
                onArchive={() => handleArchiveTask(task.id)}
                onToggleStatus={() => toggleTaskStatus(task.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;

