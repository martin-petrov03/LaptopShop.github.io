import React, { useState, useContext } from 'react';
import { FaSpinner } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthContext';

const ShoppingCart = (props) => {
    const context = useContext(AuthContext);
    const [checkouts, setCheckouts] = useState(context.checkouts);
    const [quantity, setQuantity] = useState(0);
    console.log(checkouts)
    
    const onChange = (event) => {
        setQuantity(event.target.value);
    }

    if(!checkouts || checkouts.length === 0) {
        return (<p className="message">Not Found</p>)
    } else if(checkouts.loading) {
        return (<section className="message"><FaSpinner /></section>);
    } else {    
        return checkouts.map(product => {
            if(product.title) {
                return (
                    <section className="product">
                        <h2>{product.title}</h2>
                        <img src={product.url} alt={product.title} />
                        <label for="quantity">Quantity: </label>
                        <input type="number" name="quantity" id="quantity" onChange={onChange} />
                        <p>{product.price * quantity}</p>
                    </section>
                )
            }
            return (
                <section className="product">
                    <h2>{product.model}</h2>
                    <img src={product.url} alt={product.model} />
                    <label for="quantity">Quantity: </label>
                    <input type="number" name="quantity" id="quantity" onChange={onChange} />
                    <p>{product.price * quantity}</p>
                </section>
            )
        });
    }
}

export default ShoppingCart;