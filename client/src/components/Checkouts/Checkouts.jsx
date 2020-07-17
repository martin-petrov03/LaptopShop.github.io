import React, { useState, useEffect } from 'react';
import { FaSpinner } from "react-icons/fa";
import './index.css';
import checkoutService from '../../services/checkout-service';
import Error from '../Error/Error';

const Checkouts = (props) => {
    const [checkouts, setCheckouts] = useState([]);
    const [error, setError] = useState('');

    const completeCheckout = (event) => {
        const checkoutId = event.target.getAttribute('checkout');
        if(checkoutId === '') {
            return;
        }

        checkoutService.complete(checkoutId)
            .then(res => { 
                if(res.status === 200) {
                    props.history.push('/');
                }
            })
            .catch(err => {
                if(err.response.status === 400) {
                    setError('Cannot delete checkout!');
                    return;
                } else if (err.response.status === 401) {
                    props.history.push('/login');                    
                    return;
                }
                setError('Invalid!');
            })
    }

    useEffect(() => {
        checkoutService.load()
            .then(checkouts => {
                setCheckouts(checkouts);
            })
            .catch(err => {                    
                if(err.response.status === 401) {
                    props.history.push('/login');                    
                }
            })        
    }, [props.history]);

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