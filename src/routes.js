import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
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
    path: '/Projects',
    element : <ProjectsPage />
  }
];

export default routes;