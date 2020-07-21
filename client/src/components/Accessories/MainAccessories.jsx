import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import accessoriesService from '../../services/accessories-service';
import Accessories from './Accessories';
import './index.css';

const MainAccessories = (props) => {
    const [accessories, setAccessories] = useState([]);
    let isEmpty = false;

    useEffect(() => {
        accessoriesService.load()
            .then(acc => {
                console.log(acc);
                setAccessories(acc);
                if(accessories.length === 0) {
                    isEmpty = true;
                }
            });
    }, []);

    return (
        <Fragment>                        
            <Link to="/accessories/add" className="add-link"><IoMdAddCircle fontSize="3em"></IoMdAddCircle></Link>
            {
                isEmpty 
                    ? <p className="message">No Accessories</p>
                    : null
            }
            <main className="accessories-container">
                {
                    !isEmpty 
                        ? <Accessories data={accessories} />
                        : null
                }       
            </main>
        </Fragment>
    );    
}

export default React.memo(MainAccessories);