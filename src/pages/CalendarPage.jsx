import React, { useEffect, useState } from 'react';
import './Styles/DashboardPage.css';
import Hero from '../components/Dashboard/Components/SimpleHero';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useTasks from '../hooks/useTasks';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { fetchTasksByUser, tasks, loading, error } = useTasks();
  const [events, setEvents] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchTasksByUser(userId);
    }
  }, [fetchTasksByUser, userId]);

  useEffect(() => {
    // Filter out tasks where `is_archived` is true
    const filteredTasks = tasks.filter((task) => !task.is_archived);

    // Map the filtered tasks to calendar events
    const formattedEvents = filteredTasks.map((task) => ({
      title: task.title,
      start: new Date(task.start_date),
      end: new Date(task.due_date),
    }));

    setEvents(formattedEvents);
  }, [tasks]);

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
