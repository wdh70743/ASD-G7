// src/components/NavBar.jsx
import React, { useState } from 'react';
import './NavBar.css'; // Import the CSS file

const NavBar = () => {
  const [active, setActive] = useState('Dashboard');

  return (
    <nav className="nav-bar">
      <div className="nav-brand">Taskbee</div>
      <div className="nav-links">
        <div
          className={`nav-link ${active === 'Dashboard' ? 'active' : ''}`}
          onClick={() => setActive('Dashboard')}
        >
          Dashboard
        </div>
        <div
          className={`nav-link ${active === 'Projects' ? 'active' : ''}`}
          onClick={() => setActive('Projects')}
        >
          Projects
        </div>
        <div
          className={`nav-link ${active === 'Calendar' ? 'active' : ''}`}
          onClick={() => setActive('Calendar')}
        >
          Calendar
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

