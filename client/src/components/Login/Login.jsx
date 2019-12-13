import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const context = useContext(AuthContext);

  if(context.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <main className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" /><br/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" /><br/>
        <input type="submit" className="submit-btn" value="Send" />
      </form>
    </main>
  );
}

export default Login;