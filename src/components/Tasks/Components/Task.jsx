// Task.js
import React, { useState } from 'react';
import '../Styles/Task.css'


const Task = ({ title }) => {
    const [taskComplete, setTaskComplete] = useState(false);
    
    const checkHandler = () => {
      setTaskComplete(!taskComplete)
    }
  return (
    <div className="task-box">
      <input checked={taskComplete} onChange={checkHandler} type="checkbox" name="" id=""/>
      {title}
      <div className="alter-task">      
        <div>Edit</div>
        <div>Delete</div>
      </div>

    </div>
  );
};

export default Task;
