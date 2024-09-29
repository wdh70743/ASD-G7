import React from 'react';
import DashTask from './DashTask';
import '../Styles/DashTaskList.css'; 

const DashTaskList = () => {
  return (
    <section className="TaskListContainer">
        <h1 className="TaskListTitle">Due Today</h1>
        <div className="DueTodayContainer"> 
          <DashTask 
            color="#e8544c" 
            title="Areo Branding Project" 
            subtitle="Logo, Brand Identity, Brand Strategy" 
          /> 
          <DashTask 
            color="#b787f1" 
            title="Website Redesign" 
            subtitle="User Interface, User Experience" 
          />
          <DashTask 
            color="#e0ec5c" 
            title="Content Strategy Meeting" 
            subtitle="Planning, Research, Analysis" 
          />
          <DashTask 
            color="#d8d4d4" 
            title="Product Launch Prep" 
            subtitle="Marketing, Logistics, Coordination" 
          />
          <DashTask 
            color="#e8544c" 
            title="Client Presentation" 
            subtitle="Sales Pitch, Design Review" 
          />
        </div>
    </section>
  );
}

export default DashTaskList;

