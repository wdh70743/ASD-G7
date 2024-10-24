import React from 'react';
import '../Styles/CompletedProject.css';

// Function to format the date
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'short', year: '2-digit' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options); // 'en-GB' for dd mmm yy format
};

const CompletedProject = ({ project }) => {
  if (!project) {
    return <div>No project details available.</div>; // Message if no project details are provided
  }

  return (
    <div className="completed-project">
      <p className="project-name">{project.projectname}</p>
      <p className="project-dueDate">Due Date: {formatDate(project.end_date)}</p>
    </div>
  );
};

export default CompletedProject;

