import React, { useEffect, useCallback, useState } from 'react';
import SimpleHero from '../components/Dashboard/Components/SimpleHero.jsx';
import useUserData from '../hooks/useUserData.js';
import { useNavigate } from 'react-router-dom';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { updateUser, deleteUser, fetchUserData, userData, loading, error } = useUserData();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false); // New state for toggling edit view

  const stableFetchUserData = useCallback(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [fetchUserData, userId]);

  useEffect(() => {
    stableFetchUserData();
  }, [stableFetchUserData]);

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
      await updateUser(userId, user); // assuming updateUser returns a promise
      stableFetchUserData(); // refetch user data after successful update
      setIsEditing(false); // Hide the form after updating
    } catch (err) {
      console.error('Error updating user:', err);
      // Optionally handle the error state
    }
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
        <h2>User Profile</h2>
        {userData ? (
          <div>
            <p><strong>User ID:</strong> {userData.id}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>

            {/* Button to toggle edit view */}
            <button onClick={() => setIsEditing((prev) => !prev)}>
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>

            {isEditing && ( // Conditionally render the edit form
              <form onSubmit={handleUpdateUser}>
                <div>
                  <label>
                    Username:
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Password:
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <button type="submit">Update Profile</button>
              </form>
            )}

            <button onClick={handleDeleteUser}>Delete your account</button>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </>
  );
};

export default ProjectsPage;
