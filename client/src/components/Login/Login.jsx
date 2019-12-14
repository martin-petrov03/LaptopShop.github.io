import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import './index.css';
import Error from '../Error/Error';
import { AuthContext } from '../../contexts/AuthContext';

const Login = (props) => {
  const context = useContext(AuthContext);  
  const [error, setError] = useState('');
  const [inputs, setInputs] = useState({});
  
  const handleSubmit = (event) => {
    setError('');
    event.preventDefault();
    const email = inputs.email;
    const password = inputs.password;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email && email.length >= 5 && emailRegex.test(email)) {
      if(password && password.length >= 5) {

        axios.post('http://localhost:3001/auth/signin', { email, password })
          .then(res => {
            if(res.status === 200 && res.data.token) {
              Cookie.set('username', res.data.username);
              Cookie.set('userId', res.data.userId);
              Cookie.set('token', res.data.token);
              const { login, setData } = context;
              login();
              setData();
              props.history.push('/');            
            }
          })
          .catch(err => {
            setError('Invalid login!');
          })
      } else {
        setError('Password should be al least 5 characters length!');        
      }
    } else {
      setError('Invalid email!');
    }
  }
  const handleChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  if(context.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <main className="login-container">
      {
        error.length ? <Error message={error} /> : null
      }
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} /><br/>
        <label htmlFor="password" onChange={handleChange}>Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} /><br/>
        <input type="submit" className="submit-btn" value="Send" onChange={handleChange} />
      </form>
    </main>
  );
}

export default Login;