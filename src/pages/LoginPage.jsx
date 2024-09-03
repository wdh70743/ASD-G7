import React from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
  
    const handleLogin = () => {
      navigate('/Dashboard'); // Navigate to the dashboard page
    };
  
    return (
      <div>
        <h1>Login Page</h1>
        <button onClick={handleLogin}>Go to Dashboard</button>
      </div>
    );
  };
  
  export default LoginPage;