import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Error from '../Error/Error';
import { AuthContext } from '../../contexts/AuthContext';

const Registration = (props) => {
  const context = useContext(AuthContext);  
  const [error, setError] = useState('');
  const [inputs, setInputs] = useState({});
  
  const handleSubmit = (event) => {
    setError('');
    event.preventDefault();
    const email = inputs.email;
    const username = inputs.username;
    const password = inputs.password;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email && email.length >= 5) {
        if(emailRegex.test(email)) {
            if(username && username.length >= 5) {     
                if(password && password.length >= 5) {      
                axios.post('http://localhost:3001/auth/signup', { email, username, password })
                    .then(res => {                        
                        if(res.status === 201) {
                            props.history.push('/login');
                        }
                    })
                    .catch(err => {
                        if(err.response.status === 409) {
                            setError('E-Mail address already exists!');
                            return;
                        }
                        setError('Invalid registration!');
                    })
                } else {
                setError('Password should be at least 5 characters!');
                }
            } else {
                setError('Username should be at least 5 characters!');
            }
        } else {
            setError('Invalid email!');
        }
    } else {
        setError('E-Mail should be at least 5 characters!');
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
    <main className="registration-container">
      {
        error.length ? <Error message={error} /> : null
      }
      
      <h1>Sign Up</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} /><br/>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={handleChange} /><br/>
        <label htmlFor="password" onChange={handleChange}>Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} /><br/>
        <input type="submit" className="submit-btn" value="Send" onChange={handleChange} />
      </form>
    </main>
  );
}

export default Registration;