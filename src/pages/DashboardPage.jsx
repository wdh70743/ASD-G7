import React from 'react';
import Hero from '../components/Dashboard/Components/Hero';
import TaskList from '../components/Dashboard/Components/TaskList';
import MyProjects from '../components/Dashboard/Components/MyProjects';
import Overview from '../components/Dashboard/Components/Overview';
import './Styles/DashboardPage.css'; 

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
