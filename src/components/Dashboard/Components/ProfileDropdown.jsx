import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import '../Styles/NavBar.css';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const containerRef = useRef(null);

  const handleProfileClick = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownVisible(false);
  };

  const handleUserMenu = () => {
    navigate('/profile');

  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-dropdown-container" ref={containerRef}>
      <FaUserCircle
        className="nav-icon profile-icon"
        onClick={handleProfileClick}
      />
      {dropdownVisible && (
        <div className="custom-dropdown-menu">
          <button className="dropdown-item" onClick={handleUserMenu}>
            Profile
          </button>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
