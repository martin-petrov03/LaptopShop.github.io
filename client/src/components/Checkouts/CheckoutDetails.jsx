import React, { useState, useEffect } from 'react';
import { FaSpinner } from "react-icons/fa";
import './index.css';
import checkoutService from '../../services/checkout-service';

const CheckoutDetails = (props) => {        
    const checkoutId = props.match.params.id;    

    const [checkout, setCheckout] = useState();

    useEffect(() => {
        checkoutService.loadById(checkoutId)
            .then(ch => {                
                setCheckout(ch);
            });
    }, [checkoutId]);

    const completeCheckout = (event) => {
        const checkoutId = event.target.getAttribute('checkout');
        if(checkoutId === '') {
            return;
        }

        checkoutService.complete(checkoutId)
            .then(res => { 
                if(res.status === 200) {
                    props.history.push('/checkouts/all');
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    props.history.push('/login');
                    return;
                }
                props.history.push('/checkouts/all');
            })
    }

    const displayCheckout = () => {
        if(!checkout || (checkout && checkout.length === 0)) {
            return (<p className="message">Not Found</p>)
        } else if(checkout.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {            
            return (
                <section className="checkout checkout-details" key={checkoutId}>                    
                    <h2>{checkout.fullName}</h2>
                    <h3>{checkout.address}</h3>
                    <h2>{checkout.productName}</h2>
                    <img src={checkout.url} alt={checkout.productName} />
                    <p>{checkout.price * checkout.quantity}&#x24;</p>
                    <p>Quantity: {checkout.quantity}</p>
                    <button className="complete-checkout-btn" checkout={checkout._id} onClick={completeCheckout}>Complete Checkout</button>
                </section>                                
            );
        }
    }

    return (
        displayCheckout()
    );
}

export default CheckoutDetails;