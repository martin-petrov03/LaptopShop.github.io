import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accessory from './Accessory';
import './index.css';

const Accessories = (props) => {
    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:3001/accessories/all')
                .then(res => {
                    if(res.status === 200) {                        
                        setAccessories(res.data.accessories);
                    }
                })                
        }
        fetchData();
    }, []);

    return (
        <main className="accessories-container">            
            {                                  
                <Accessory data={accessories} />
            }       
        </main>
    );    
}

export default Accessories;