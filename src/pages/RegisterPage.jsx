import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBox from '../components/Login/Components/loginBox.jsx';
import useAuth from '../hooks/useAuth';
import Modal from '../components/Login/Components/Modal.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [isServerErrorModalOpen, setIsServerErrorModalOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  useEffect(() => {
    if (error) {
      setServerErrorMessage(error);
      setIsServerErrorModalOpen(true);
    }
  }, [error]);

  const handleRegister = async () => {
    setValidationMessage('');
    setIsValidationModalOpen(false);
    setIsServerErrorModalOpen(false);
    setServerErrorMessage('');

    if (!email || !password || !confirmPassword || !username) {
      setValidationMessage('All fields are required');
      setIsValidationModalOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setValidationMessage('Passwords do not match');
      setIsValidationModalOpen(true);
      return;
    }

    const user = {
      email,
      password,
      username,
    };

    const result = await register(user);

    if (result && result.status === 201) {
      navigate('/');
    } else {
      if (result && result.status === 400 && result.data.message) {
        setServerErrorMessage(result.data.message);
      } else {
        setServerErrorMessage('Registration failed. Please try again.');
      }
      setIsServerErrorModalOpen(true);
    }
  };

  const closeServerErrorModal = () => {
    setIsServerErrorModalOpen(false);
    setServerErrorMessage('');
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

      <Modal
        title="Validation Error"
        message={validationMessage}
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
      />

      <Modal
        title="Registration Failed"
        message={serverErrorMessage}
        isOpen={isServerErrorModalOpen}
        onClose={closeServerErrorModal}
      />

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default RegisterPage;
