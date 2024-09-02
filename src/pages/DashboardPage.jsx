import React from 'react';
import Hero from '../components/Hero';
import TaskList from '../components/TaskList';
import MyProjects from '../components/MyProjects';
import Overview from '../components/Overview';
import './DashboardPage.css'; 

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <Hero />
      <div className="dashboard-content">
        <div className="TaskListItem">
          <TaskList />
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
