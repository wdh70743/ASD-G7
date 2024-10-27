import React, { useEffect, useState } from 'react';
import './Styles/DashboardPage.css';
import Hero from '../components/Dashboard/Components/SimpleHero';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useTasks from '../hooks/useTasks';
import projectService from '../services/ProjectService'; // Import the project service
import taskService from '../services/TaskService'; // Import task service

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { fetchTasksByUser, tasks, loading, error } = useTasks();
  const [events, setEvents] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      // Fetch owned tasks by the user
      fetchTasksByUser(userId);

      // Fetch projects by user to get assigned tasks
      projectService.getProjectsByUser(userId).then((response) => {
        const projectIds = response.data.map(project => project.id);

        // Fetch assigned tasks for each project
        projectIds.forEach(projectId => {
          taskService.getAssignedTasksByProject(projectId, userId).then((res) => {
            // Access the 'assigned_tasks' array within res.data
            const assignedTasksArray = res.data.assigned_tasks;

            // Check if it's an array before updating state
            if (Array.isArray(assignedTasksArray)) {
              setAssignedTasks(prevAssignedTasks => [...prevAssignedTasks, ...assignedTasksArray]);
            } else {
              console.warn('Expected array but received:', assignedTasksArray);
            }
          }).catch(err => {
            console.error('Error fetching assigned tasks:', err);
          });
        });
      }).catch(err => {
        console.error('Error fetching projects:', err);
      });
    }
  }, [fetchTasksByUser, userId]);

  useEffect(() => {
    // Combine owned tasks and assigned tasks
    const combinedTasks = [...tasks, ...assignedTasks];
  
    // Remove duplicates based on task ID
    const uniqueTasks = combinedTasks.filter(
      (task, index, self) => index === self.findIndex(t => t.id === task.id)
    );
  
    // Filter out archived tasks
    const filteredTasks = uniqueTasks.filter(task => !task.is_archived);
  
    // Map to calendar events
    const formattedEvents = filteredTasks.map(task => ({
      title: task.title,
      start: new Date(task.start_date),
      end: new Date(task.due_date),
    }));
  
    setEvents(formattedEvents);
  }, [tasks, assignedTasks]);
  

  return (
    <div className="dashboard-page">
      <Hero />
      <div style={{ padding: 20 }}>
        <div style={{ height: 700 }}>
          {loading ? (
            <p>Loading tasks...</p>
          ) : error ? (
            <p className="error-message">Error: {error}</p>
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
