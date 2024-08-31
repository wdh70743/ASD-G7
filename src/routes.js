import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const routes = [
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/Dashboard',
    element: <DashboardPage />
  },
];

export default routes;