import React, { useEffect, useState } from 'react';
import ArchiveList from '../components/Archive/Components/ArchiveList';
import useProjects from '../hooks/useProjects';
import useTasks from '../hooks/useTasks';
import Hero from '../components/Dashboard/Components/SimpleHero';
import SearchBar from '../components/Archive/Components/SearchBar';
import './Styles/ArchivePage.css';

const ArchivePage = () => {
  const { fetchProjectsByUser, projects, loading: projectsLoading, error: projectsError } = useProjects();
  const { fetchArchivedTasksByUserOrOwner, archivedTasks, deleteTask, loading: tasksLoading, error: tasksError } = useTasks();

  const [searchResults, setSearchResults] = useState([]);
  const [archivedTaskState, setArchivedTaskState] = useState([]); // Local state for archived tasks

  const userId = localStorage.getItem('userId');

  // Fetch projects and tasks when the component is loaded
  useEffect(() => {
    if (userId) {
      fetchProjectsByUser(userId);
      fetchArchivedTasksByUserOrOwner(userId); // Fetch archived tasks by user or owner
    }
  }, [userId, fetchProjectsByUser, fetchArchivedTasksByUserOrOwner]);

  // Set local states based on fetched tasks
  useEffect(() => {
    setSearchResults([...archivedTasks]);
    setArchivedTaskState([...archivedTasks]); // Ensure new reference
  }, [archivedTasks]);

  // Handle the search and sort operation from SearchBar
  const handleSearch = ({ searchTerm, sortOption }) => {
    let filteredResults = archivedTaskState.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === 'date') {
      filteredResults.sort((a, b) => new Date(b.archived_at) - new Date(a.archived_at));
    } else if (sortOption === 'name') {
      filteredResults.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      filteredResults.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    setSearchResults([...filteredResults]); // Ensure new reference
  };

  return (
    <div className="archive-page">
      <Hero title="Archived Projects" />
      <div className="archive-layout">
        <SearchBar onSearch={handleSearch} />
        {projectsError && <p className="error-message">Error: {projectsError}</p>}
        {tasksError && <p className="error-message">Error: {tasksError}</p>}
        {(projectsLoading || tasksLoading) ? (
          <p>Loading projects and tasks...</p>
        ) : (
          <ArchiveList
            archivedTasks={searchResults}
            projects={projects}
            deleteTask={deleteTask}
            setArchivedTasks={setArchivedTaskState}
            setSearchResults={setSearchResults}
          />
        )}
      </div>
    </div>
  );
};

export default ArchivePage;
