import React, { useEffect, useCallback, useState } from 'react';
import SimpleHero from '../components/Dashboard/Components/SimpleHero.jsx';
import useUserData from '../hooks/useUserData.js';
import { useNavigate } from 'react-router-dom';
import './Styles/ProfilePage.css';
import notificationService from '../services/NotificationService';

const ProfilePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { updateUser, deleteUser, fetchUserData, userData, loading, error } = useUserData();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // State for notification preferences
  const [notificationPreferences, setNotificationPreferences] = useState({
    receive_task_updates: false,
    receive_project_updates: false,
    receive_reminders: false,
  });

  const stableFetchUserData = useCallback(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [fetchUserData, userId]);

  // Fetch notification preferences
  const fetchNotificationPreferences = useCallback(async () => {
    if (userId) {
      try {
        const response = await notificationService.getNotificationPreferences(userId);
        const {
          receive_task_updates,
          receive_project_updates,
          receive_reminders,
        } = response.data;
        
        setNotificationPreferences({
          receive_task_updates: receive_task_updates ?? false,
          receive_project_updates: receive_project_updates ?? false,
          receive_reminders: receive_reminders ?? false,
        });
      } catch (error) {
        console.error('Failed to fetch notification preferences:', error);
      }
    }
  }, [userId]);

  useEffect(() => {
    stableFetchUserData();
    fetchNotificationPreferences(); // Fetch notification preferences
  }, [stableFetchUserData, fetchNotificationPreferences]); // Added fetchNotificationPreferences

  const handleDeleteUser = () => {
    deleteUser(userId);
    navigate('/');
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };
    
    try {
      await updateUser(userId, user); 
      stableFetchUserData();
      setIsEditing(false); 
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleUpdatePreferences = async () => {
    if (userId) {
      try {
        await notificationService.updateNotificationPreferences(userId, notificationPreferences);
        console.log('Notification preferences updated successfully');
      } catch (error) {
        console.error('Failed to update notification preferences:', error);
      }
    }
  };

  const handlePreferenceChange = (preference) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
  };

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setEmail(userData.email);
    }
  }, [userData]);

  if (loading) return <p>Loading Your Profile...</p>;
  if (error) return <p>Error fetching user data: {error.message}</p>;

  return (
    <>
      <SimpleHero />
      <div className="user-profile">
        <h2 className="user-profile__title">User Profile</h2>
        {userData ? (
          <div>
            <p className="user-profile__info"><strong className="user-profile__strong">User ID:</strong> {userData.id}</p>
            <p className="user-profile__info"><strong className="user-profile__strong">Username:</strong> {userData.username}</p>
            <p className="user-profile__info"><strong className="user-profile__strong">Email:</strong> {userData.email}</p>

            <button className="user-profile__button" onClick={() => setIsEditing((prev) => !prev)}>
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>

            {isEditing && ( 
              <form className="user-profile__form" onSubmit={handleUpdateUser}>
                <div className="user-profile__form-group">
                  <label className="user-profile__form-label">
                    Username:
                    <input
                      className="user-profile__form-input"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="user-profile__form-group">
                  <label className="user-profile__form-label">
                    Email:
                    <input
                      className="user-profile__form-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="user-profile__form-group">
                  <label className="user-profile__form-label">
                    Password:
                    <input
                      className="user-profile__form-input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <button className="user-profile__button" type="submit">Update Profile</button>
              </form>
            )}

            {/* Notification Preferences */}
            <div className="user-profile__preferences">
              <h3>Notification Preferences</h3>
              <div className="user-profile__form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.receive_project_updates}
                    onChange={() => handlePreferenceChange('receive_project_updates')}
                  />
                  Receive Project Updates
                </label>
              </div>
              <div className="user-profile__form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.receive_task_updates}
                    onChange={() => handlePreferenceChange('receive_task_updates')}
                  />
                  Receive Task Updates
                </label>
              </div>
              <div className="user-profile__form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={notificationPreferences.receive_reminders}
                    onChange={() => handlePreferenceChange('receive_reminders')}
                  />
                  Receive Reminders
                </label>
              </div>
              <button className="user-profile__button" onClick={handleUpdatePreferences}>
                Update Preferences
              </button>
            </div>

            <button className="user-profile__button" onClick={handleDeleteUser}>Delete your account</button>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
