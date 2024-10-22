import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Dashboard/Components/Hero';
import DashTaskList from '../components/Dashboard/Components/DashTaskList';
import MyProjects from '../components/Dashboard/Components/MyProjects';
import Overview from '../components/Dashboard/Components/Overview';
import useTasks from '../hooks/useTasks';
import useProjects from '../hooks/useProjects'; 
import './Styles/DashboardPage.css';

const DashboardPage = () => {
  const [userName, setUserName] = useState('');
  const [savedNotes, setSavedNotes] = useState('');
  const { fetchTasksByUser, todayTasks, taskCompletionRate, loading: tasksLoading, error: tasksError } = useTasks();
  const { fetchProjectsByUser, projects, loading: projectsLoading, error: projectsError } = useProjects();

  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const savedUserName = localStorage.getItem('username');
    const savedNotes = localStorage.getItem('note') || '';

    if (!userId || !savedUserName) {
      navigate('/');
    } else {
      setUserName(savedUserName);
      setSavedNotes(savedNotes || '');
    }
  }, [navigate]);

  const stableFetchTasks = useCallback(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchTasksByUser(userId);
    }
  }, [fetchTasksByUser]);

  const stableFetchProjects = useCallback(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchProjectsByUser(userId);
    }
  }, [fetchProjectsByUser]);

  useEffect(() => {
    stableFetchTasks();
    stableFetchProjects();
  }, [stableFetchTasks, stableFetchProjects]);

  const completedProjects = projects.filter(project => project.status === true); // Get completed projects

  return (
    <div className="dashboard-page">
      <Hero userName={userName} title={`You've got ${todayTasks.length} tasks today`} />
      <div className="dashboard-content">
        <div className="TaskListItem">
          <DashTaskList tasks={todayTasks} loading={tasksLoading} error={tasksError} />
        </div>
        <div className="OverviewItem">
          <Overview dailyCompletionRate={taskCompletionRate} savedNotes={savedNotes} projects={projects} completedProjects={completedProjects}  />
        </div>
        <div className="ProjectListItem">
          <MyProjects project={projects} loading={projectsLoading} error={projectsError} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

