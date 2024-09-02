import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa'; // Importing icons
import './NavBar.css'; // Import the CSS file

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Link className="nav-brand" to="/">Taskbee</Link>
      <div className="nav-links">
        <NavLink
          exact
          to="/dashboard"
          className="nav-link"
          activeClassName="active"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/projects"
          className="nav-link"
          activeClassName="active"
        >
          Projects
        </NavLink>
        <NavLink
          to="/calendar"
          className="nav-link"
          activeClassName="active"
        >
          Calendar
        </NavLink>
      </div>
      <div className="nav-icons">
        <FaBell className="nav-icon bell-icon" />
        <FaUserCircle className="nav-icon profile-icon" />
      </div>
    </nav>
  );
};

export default NavBar;




