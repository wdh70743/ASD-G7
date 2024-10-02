import React, { useState, useEffect } from 'react';
import Hero from '../components/Dashboard/Components/SimpleHero';
import SearchBar from '../components/Archive/Components/SearchBar';
import ArchiveList from '../components/Archive/Components/ArchiveList'; // Use existing ArchiveList
import useTasks from '../hooks/useTasks';
import './Styles/ArchivePage.css';

const ArchivePage = () => {
  const { fetchArchivedTasksByUser, archivedTasks, loading, error } = useTasks();
  const [searchResults, setSearchResults] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchArchivedTasksByUser(userId);
    }
  }, [userId, fetchArchivedTasksByUser]);

  useEffect(() => {
    setSearchResults(archivedTasks);
  }, [archivedTasks]);

  const handleSearch = ({ searchTerm, sortOption }) => {
    let filteredResults = archivedTasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === 'date') {
      filteredResults.sort((a, b) => new Date(b.archived_at) - new Date(a.archived_at));
    } else if (sortOption === 'name') {
      filteredResults.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      filteredResults.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    setSearchResults(filteredResults);
  };

  return (
    <div className="dashboard-page">
      <Hero title="Archived Projects" />
      <div className="archive-layout">
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <p>Loading archived tasks...</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : (
          <ArchiveList archivedTasks={searchResults} /> // Use existing ArchiveList component
        )}
      </div>
    </div>
  );
};

export default ArchivePage;
