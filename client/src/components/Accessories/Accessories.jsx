import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa";
import './index.css';

const Accessories = (props) => {
    const accessories = props.data;    

    const displayAccessories = () => {
        if(accessories.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {
            return accessories.map(accessory => {
                const price = accessory.price.toFixed(2);
                const url = `/accessories/${accessory._id}`;
                
                return (
                    <Link to={url} className="accessory" key={accessory._id}>
                        <h1>{accessory.title}</h1>
                        <img src={accessory.url} alt={accessory.title} />
                        <p>{accessory.description}</p>
                        <h2>&#x24;{price}</h2>
                    </Link>
                );
            });
        }
    }

    return (
        displayAccessories()
    );
}

export default Accessories;