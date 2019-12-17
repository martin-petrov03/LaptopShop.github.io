import React from 'react';
import { FaSpinner } from "react-icons/fa";
import './index.css';

const Accessory = (props) => {
    const displayAccessories = () => {
        const data = props.data;
        if(data.loading) {
            return (<section className="accessory"><FaSpinner /></section>);
        } else {
            return data.accessories.map(accessory => {
                const price = accessory.price.toFixed(2);
                return (
                    <section className="accessory" key={accessory.id}>
                        <h1>{accessory.title}</h1>
                        <img src={accessory.url} alt={accessory.title} />
                        <p>{accessory.description}</p>
                        <h2>{price}&#x24;</h2>
                    </section>
                );
            });
        }
    }

    return (
        displayAccessories()
    );
}

export default Accessory;