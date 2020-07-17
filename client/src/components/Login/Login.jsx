import React, { useState, useContext } from 'react';
import './index.css';
import Error from '../Error/Error';
import { AuthContext } from '../../contexts/AuthContext';
import authService from '../../services/auth-service';
import validate from './validator';

const Login = (props) => {
  const context = useContext(AuthContext);
  const { login } = context;
  const [error, setError] = useState('');
  const [inputs, setInputs] = useState({});
  
  const logout = () => {
    authService.logout();
    const { logout } = context;
    logout();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    logout();
    const email = inputs.email;
    const password = inputs.password;
    const validationMessage = validate(email, password);
    const isCorrect = validationMessage === '';

    if(isCorrect) {
      authService.login(email, password)
        .then(res => {
          if(res.status === 200 && res.data.token) {                
            login();
            props.history.push('/');            
          }
        })
        .catch(err => {
          setError('Invalid login!');
        });
    } else {
      setError(validationMessage);
    }    
  }

  const handleChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  } 

  return (
    <main className="login-container">
      {
        error.length ? <Error message={error} /> : null
      }
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Sing In</h1>
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