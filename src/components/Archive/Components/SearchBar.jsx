import React, { useState } from 'react';
import '../Styles/SearchBar.css'

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleSearch = () => {
        onSearch({ searchTerm, sortOption });
    };

    return (
        <div className="search-bar">
            <select value={sortOption} onChange={handleSortChange} className="sort-dropdown">
                <option value="">Sort by</option>
                <option value="date">Date Archived</option>
                <option value="name">Project Name</option>
                <option value="priority">Priority</option>
            </select>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search archived tasks"
                className="search-input"
            />
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;