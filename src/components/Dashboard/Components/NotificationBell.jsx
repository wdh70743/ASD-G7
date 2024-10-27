import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import notificationService from '../../../services/NotificationService';
import '../Styles/NavBar.css';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleBellClick = async () => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage

    if (userId) {
      try {
        // Fetch notifications for the user
        const response = await notificationService.getNotifications(userId);

        // Filter notifications to exclude those that are marked as read
        const unreadNotifications = response.data.filter(
          (notification) => !notification.is_read
        );

        // Store unread notifications in state
        setNotifications(unreadNotifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    }

    // Toggle the visibility of the dropdown
    setIsDropdownVisible((prevState) => !prevState);
  };

  const handleNotificationClick = async (notificationId) => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      try {
        // Mark the notification as read
        await notificationService.markNotificationAsRead(notificationId, userId);

        // Remove the notification from the list
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== notificationId)
        );
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
  };

  return (
    <div className="notification-bell">
      <FaBell className="nav-icon bell-icon" onClick={handleBellClick} />
      {isDropdownVisible && (
        <div className="dropdown-menu notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="dropdown-item notification-item">
                <span>{notification.message}</span>
                <button
                  className="read-button"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  Read
                </button>
              </div>
            ))
          ) : (
            <div className="dropdown-item">No notifications</div>
          )}
        </div>
      )}
    </div>

  );
};

export default NotificationBell;
