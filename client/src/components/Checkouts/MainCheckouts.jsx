import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import checkoutService from '../../services/checkout-service';
import Checkouts from './Checkouts';
import './index.css';

const MainCheckouts = (props) => {
    const [checkouts, setCheckouts] = useState([]);

    useEffect(() => {
        checkoutService.load()
            .then(ch => {
                console.log(ch);
                setCheckouts(ch);
            })
            .catch(err => {
                if(err.response.status === 401) {
                    props.history.push('/login');                    
                }
            });
    }, [props.history]);

    return (
        <Fragment>                        
            <Link to="/checkouts/add" className="add-link"><IoMdAddCircle fontSize="3em"></IoMdAddCircle></Link>
            <main className="checkouts-container">
                {        
                    <Checkouts data={checkouts} />
                }       
            </main>
        </Fragment>
    );    
}

export default React.memo(MainCheckouts);