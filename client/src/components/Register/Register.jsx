import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import Error from '../Error/Error';
import { AuthContext } from '../../contexts/AuthContext';
import authService from '../../services/auth-service';
import validate from './validator';

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
    const validationMessage = validate(email, username, password);
    const isCorrect = validationMessage === '';

    if(isCorrect) {
      authService.register()
        .then(res => {
          if (res.status === 201) {
            props.history.push('/login');
          }
        })
        .catch(err => {
          if (err.response.status === 409) {
            setError('E-Mail address already exists!');
            return;
          }
          setError('Invalid registration!');
        })
    } else {
      setError(validationMessage);
    }          
  }

  const handleChange = (event) => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  }

  if (context.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <main className="registration-container">
      {
        error.length ? <Error message={error} /> : null
      }

      <form className="registration-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} /><br />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" onChange={handleChange} /><br />
        <label htmlFor="password" onChange={handleChange}>Password</label>
        <input type="password" name="password" id="password" onChange={handleChange} /><br />
        <input type="submit" className="submit-btn" value="Send" onChange={handleChange} />
      </form>
    </main>
  );
}

export default Registration;