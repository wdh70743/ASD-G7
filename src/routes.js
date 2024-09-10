import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import CalendarPage from './pages/CalendarPage';
import ArchivePage from './pages/ArchivePage';
import ProjectsPage from './pages/ProjectsPage';

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
  }
];

export default routes;