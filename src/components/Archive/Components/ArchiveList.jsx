import React from 'react';
import '../Styles/ArchiveList.css';
import ArchiveButton from './ArchiveButton';

const ArchiveList = ({ archivedTasks }) => {
    return (
        <div className="archive-list">
            {archivedTasks.length > 0 ? (
                archivedTasks.map(task => (
                    <div key={task.id} className="archive-item">
                        <div className="archive-info">
                            <h3>{task.name}</h3>
                            <p>Archived on: {task.date}</p>
                        </div>
                        <div className="archive-buttons">
                            <ArchiveButton name="Reassign" />
                            <ArchiveButton name="Delete" />
                        </div>
                    </div>
                ))
            ) : (
                <p>No archived tasks found</p>
            )}
        </div>
    );
};

export default ArchiveList;
