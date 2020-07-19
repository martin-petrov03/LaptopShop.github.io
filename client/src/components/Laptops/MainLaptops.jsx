import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import laptopService from '../../services/laptop-service';
import Laptop from './Laptops';
import './index.css';

const MainLaptops = (props) => {
    const [laptops, setLaptops] = useState();

    useEffect(() => {
        laptopService.load()
            .then(laptops => {                
                setLaptops(laptops);
            });
    }, []);

    return (
        <Fragment>
            <Link to="/laptops/add" className="add-link"><IoMdAddCircle fontSize="3em"></IoMdAddCircle></Link>
            <main className="laptops-container">
                <Laptop data={laptops} />
            </main>
        </Fragment>
    );    
};

export default React.memo(MainLaptops);