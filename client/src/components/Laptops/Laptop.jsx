import React from 'react';
import { FaSpinner } from "react-icons/fa";
import './index.css';

const Laptop = (props) => {
    const displayLaptops = () => {
        const data = props.data;
        if(data.loading) {
            return (<FaSpinner />);
        } else {
            return data.laptops.map(laptop => {
                return <div className="laptop-container">
                    <h1>{laptop.model}</h1>
                    <img src={laptop.url} alt={laptop.model} />
                    <p>{laptop.description}</p>
                    <h2>{laptop.price}</h2>
                </div>;
            });
        }
    }

    return (
        <section className="laptop">            
            {                               
                displayLaptops()
            }       
        </section>
    );    
}

export default Laptop;