import React from 'react';
import { FaSpinner } from "react-icons/fa";
import './index.css';

const Laptop = (props) => {
    const displayLaptops = () => {
        const data = props.data;
        if(!data || (data.laptops && data.laptops.length === 0)) {
            return (<p className="message">No Laptops</p>)
        } else if(data.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {
            return data.laptops.map(laptop => {
                const price = laptop.price.toFixed(2);
                return (
                    <section className="laptop" key={laptop.id}>
                        <h1>{laptop.model}</h1>
                        <img src={laptop.url} alt={laptop.model} />
                        <p>{laptop.description}</p>
                        <h2>{price}&#x24;</h2>
                    </section>
                );
            });
        }
    }

    return (        
        displayLaptops()        
    );    
}

export default Laptop;