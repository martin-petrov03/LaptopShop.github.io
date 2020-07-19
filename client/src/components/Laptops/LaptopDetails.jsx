import React, { useState, useContext, useEffect } from 'react';
import { FaSpinner } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Cookie from 'js-cookie';
import './index.css';
import laptopService from '../../services/laptop-service';
import {listContext} from '../../contexts/ShoppingCart';

const LaptopDetails = (props) => {
    const stt = useContext(listContext);
    const userId = Cookie.get('userId');
    const laptopId = props.match.params.id;    
    const isAdmin = Cookie.get('isAdmin');
    let isAuthorized = isAdmin;
    let isAuth = Cookie.get('token');
    
    const [laptop, setLaptop] = useState([]);

    useEffect(() => {        
        laptopService.loadLaptopById(laptopId)
            .then(laptop => {
                laptop.price = laptop.price.toFixed(2);
                setLaptop(laptop);                
                if(laptop.author === userId) {
                    isAuthorized = true;
                }
            });
    }, []);

    const deleteLaptop = (event) => {        
        laptopService.delete(laptopId)
            .then((status) => {
                if (status === 401) {
                    props.history.push('/login');
                    return;
                }
                props.history.push('/');
            })
    }
    
    if(laptop.loading) {
        return (<section className="message"><FaSpinner /></section>);
    }

    return (
        <section className="laptop laptop-details" key={laptop.id}>
            <h1>{laptop.title}</h1>
            <img src={laptop.url} alt={laptop.title} />
            <p>{laptop.description}</p>
            <h2>&#x24;{laptop.price}</h2>
            {
                isAuth ? <IoMdAddCircle className="submit-btn add-to-cart" onClick={()=>stt.addNew(laptop)}>Add To Cart</IoMdAddCircle> : null
            }
            {               
                isAuthorized ? <MdDelete className="submit-btn delete0laptop" onClick={deleteLaptop} laptop={laptop.id} /> : null
            }
        </section>    
    );
}

export default LaptopDetails;