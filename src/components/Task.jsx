import React from 'react';
import './Task.css'; 
import './TaskList.css'; 
// import personImage from 'src/assets/person.jpg'; 


const Task = ({ color }) => {
  return (
    <div className="rectangle-box" style={{ backgroundColor: color }}>
        <h1 className="title">Areo branding project</h1>
        <p className="subtitle">Logo, Brand Identity, Brand Strategy</p>
        <div className="image-container">
        {/* <img src={personImage} alt="Person" className="person-image" /> */}
        </div>
    </div>
  )
}

export default Task;