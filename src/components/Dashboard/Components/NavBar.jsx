import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import ProfileDropdown from './ProfileDropdown';
import NotificationBell from './NotificationBell';
import '../Styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Link className="nav-brand" to="/dashboard">Taskbee</Link>
      <NavLinks />
      <div className="nav-icons">
        <NotificationBell />
        <ProfileDropdown />
      </div>
    </nav>
  );
};

export default NavBar;
