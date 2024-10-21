import React from 'react';
import DashTask from './DashTask';
import '../Styles/DashTaskList.css'; 

const DashTaskList = ({ tasks, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Array of hex colors
  const colors = ['#e8544c', '#b787f1', '#e0ec5c', '#d8d4d4'];

  // Function to pick a random color
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const randomColor = getRandomColor();
    
  return (
    <section className="TaskListContainer">
        <h1 className="TaskListTitle">Due Today</h1>
        <div className="DueTodayContainer">
          {tasks.map((task) => (
            <DashTask 
              key={task.id}
              title={task.title} 
              color= '#e8544c'
              subtitle={task.description} 
              project = {task.project}
              priority = {task.priority}
              status = {task.status}
            />
          ))}
        </div>
    </section>
  );
}

export default DashTaskList;

