import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Cookie from 'js-cookie';
import './index.css';
import { AuthContext } from '../../contexts/AuthContext';
import {listContext} from '../../contexts/ShoppingCart';

const AccessoryDetails = (props) => {
    const context = useContext(AuthContext);
    const stt = useContext(listContext);
    const userId = Cookie.get('userId');
    const isAdmin = Cookie.get('isAdmin');

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

    axios.defaults.headers = {
        'Content-Type': 'application/json',
        'token': context.token,
        'userId': context.userId
    }

    const deleteAccessory = (event) => {
        const accessoryId = event.target.getAttribute('accessory');
        console.log(accessoryId)
        if(accessoryId) {
            axios.delete(`http://localhost:3001/accessories/delete/${accessoryId}`)
            .then(res => {
                if(res.status === 200) {
                    props.history.push('/accessories');
                }
            })            
        }    
    }

    const displayAccessories = () => {
        if(!accessories || (accessories && accessories.length === 0)) {
            return (<p className="message">Not Found</p>)
        } else if(accessories.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {            
            return accessories.map(accessory => {                
                const accessoryId = accessory._id;

                if(accessoryId === props.match.params.id) {
                    const price = accessory.price.toFixed(2);
                    let isAuthorized = isAdmin;
                    if(accessory && accessory.author && accessory.author  && accessory.author === userId) {
                        isAuthorized = true;
                    }
                    
                    return (
                        <section className="accessory accessory-details" key={accessoryId}>
                            <h1>{accessory.title}</h1>
                            <img src={accessory.url} alt={accessory.title} />
                            <p>{accessory.description}</p>
                            <h2>{price}&#x24;</h2>
                            {
                                Cookie.get('token') ? <IoMdAddCircle className="submit-btn" onClick={()=>stt.addNew(accessory)}>Add To Cart</IoMdAddCircle> : null
                            }
                            {                            
                                isAuthorized ? <MdDelete className="submit-btn" accessory={accessoryId} onClick={deleteAccessory} /> : null
                            }                            
                        </section>         
                    );                    
                }
                return null;
            });
        }
    }

    return (
        displayAccessories()
    );
}

export default AccessoryDetails;