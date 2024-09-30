import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/NavBar.css';

const NavLinks = () => {
  return (
    <div className="nav-links">
      <NavLink exact to="/dashboard" className="nav-link" activeClassName="active">
        Dashboard
      </NavLink>
      <NavLink to="/projects" className="nav-link" activeClassName="active">
        Projects
      </NavLink>
      <NavLink to="/calendar" className="nav-link" activeClassName="active">
        Calendar
      </NavLink>
      <NavLink to="/archive" className="nav-link" activeClassName="active">
        Archive
      </NavLink>
    </div>
  );
};

export default NavLinks;
