import React from 'react';
import Cookie from 'js-cookie';
import './index.css';

const CheckoutSection = () => {
    const username = Cookie.get('username');

    return (
        <section className="checkout-section">
            <h2>Checkout</h2>
            <label htmlFor="username">Name:</label><br/>
            <span className="username">{username}</span><br/>
            <label htmlFor="address">Address: </label><br/>
            <input type="text" id="address" /><br/>
            <button className="btn">Checkout</button>
        </section>
    )
}

export default CheckoutSection;