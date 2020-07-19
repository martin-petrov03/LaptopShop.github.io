import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAddCircle } from "react-icons/io";
import accessoriesService from '../../services/accessories-service';
import Accessories from './Accessories';
import './index.css';

const MainAccessories = (props) => {
    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
        accessoriesService.load()
            .then(acc => {
                console.log(acc);
                setAccessories(acc);
            });
    }, []);

    return (
        <Fragment>                        
            <Link to="/accessories/add" className="add-link"><IoMdAddCircle fontSize="3em"></IoMdAddCircle></Link>
            <main className="accessories-container">
                {        
                    <Accessories data={accessories} />
                }       
            </main>
        </Fragment>
    );    
}

export default React.memo(MainAccessories);