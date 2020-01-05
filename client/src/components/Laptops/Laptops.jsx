import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Laptop from './Laptop';
import './index.css';

const Laptops = (props) => {
    const [laptops, setLaptops] = useState([]);
    const [filteredData, setData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:3001/laptops/all')
                .then(res => {
                    if(res.status === 200) {
                        setLaptops(res.data.laptops);
                        setData([])
                    }
                })
        }
        fetchData();
    }, []);

    const handleModelChange = (event) => {
        setData([]);
        console.log(filteredData)
        laptops.filter(l =>  {            
            if(l.model.toLowerCase().includes(event.target.value)) {
                const index = filteredData.findIndex(x => x.model==l.model)
                if (index === -1){                    
                    setData(filteredData.concat(l));
                }
            }
        });
    }

    return (
        <Fragment>
            <div className="filter">
                <label htmlFor="model">Model: </label><br/>
                <input type="text" id="model" placeholder="Acer" onChange={handleModelChange} /><br/>
                <label htmlFor="min-price">Price: </label><br/>
                <input type="number" id="min-price" placeholder="400" /><br/>
                <input type="number" id="max-price" placeholder="9999" />
            </div>
            <main className="laptops-container">            
                {
                    filteredData.length > 0 ? <Laptop data={filteredData} /> : <Laptop data={laptops} />
                    
                }                
            </main>
        </Fragment>
    );    
}

export default Laptops;