import React from 'react';
import { FaSpinner } from "react-icons/fa";
import { graphql } from 'react-apollo';
import Laptop from './Laptop';
import './index.css';
import { getLaptopsQuery } from '../../queries/queries';

const Laptops = (props) => {
    return (
        <main className="laptops-container">            
            {                                  
                <Laptop data={props.data} />
            }       
        </main>
    );    
}

export default graphql(getLaptopsQuery)(Laptops);