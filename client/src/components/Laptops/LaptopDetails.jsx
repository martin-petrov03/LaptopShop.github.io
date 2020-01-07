import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Cookie from 'js-cookie';
import './index.css';
import {listContext} from '../../contexts/ShoppingCart';

const LaptopDetails = (props) => {    
    const stt = useContext(listContext);
    const token = Cookie.get('token');
    const userId = Cookie.get('userId');
    const isAdmin = Cookie.get('isAdmin');

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

    axios.defaults.headers = {
        'Content-Type': 'application/json',
        'token': token,
        'userId': userId
    }    

    const deleteLaptop = (event) => {
        const laptopId = event.target.getAttribute('laptop');
        if(laptopId) {
            axios.delete(`http://localhost:3001/laptops/delete/${laptopId}`)
            .then(res => {                
                props.history.push('/');                
            });
        }
    }
    
    if(!laptops || laptops.length === 0) {
        return (<p className="message">Not Found</p>)
    } else if(laptops.loading) {
        return (<section className="message"><FaSpinner /></section>);
    } else {
        return laptops.map(laptop => {
            const laptopId = laptop._id;            

            if(laptopId === props.match.params.id) {
                const price = laptop.price.toFixed(2);
                let isAuthorized = isAdmin;
                   
                if(laptop && laptop.author && laptop.author && laptop.author === userId) {
                    isAuthorized = true;
                }
                
                return (
                    <section className="laptop laptop-details" key={laptopId}>
                        <h1>{laptop.title}</h1>
                        <img src={laptop.url} alt={laptop.title} />
                        <p>{laptop.description}</p>
                        <h2>{price}&#x24;</h2>
                        {
                            Cookie.get('token') ? <IoMdAddCircle className="submit-btn" onClick={()=>stt.addNew(laptop)}>Add To Cart</IoMdAddCircle> : null
                        }
                        {               
                            isAuthorized ? <MdDelete className="submit-btn" onClick={deleteLaptop} laptop={laptopId} /> : null
                        }
                    </section>                        
                );
            }
            return null;
        });
    }
}

export default LaptopDetails;