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

    const [accessory, setAccessory] = useState();

    useEffect(() => {
        accessoriesService.loadAccessoryById(accessoryId)
            .then(acc => {                
                setAccessory(acc);
            });
    }, [accessoryId]);

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

    const displayAccessory = () => {
        if(!accessory) {
            return (<p className="message">Not Found</p>)
        } else if(accessory.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {            
            const price = accessory.price.toFixed(2);                        
                
            let isAuthorized = isAdmin;
            if(accessory.author === userId) {
                isAuthorized = true;
            }
                    
            return (
                <section className="accessory accessory-details" key={accessoryId}>
                    <h1>{accessory.title}</h1>
                    <img src={accessory.url} alt={accessory.title} />
                    <p>{accessory.description}</p>
                    <h2>&#x24;{price}</h2>
                    {
                        Cookie.get('token') ? <IoMdAddCircle className="submit-btn" onClick={()=>stt.addNew(accessory)}>Add To Cart</IoMdAddCircle> : null
                    }
                    {                            
                        isAuthorized ? <MdDelete className="submit-btn" accessory={accessoryId} onClick={deleteAccessory} /> : null
                    }                            
                </section>         
            );               
        }
    }

    return (
        displayAccessory()
    );
}

export default AccessoryDetails;