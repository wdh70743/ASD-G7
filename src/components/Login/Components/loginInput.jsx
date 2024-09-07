import React from 'react';
import '../Styles/loginInput.css';

const LoginInput = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            className="loginInput"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

export default LoginInput;
