import React from 'react';
import './Task.css'; 
import './TaskList.css'; 

const Task = ({ color, title, subtitle }) => {
  return (
    <div className="rectangle-box" style={{ backgroundColor: color }}>
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
    </div>
  );
}

export default Task;
