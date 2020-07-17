import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';
import validator from './validatator';
import accessoriesService from '../../services/accessories-service';
import Error from '../Error/Error';
import { AuthContext } from '../../contexts/AuthContext';

const AddAccessories = (props) => {
  const context = useContext(AuthContext);
  const [error, setError] = useState('');
  const [inputs, setInputs] = useState({});

  const handleSubmit = (event) => {
    setError('');
    event.preventDefault();
    const title = inputs.title;
    const url = inputs.url;
    const description = inputs.description;
    const price = Number(inputs.price);

    const validationMessage = validator(title, url, description, price);
    const isCorrect = validationMessage === '';

    if (!isCorrect) {
      setError(validationMessage);
    }

    accessoriesService.add(title, url, description, price)    
      .then(status => {        
        if (status === 201) {
          props.history.push('/accessories');
        } else if (status === 409) {
          setError('Accessories already exists!');
          return;
        } if (status === 401) {
          props.history.push('/login');
        }
        setError('Invalid!');
      });

  }

  const handleChange = (event) => {
    event.persist();
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
  }

  if (!context.isAuthenticated) {
    return <Redirect to="/login" />
  }

  return (
    <main className="add-accessories">
      {
        error.length ? <Error message={error} /> : null
      }

      <h1>Add Accessories</h1>
      <form className="add-accessories-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={handleChange} /><br />
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

export default AddAccessories;