import React from 'react';
import { FaSpinner } from "react-icons/fa";
import { graphql } from 'react-apollo';
import Laptop from './Laptop';
import './index.css';
import { getLaptopsQuery } from '../../queries/queries';

const Laptops = (props) => {
    const displayLaptops = () => {
        const data = props.data;
        if(data.loading) {
            return (<FaSpinner />);
        } else {
            return data.laptops.map(laptop => {
                return <li key={laptop.id}>{laptop.model}</li>;
            });
        }
    }

    return (
        <main className="laptops-container">            
            {                                  
                <Laptop data={props.data} />
            }       
        </main>
    );    
}

export default graphql(getLaptopsQuery)(Laptops);