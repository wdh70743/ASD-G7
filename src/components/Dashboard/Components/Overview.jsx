// Overview.js
import React from 'react';
import OverviewChartSummary from './OverviewChartSummary'; // Import the chart component
import '../Styles/Overview.css';

const Overview = () => {
  // Example percentage; you can calculate this based on your data
  const completedTasksPercentage = 75; // This value should be dynamically calculated

  return (
    <section className="OverviewContainer">
      <h1 className="OverviewTitle">Overview</h1>
      <div className="OverviewContentContainer">
        <div className="OverviewItem item1">
          <p className="Dailywork-progress-text">DAILY WORK PROGRESS</p>
          <OverviewChartSummary percentage={completedTasksPercentage} />
        </div>
        <div className="OverviewItem item2">
          <p className="Notes-title">NOTES</p>
          <div className="notes-content">
          </div>
        </div>
        <div className="OverviewItem item3">
          <p className="CompletedProjectsTitle">COMPLETED PROJECTS</p>
        </div>
      </div>
    </section>
  );
}

export default Overview;

