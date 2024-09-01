import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import TaskList from '../components/TaskList';


const DashboardPage = () => {
  return (
    <>
        <NavBar />
        <Hero />
        <TaskList />
    </>

    

  );
};

export default DashboardPage;