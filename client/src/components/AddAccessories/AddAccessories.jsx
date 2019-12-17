import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Error from '../Error/Error';
import { AuthContext } from '../../contexts/AuthContext';

const AddAccessories = (props) => {
  const context = useContext(AuthContext);  
  const [error, setError] = useState('');
  const [inputs, setInputs] = useState({});
  
  axios.defaults.headers = {
    'Content-Type': 'application/json',
    'token': context.token, 
    'userId': context.userId
  }    

  const handleSubmit = (event) => {
    setError('');
    event.preventDefault();
    const title = inputs.title;
    const url = inputs.url;
    const description = inputs.description;
    const price = Number(inputs.price);    

    if(title && title.length >= 5) {
        if(url && url.length >= 5 && url.startsWith('http')) {
            if(description && description.length >= 10) {
                if(price && price >= 0.01  && price <= 9999.99) {
                    axios.post('http://localhost:3001/accessories/add', { title, url, description, price })
                    .then(res => {                        
                      if(res.status === 201) {
                        props.history.push('/accessories');
                      }
                    })
                    .catch(err => {
                      if(err.response.status === 409) {
                        setError('Accessories already exists!');
                        return;
                      }
                      setError('Invalid!');
                    })
                } else {
                    setError('Invalid price!');
                }
            } else {
                setError('Description should be at least 10 characters!');
            }
        } else {
            setError('Invalid url!');
        }
    } else {
        setError('Title should be at least 5 characters!');
    }
  }

  const handleChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  if(!context.isAuthenticated) {
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
        <input type="text" name="title" id="title" onChange={handleChange} /><br/>
        <label htmlFor="url">Url</label>
        <input type="text" name="url" id="url" onChange={handleChange} /><br/>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" onChange={handleChange} /><br/>
        <label htmlFor="price">Price</label>
        <input type="number" step="0.01" name="price" id="price" onChange={handleChange} /><br/>

        <input type="submit" className="submit-btn" value="Send" onChange={handleChange} />
      </form>
    </main>
  );
}

export default AddAccessories;