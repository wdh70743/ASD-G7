import React from 'react';
import '../Styles/ArchiveButton.css'

const ArchiveButton = ({ name }) => {
    const handleClick = () => {
        console.log(`${name} button clicked`);
    };

    return (
        <button className="archive-button" onClick={handleClick}>
            {name}
        </button>
    );
};

export default ArchiveButton;
