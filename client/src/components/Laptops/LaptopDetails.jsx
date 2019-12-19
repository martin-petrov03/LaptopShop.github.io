import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FaSpinner } from "react-icons/fa";
import { graphql } from 'react-apollo';
import Cookie from 'js-cookie';
import './index.css';
import Error from '../Error/Error';
import { getLaptopsQuery } from '../../queries/queries';
import { AuthContext } from '../../contexts/AuthContext';

const LaptopDetails = (props) => {
    const context = useContext(AuthContext);
    const [error, setError] = useState('');
    const [author, setAuthor] = useState('');
        
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        'token': context.token,
        'userId': context.userId
    }

    const deleteLaptop = () => {
        const userId = context.userId;

        if(userId === author || Cookie.get('isAdmin')) {
            axios.delete('http://localhost:3001/auth/signin')
            .then(res => {
                if(res.status === 200) {
                    props.history.push('/');
                } else if(res.status === 400) {
                    setError('Cannot find the product!');
                } else if(res.status === 401) {
                    setError('Not authorized to delete the product!');
                }
            })
        } else {
            setError('Not authorized to delete the product!');
        }
    }

    const displayLaptops = () => {
        const data = props.data;
        if(error) {
            return <Error message={error} />
        }

        if(!data || (data.laptops && data.laptops.length === 0)) {
            return (<p className="message">Not Found</p>)
        } else if(data.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {            
            return data.laptops.map(laptop => {
                const price = laptop.price.toFixed(2);                                

                if(laptop.id == props.match.params.id) {
                  return (
                    <main className="laptops-container">
                      <section className="laptop" key={laptop.id}>
                          <h1>{laptop.title}</h1>
                          <img src={laptop.url} alt={laptop.title} />
                          <p>{laptop.description}</p>
                          <h2>{price}&#x24;</h2>
                          <button>Add To Cart</button>
                          <input type="submit" className="submit-btn" value="Delete" onClick={deleteLaptop} />
                      </section>
                    </main>
                  );
                }
            });
        }
    }

    return (
        displayLaptops()
    );
}

export default graphql(getLaptopsQuery)(LaptopDetails);