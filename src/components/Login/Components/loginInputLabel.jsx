import React from 'react';
import '../Styles/loginInputLabel.css';

const LoginInputLabel = ({ label }) => {
    return (
        <label className="loginInputTag">{label}</label>
    );
}

export default LoginInputLabel;