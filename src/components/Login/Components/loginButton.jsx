import React from 'react';
import '../Styles/loginButton.css';

const LoginButton = ({ name, onClick }) => {
    return (
        <button className="loginButton" onClick={onClick}>
            {name}
        </button>
    );
}

export default LoginButton;
