import React from 'react';
import '../Styles/ArchiveButton.css';

const ArchiveButton = ({ name, onClick }) => {
  return (
    <button className="archive-button" onClick={onClick}>
      {name}
    </button>
  );
};

export default ArchiveButton;
