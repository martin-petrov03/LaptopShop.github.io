import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import Error from '../Error/Error';
import { AuthContext } from '../../contexts/AuthContext';
import laptopService from '../../services/laptop-service';
import authService from '../../services/auth-service';
import validator from './validatator';

const AddLaptop = (props) => {
  const context = useContext(AuthContext);
  const [error, setError] = useState('');
  const [inputs, setInputs] = useState({});

  const logout = () => {
    authService.logout();
    const { logout } = context;
    logout();
  }

  const handleSubmit = (event) => {
    setError('');
    event.preventDefault();
    const model = inputs.model;
    const url = inputs.url;
    const description = inputs.description;
    const price = Number(inputs.price);

    const validationMessage = validator(model, url, description, price);
    const isCorrect = validationMessage === '';

    if(!isCorrect) {
      setError(validationMessage);
    }

    if(isCorrect) {      
      laptopService.add(model, url, description, price)
        .then((status) => {
          if (status === 201) {
            props.history.push('/');
          } else if (status === 409) {
            setError('Laptop already exists!');
            return;
          } else if (status === 401) {        
            logout();
            props.history.push('/login');
            return;
          }
          setError('Invalid!');
        });             
    }    
  }

  const handleChange = (event) => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  }

  if (!context.isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <main className="add-laptop">
      {
        error.length ? <Error message={error} /> : null
      }

      <h1>Add Laptop</h1>
      <form className="add-laptop-form" onSubmit={handleSubmit}>
        <label htmlFor="model">Model</label>
        <input type="text" name="model" id="model" onChange={handleChange} /><br />
        <label htmlFor="url">Url</label>
        <input type="text" name="url" id="url" onChange={handleChange} /><br />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" onChange={handleChange} /><br />
        <label htmlFor="price">Price</label>
        <input type="number" step="0.01" name="price" id="price" onChange={handleChange} /><br />

        <input type="submit" className="submit-btn" value="Send" onChange={handleChange} />
      </form>
    </main>
  );
}

export default AddLaptop;