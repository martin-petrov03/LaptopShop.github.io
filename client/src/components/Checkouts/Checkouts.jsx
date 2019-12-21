import React from 'react';
import { graphql } from 'react-apollo';
import { FaSpinner } from "react-icons/fa";
import './index.css';
import { getCheckoutsQuery } from '../../queries/queries';

const Checkouts = (props) => {
    const checkouts = props.data.checkouts;
        
    if(!checkouts || (checkouts && checkouts.length === 0)) {
        return (<p className="message">No Laptops</p>)
    } else if(checkouts.loading) {
        return (<section className="message"><FaSpinner /></section>);
    } else {
        return checkouts.map(checkout => {            
            return(
                <section className="checkouts" key={checkout.id}>
                    <h2>{checkout.productName}</h2>
                    <img src={checkout.url} alt={checkout.productName} />
                    <p>{checkout.price}&#x24;</p>
                    <p>Quantity: {checkout.quantity}</p>
                    <p>By: {checkout.author.username}</p>
                </section>
            );
        })
    }
    return (
        <p></p>
    );
}

export default graphql(getCheckoutsQuery)(Checkouts);