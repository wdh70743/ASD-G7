import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBox from '../components/Login/Components/loginBox.jsx';
import useAuth from '../hooks/useAuth'; // Import the custom hook

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();  // Destructure the custom hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
    }

    const user = {
      email,
      password,
      username
    };

    const result = await register(user);

    if (!error) {
        console.log('Registration successful:', result);
        navigate('/');
    } else {
        setErrorMessage(error);
    }
};


  const handleBackToLogin = () => {
    navigate('/');
  };

  const inputs = [
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your Email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
    {
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
    },
    {
      label: 'Username',
      type: 'text',
      placeholder: 'Enter your username',
      value: username,
      onChange: (e) => setUsername(e.target.value),
    },
  ];

  const buttons = [
    { name: 'Register', onClick: handleRegister },
    { name: 'Back to Login', onClick: handleBackToLogin },
  ];

  return (
    <div className="loginPageBackground">
      <LoginBox title="Register" inputs={inputs} buttons={buttons} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default RegisterPage;
