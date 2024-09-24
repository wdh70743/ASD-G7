import React from 'react';
import '../Styles/DashTask.css'; 
import '../Styles/DashTaskList.css'; 

const DashTask = ({ color, title, subtitle }) => {
  return (
    <div className="rectangle-box" style={{ backgroundColor: color }}>
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
    </div>
  );
}

export default DashTask;
