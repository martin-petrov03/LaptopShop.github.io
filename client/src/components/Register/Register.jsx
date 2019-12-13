import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
    const context = useContext(AuthContext);

    if(context.isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <main className="registration-container">
            <h1>Register</h1>
            <form className="register-form">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" /><br/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" /><br/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" /><br/>
                <input type="submit" className="submit-btn" value="Send" />
            </form>
        </main>
    );   
}

export default Register;