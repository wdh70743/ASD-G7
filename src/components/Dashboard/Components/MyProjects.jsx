import React, { useState } from 'react';
import Project from '../../ProjectList/Project';
import '../Styles/MyProjects.css'; 

const MyProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: 432,
      projectName: "Project 1",
      description: "This is a description for Project 1.",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      priority: "High",
      status: 'Not Started', 
    },
    {
      id: 21212,
      projectName: "Project 2",
      description: "This is a description for Project 1.",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      priority: "High",
      status: 'Not Started', 
    },

    {
      id: 6746,
      projectName: "Project 3",
      description: "This is a description for Project 1.",
      startDate: "2024-09-01",
      endDate: "2024-09-10",
      priority: "High",
      status: 'Not Started', 
    },

  ]);

    // Array of hex colors
  const colors = ['#e8544c', '#b787f1', '#e0ec5c', '#d8d4d4'];

  // Function to pick a random color
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Example usage
  const randomColor = getRandomColor();
  console.log(randomColor); // Logs a random color from the array


  return (
    <section className="ProjectListContainer">
        <h1 className="MyProjectTitle">My Projects</h1>
        <div className="DueTodayContainer"> 
          {projects.map((project, index) => (
            <Project 
            key = {index}
            id = {project.id}
            color= {getRandomColor()}
            title= {project.projectName}
            description={project.description} 
          />
          ))}
        </div>
    </section>
  );
}

export default MyProjects;
