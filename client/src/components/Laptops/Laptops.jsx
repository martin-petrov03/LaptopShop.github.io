import React, { Fragment, useState, useEffect } from 'react';
import laptopService from '../../services/laptop-service';
import Laptop from './Laptop';
import './index.css';

const Laptops = (props) => {
    const [laptops, setLaptops] = useState([]);        

    useEffect(() => {
        laptopService.load()
            .then(laptops => {
                console.log(laptops);
                setLaptops(laptops);
            });
    }, []);

    return (
        <Fragment>
            <main className="laptops-container">
                <Laptop data={laptops} />
            </main>
        </Fragment>
    );    
};

export default React.memo(Laptops);