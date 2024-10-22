import React, { useState, useEffect } from 'react';
import OverviewChartSummary from './OverviewChartSummary'; 
import CompletedProjectsList from './CompletedProjectsList';
import '../Styles/Overview.css';

const Overview = ({ dailyCompletionRate, savedNotes, projects, completedProjects }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(savedNotes);

  // Update notes when savedNotes prop changes
  useEffect(() => {
    setNotes(savedNotes);
  }, [savedNotes]);

  const handleEditClick = () => {
    if (isEditing) {
      // Save notes to local storage when saving
      localStorage.setItem('note', notes);
    }
    setIsEditing(!isEditing); // Toggle edit state
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value); // Update notes as user types
  };

  return (
    <section className="OverviewContainer">
      <h1 className="OverviewTitle">Overview</h1>
      <div className="OverviewContentContainer">
        <div className="OverviewItem item1">
          <p className="Dailywork-progress-text">DAILY WORK PROGRESS</p>
          <OverviewChartSummary percentage={dailyCompletionRate} />
        </div>
        <div className="OverviewItem item2">
          <div className="headingTitle">
            <div className="Notes-title">NOTES</div>
            <button className="edit-button" onClick={handleEditClick}>
                  {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          <div className="notes-content">
            {isEditing ? (
              <textarea 
                className="notes-textarea" 
                value={notes} 
                onChange={handleNotesChange} 
                rows={4} 
              />
            ) : (
              <p className="notes-display">{notes || 'No notes available.'}</p>
            )}
          </div>
        </div>
        <div className="OverviewItem item3">
          <p className="CompletedProjectsTitle">COMPLETED PROJECTS</p>
          <CompletedProjectsList completedProjects ={completedProjects}/>
        </div>
      </div>
    </section>
  );
}

export default Overview;


