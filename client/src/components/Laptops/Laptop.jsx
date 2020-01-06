import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa";
import './index.css';

const Laptop = (props) => {
    const laptops = props.data;    

    const displayLaptops = () => {        
        if(!laptops || (laptops && laptops.length === 0)) {
            return (<p className="message">No Laptops</p>)
        } else if(laptops.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {            
            return laptops.map(laptop => {                
                const price = laptop.price.toFixed(2);
                const url = `/laptops/${laptop._id}`;

                return (
                    <Link to={url} className="laptop" key={laptop._id}>
                        <h1>{laptop.model}</h1>
                        <img src={laptop.url} alt={laptop.model} />
                        <p>{laptop.description}</p>
                        <h2>{price}&#x24;</h2>
                    </Link>
                );
            });
        }
    }

    return (        
        displayLaptops()        
    );    
}

export default Laptop;