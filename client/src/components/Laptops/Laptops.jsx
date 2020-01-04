import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Laptop from './Laptop';
import './index.css';

const Laptops = (props) => {
    const [laptops, setLaptops] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:3001/laptops/all')
                .then(res => {                      
                    if(res.status === 200) {
                        setLaptops(res.data.laptops);
                    }
                })                
        }
        fetchData();
    }, []);

    return (
        <main className="laptops-container">            
            {
                <Laptop data={laptops} />
            }       
        </main>
    );    
}

export default Laptops;