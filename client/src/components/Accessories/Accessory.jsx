import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa";
import './index.css';

const Accessory = (props) => {
    const displayAccessories = () => {
        const data = props.data;
        if(!data || (data.accessories && data.accessories.length === 0)) {
            return (<p className="message">No Accessories</p>)
        } else if(data.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {
            return data.accessories.map(accessory => {
                const price = accessory.price.toFixed(2);
                const url = `/accessories/${accessory.id}`;
                
                return (
                    <Link to={url} className="accessory" key={accessory.id}>
                        <h1>{accessory.title}</h1>
                        <img src={accessory.url} alt={accessory.title} />
                        <p>{accessory.description}</p>
                        <h2>{price}&#x24;</h2>
                    </Link>
                );
            });
        }
    }

    return (
        displayAccessories()
    );
}

export default Accessory;