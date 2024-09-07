import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBox from '../components/Login/Components/loginBox.jsx';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result && result.status === 200) {
      console.log('Login successful:', result);
      navigate('/dashboard');
    } else {
      setErrorMessage(error);
    }
  };

  const handleRegister = async () => {
    navigate('/register');
  }

  const inputs = [
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
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
  ];

  const buttons = [
    { name: 'Login', onClick: handleLogin },
    { name: 'Register', onClick: handleRegister},
  ];

  return (
    <div className="loginPageBackground">
      <LoginBox title="Login" inputs={inputs} buttons={buttons} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LoginPage;
