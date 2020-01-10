import React, { useState, useEffect } from 'react';
import { FaSpinner } from "react-icons/fa";
import axios from 'axios';
import Cookie from 'js-cookie';
import './index.css';
import Error from '../Error/Error';

const Checkouts = (props) => {    
    const [checkouts, setCheckouts] = useState([]);
    const [error, setError] = useState('');    

    axios.defaults.headers = {
        'Content-Type': 'application/json',
        'token': Cookie.get('token'), 
        'userId': Cookie.get('userId')
    }

    const completeCheckout = (event) => {
        const checkoutId = event.target.getAttribute('checkout');
        if(checkoutId === '') {
            return;
        }        

        axios.delete(`http://localhost:3001/checkouts/complete/${checkoutId}`)
            .then(res => {                        
                if(res.status === 200) {
                    props.history.push('/');  
                }
            })
            .catch(err => {
                if(err.response.status === 400) {
                    setError('Cannot delete checkout!');
                    return;
                }
                setError('Invalid!');
            })
    }

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:3001/checkouts/all')
                .then(res => {                      
                    if(res.status === 200) {
                        setCheckouts(res.data.checkouts);
                    } else if(res.status === 400) {
                        props.history.push('/login');
                    }
                })
                .catch(err => {                    
                    if(err.response.status === 400 || err.response.status === 401) {
                        props.history.push('/login');
                    }
                })
        }
        fetchData();
    }, []);

    if(checkouts.length === 0) {
        return (<p className="message checkout">No Checkouts</p>)
    } else if(checkouts.loading) {
        return (<section className="message"><FaSpinner /></section>);
    } else if(error) {
        return (<Error message={error} />);
    } else {
        return (
            <div className="checkouts">
            {
                checkouts.map((checkout, i) => {            
                    const key = checkout._id + i;
                    return(
                        <section className="checkout" key={key}>
                            <h2>{checkout.fullName}</h2>
                            <h3>{checkout.address}</h3>
                            <h2>{checkout.productName}</h2>
                            <img src={checkout.url} alt={checkout.productName} />
                            <p>{checkout.price * checkout.quantity}&#x24;</p>
                            <p>Quantity: {checkout.quantity}</p>
                            <button className="complete-checkout-btn" checkout={checkout._id} onClick={completeCheckout}>Complete Checkout</button>
                        </section>
                    );                                
                })
            }
            </div>
        )
    }    
}

export default React.memo(Checkouts);