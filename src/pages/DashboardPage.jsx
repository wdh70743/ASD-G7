import React, { useEffect, useState, useCallback } from 'react';
import Hero from '../components/Dashboard/Components/Hero';
import DashTaskList from '../components/Dashboard/Components/DashTaskList';
import MyProjects from '../components/Dashboard/Components/MyProjects';
import Overview from '../components/Dashboard/Components/Overview';
import useTasks from '../hooks/useTasks'; // Import your useTasks hook
import './Styles/DashboardPage.css';

const DashboardPage = () => {
    const [userName, setUserName] = useState('');
    const { fetchTasksByUser, todayTasks, loading, error } = useTasks();

    // Function to fetch tasks when userId is available
    const stableFetchTasks = useCallback(() => {
        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
        if (userId) {
            fetchTasksByUser(userId);
        }
    }, [fetchTasksByUser]);

    // Effect to fetch user data from local storage
    useEffect(() => {
        const savedUserName = localStorage.getItem('username');
        if (savedUserName) {
            setUserName(savedUserName);
        }
    }, []);

    // Effect to fetch tasks when the component mounts
    useEffect(() => {
        stableFetchTasks();
    }, [stableFetchTasks]);

    return (
        <div className="dashboard-page">
            {/* Pass the count of tasks due today to the Hero component */}
            <Hero userName={userName} title={`You've got ${todayTasks.length} tasks today`} />
            <div className="dashboard-content">
                <div className="TaskListItem">
                    <DashTaskList tasks={todayTasks} loading={loading} error={error} />
                </div>
                <div className="OverviewItem">
                    <Overview />
                </div>
                <div className="ProjectListItem">
                    <MyProjects />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;



