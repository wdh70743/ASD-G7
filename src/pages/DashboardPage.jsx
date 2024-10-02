import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Dashboard/Components/Hero';
import DashTaskList from '../components/Dashboard/Components/DashTaskList';
import MyProjects from '../components/Dashboard/Components/MyProjects';
import Overview from '../components/Dashboard/Components/Overview';
import useTasks from '../hooks/useTasks'; 
import './Styles/DashboardPage.css';

const DashboardPage = () => {
  const [userName, setUserName] = useState('');
  const { fetchTasksByUser, todayTasks, loading, error } = useTasks();
  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const savedUserName = localStorage.getItem('username');

    if (!userId || !savedUserName) {
      navigate('/');
    } else {
      setUserName(savedUserName);
    }
  }, [navigate]);

  const stableFetchTasks = useCallback(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchTasksByUser(userId);
    }
  }, [fetchTasksByUser]);

  useEffect(() => {
    stableFetchTasks();
  }, [stableFetchTasks]);

  return (
    <div className="dashboard-page">
      <Hero userName={userName} title={`You've got ${todayTasks.length} tasks today`} />
      <div className="dashboard-content">
        <div className="TaskListItem">
          <DashTaskList tasks={todayTasks} loading={loading} error={error} />
        </div>
        <div className="OverviewItem">
          <Overview />
        </div>
        <div className="ProjectListItem">
          <MyProjects />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
