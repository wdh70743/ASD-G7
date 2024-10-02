import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBox from '../components/Login/Components/loginBox.jsx';
import useAuth from '../hooks/useAuth';
import Modal from '../components/Login/Components/Modal.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, setError } = useAuth(); // Destructure `setError` if available
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [isServerErrorModalOpen, setIsServerErrorModalOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const handleLogin = async () => {
    setValidationMessage('');
    setIsValidationModalOpen(false);
    setIsServerErrorModalOpen(false);

    if (!email || !password) {
      setValidationMessage('Both email and password are required');
      setIsValidationModalOpen(true);
      return;
    }

    const result = await login(email, password);

    if (result && result.status === 200) {
      navigate('/dashboard');
    } else {
      setIsServerErrorModalOpen(true);
    }
  };

  const closeServerErrorModal = () => {
    setIsServerErrorModalOpen(false);
    if (setError) {
      setError('');
    }
  };

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
    { name: 'Register', onClick: () => navigate('/register') },
  ];

  return (
    <div className="loginPageBackground">
      <LoginBox title="Login" inputs={inputs} buttons={buttons} />

      <Modal
        title="Validation Error"
        message={validationMessage}
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
      />

      <Modal
        title="Login Failed"
        message="Incorrect email or password. Please try again."
        isOpen={isServerErrorModalOpen}
        onClose={closeServerErrorModal}
      />

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LoginPage;
