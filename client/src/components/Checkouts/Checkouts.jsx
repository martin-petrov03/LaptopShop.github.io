import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa";
import './index.css';

const Checkouts = (props) => {
    const checkouts = props.data;    

    const displayCheckouts = () => {
        if(!checkouts || (checkouts && checkouts.length === 0)) {
            return (<p className="message">No Checkouts</p>)
        } else if(checkouts.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {
            return checkouts.map(checkout => {
                const price = (checkout.price * checkout.quantity).toFixed(2);
                const url = `/checkouts/${checkout._id}`;
                
                return (
                    <Link to={url} className="checkout" key={checkout._id}>
                        <h2>{checkout.fullName}</h2>
                        <h3>{checkout.address}</h3>
                        <h2>{checkout.productName}</h2>
                        <img src={checkout.url} alt={checkout.productName} />
                        <p>&#x24;{price}</p>
                        <p>Quantity: {checkout.quantity}</p>
                    </Link>
                );
            });
        }
    }

    return (
        displayCheckouts()
    );
}

export default Checkouts;