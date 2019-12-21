import React, { useContext } from 'react';
import axios from 'axios';
import { FaSpinner } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { graphql } from 'react-apollo';
import Cookie from 'js-cookie';
import './index.css';
import { getAccessoriesQuery } from '../../queries/queries';
import { AuthContext } from '../../contexts/AuthContext';

const AccessoryDetails = (props) => {
    const context = useContext(AuthContext);
    const userId = Cookie.get('userId');
    const isAdmin = Cookie.get('isAdmin');

    axios.defaults.headers = {
        'Content-Type': 'application/json',
        'token': context.token,
        'userId': context.userId
    }

    const deleteAccessory = (event) => {
        const accessoryId = event.target.getAttribute('accessory');        
        if(accessoryId === '') {
            return;
        }
        
        axios.delete(`http://localhost:3001/accessories/delete/${accessoryId}`)
        .then(res => {
            if(res.status === 200) {
                props.history.push('/accessories');
            }
        })        
    }

    const displayAccessories = () => {
        const data = props.data;        

        if(!data || (data.accessories && data.accessories.length === 0)) {
            return (<p className="message">Not Found</p>)
        } else if(data.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {            
            return data.accessories.map(accessory => {
                const accessoryId = accessory.id;

                if(accessoryId === props.match.params.id) {
                    const price = accessory.price.toFixed(2);
                    let isAuthorized = isAdmin;
                    if(accessory && accessory.author && accessory.author.id  && accessory.author.id === userId) {
                        isAuthorized = true;
                    }
                    
                    return (
                        <section className="accessory accessory-details" key={accessoryId}>
                            <h1>{accessory.title}</h1>
                            <img src={accessory.url} alt={accessory.title} />
                            <p>{accessory.description}</p>
                            <h2>{price}&#x24;</h2>
                            {
                                Cookie.get('token') ? <IoMdAddCircle className="submit-btn">Add To Cart</IoMdAddCircle> : null
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

export default graphql(getAccessoriesQuery)(AccessoryDetails);