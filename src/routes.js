import React from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import CalendarPage from './pages/CalendarPage';
import ArchivePage from './pages/ArchivePage';
import ProjectsPage from './pages/ProjectsPage';
import TasksPage from './pages/TasksPage';
import ProfilePage from './pages/ProfilePage';


const routes = [
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/Dashboard',
    element: <DashboardPage />
  },
  {
    path: '/Register',
    element: <RegisterPage />
  },
  {
    path: '/Calendar',
    element: <CalendarPage />
  },
  {
    path: '/Archive',
    element: <ArchivePage />
  },
  {
    path: '/Projects',
    element : <ProjectsPage />
  },
  {
    path: '/Profile',
    element : <ProfilePage />
  },
  {
    path: '/Projects/:id',
    element : <TasksPage />
  },
  
];

export default routes;