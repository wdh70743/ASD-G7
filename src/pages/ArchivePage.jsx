import React, { useState } from 'react';
import Hero from '../components/Dashboard/Components/Hero';
import SearchBar from '../components/Archive/Components/SearchBar';
import ArchiveList from '../components/Archive/Components/ArchiveList';
import './Styles/ArchivePage.css'; 

const ArchivePage = () => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = ({ searchTerm, sortOption }) => {
        const archivedTasks = [
            { id: 1, name: 'Archived Project 1', date: '2024-09-01', priority: 'High' },
            { id: 2, name: 'Archived Project 2', date: '2024-08-15', priority: 'Low' },
            { id: 3, name: 'Archived Project 3', date: '2024-07-30', priority: 'Medium' }
        ];

        let filteredResults = archivedTasks.filter(task =>
            task.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortOption === 'date') {
            filteredResults.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortOption === 'name') {
            filteredResults.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'priority') {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            filteredResults.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        }

        setSearchResults(filteredResults);
    };

    return (
        <div className="dashboard-page">
            <Hero />
            <div className="archive-layout">
                <SearchBar onSearch={handleSearch} />
                <ArchiveList archivedTasks={searchResults} />
            </div>
        </div>
    );
};

export default ArchivePage;
