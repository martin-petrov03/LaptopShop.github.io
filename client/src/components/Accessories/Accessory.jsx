import React from 'react';
import { FaSpinner } from "react-icons/fa";
import './index.css';

const Accessory = (props) => {
    const displayAccessories = () => {
        const data = props.data;
        if(data.loading) {
            return (<FaSpinner />);
        } else {
            return data.accessories.map(accessory => {
                return (
                    <section className="accessory" key={accessory.id}>
                        <h1>{accessory.model}</h1>
                        <img src={accessory.url} alt={accessory.model} />
                        <p>{accessory.description}</p>
                        <h2>{accessory.price.toFixed(2)}&#x24;</h2>
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