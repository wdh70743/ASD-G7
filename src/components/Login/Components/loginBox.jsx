import React from 'react';
import '../Styles/loginBox.css';
import LoginInput from './loginInput.jsx';
import LoginInputLabel from './loginInputLabel.jsx';
import LoginButton from './loginButton.jsx';

const LoginBox = ({ title, inputs, buttons }) => {
    return (
        <div className='loginLayout'>
            <div className='loginBox'>
                <h1>{title}</h1>
                <div className='loginBoxContentLayout'>
                    <div className='loginBoxContent'>
                        {inputs.map((input, index) => (
                            <div key={index}>
                                <LoginInputLabel label={input.label} />
                                <LoginInput 
                                    type={input.type} 
                                    placeholder={input.placeholder} 
                                    value={input.value}
                                    onChange={input.onChange}
                                />
                            </div>
                        ))}
                        {buttons.map((button, index) => (
                            <LoginButton key={index} name={button.name} onClick={button.onClick} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginBox;
