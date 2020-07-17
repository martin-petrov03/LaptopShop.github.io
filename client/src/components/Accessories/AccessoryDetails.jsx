import React, { useState, useContext, useEffect } from 'react';
import { FaSpinner } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Cookie from 'js-cookie';
import './index.css';
import accessoriesService from '../../services/accessories-service';
import {listContext} from '../../contexts/ShoppingCart';

const AccessoryDetails = (props) => {    
    const stt = useContext(listContext);
    const accessoryId = props.match.params.id;
    const userId = Cookie.get('userId');
    const isAdmin = Cookie.get('isAdmin');

    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
        accessoriesService.loadAccessoryById(accessoryId)
            .then(acc => {
                console.log(acc);
                setAccessories(acc);
            });
    }, []);

    const deleteAccessory = (event) => {                
        if(accessoryId) {            
            accessoriesService.delete(accessoryId)
                .then((status) => {
                    if(status === 200 || status === 201) {
                        props.history.push('/accessories');
                    } else if (status === 401) {        
                        props.history.push('/login');
                        return;
                    }
                    props.history.push('/accessories');
                });
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