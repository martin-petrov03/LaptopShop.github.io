import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FaSpinner } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { graphql } from 'react-apollo';
import Cookie from 'js-cookie';
import './index.css';
import { getLaptopsQuery } from '../../queries/queries';
import { AuthContext } from '../../contexts/AuthContext';

const LaptopDetails = (props) => {
    const  [laptops, setLaptops] = useState(props.data.laptops);
    const context = useContext(AuthContext);
    const userId = Cookie.get('userId');
    const isAdmin = Cookie.get('isAdmin');
        
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        'token': context.token,
        'userId': context.userId
    }

    const addToCart = (event, laptopObj) => {        
        console.log(laptopObj)
        if(laptopObj) {
            let checkouts = Cookie.get('checkouts');
            checkouts += laptopObj
            console.log(checkouts)            
            Cookie.set('checkouts', checkouts)
            props.history.push('/');
        }
    }

    const deleteLaptop = (event) => {
        const laptopId = event.target.getAttribute('laptop');
        
        if(laptopId) {
            axios.delete(`http://localhost:3001/laptops/delete/${laptopId}`)
            .then(res => {
                if(res.status === 200) {
                    props.history.push('/');
                }
            });
        }
    }
    
    if(!laptops || laptops.length === 0) {
        return (<p className="message">Not Found</p>)
    } else if(laptops.loading) {
        return (<section className="message"><FaSpinner /></section>);
    } else {
        return laptops.map(laptop => {
            const laptopId = laptop.id;
            const laptopObj = laptop;

            if(laptopId === props.match.params.id) {
                const price = laptop.price.toFixed(2);
                let isAuthorized = isAdmin;                    
                if(laptop && laptop.author && laptop.author.id  && laptop.author.id === userId) {
                    isAuthorized = true;
                }
                
                return (
                    <section className="laptop laptop-details" key={laptopId}>
                        <h1>{laptop.title}</h1>
                        <img src={laptop.url} alt={laptop.title} />
                        <p>{laptop.description}</p>
                        <h2>{price}&#x24;</h2>
                        {
                            Cookie.get('token') ? <IoMdAddCircle className="submit-btn" onClick={() => addToCart(laptopObj)}>Add To Cart</IoMdAddCircle> : null
                        }
                        {               
                            isAuthorized ? <MdDelete className="submit-btn" laptop={laptopId} onClick={deleteLaptop} /> : null
                        }
                    </section>                        
                );
            }
            return null;
        });
    }
}

export default graphql(getLaptopsQuery)(LaptopDetails);