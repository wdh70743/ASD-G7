import React from 'react';
import Task from './Task';
import '../Styles/TaskList.css'; 

const TaskList = () => {
  return (
    <section className="TaskListContainer">
        <h1 className="TaskListTitle">Due Today</h1>
        <div className="DueTodayContainer"> 
          <Task 
            color="#e8544c" 
            title="Areo Branding Project" 
            subtitle="Logo, Brand Identity, Brand Strategy" 
          />
          <Task 
            color="#b787f1" 
            title="Website Redesign" 
            subtitle="User Interface, User Experience" 
          />
          <Task 
            color="#e0ec5c" 
            title="Content Strategy Meeting" 
            subtitle="Planning, Research, Analysis" 
          />
          <Task 
            color="#d8d4d4" 
            title="Product Launch Prep" 
            subtitle="Marketing, Logistics, Coordination" 
          />
          <Task 
            color="#e8544c" 
            title="Client Presentation" 
            subtitle="Sales Pitch, Design Review" 
          />
        </div>
    </section>
  );
}

export default TaskList;

