import React, { useEffect, useState } from 'react';
import Hero from '../components/Dashboard/Components/Hero';
import DashTaskList from '../components/Dashboard/Components/DashTaskList';
import MyProjects from '../components/Dashboard/Components/MyProjects';
import Overview from '../components/Dashboard/Components/Overview';
import './Styles/DashboardPage.css';

const DashboardPage = () => {
    const [userName, setUserName] = useState('Alex'); // API NOT CALLING????

    // Fetch user data here if needed
    useEffect(() => {
        // Fetch user data from a global state or API
        // Example: setUserName(fetchedUserName);
    }, []);

    return (
        <div className="dashboard-page">
            <Hero userName={userName} />
            <div className="dashboard-content">
                <div className="TaskListItem">
                    <DashTaskList />
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
