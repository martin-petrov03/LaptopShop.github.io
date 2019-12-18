import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from "react-icons/fa";
import { graphql } from 'react-apollo';
import './index.css';
import { getAccessoriesQuery } from '../../queries/queries';

const AccessoryDetails = (props) => {
    const displayAccessories = () => {
        const data = props.data;
        if(!data || (data.accessories && data.accessories.length === 0)) {
            return (<p className="message">Not Found</p>)
        } else if(data.loading) {
            return (<section className="message"><FaSpinner /></section>);
        } else {
            return data.accessories.map(accessory => {
                const price = accessory.price.toFixed(2);
                if(accessory.id == props.match.params.id) {
                  return (
                    <main className="accessories-container">
                      <section className="accessory" key={accessory.id}>
                          <h1>{accessory.title}</h1>
                          <img src={accessory.url} alt={accessory.title} />
                          <p>{accessory.description}</p>
                          <h2>{price}&#x24;</h2>
                          <button>Add To Cart</button>
                          <button>Delete</button>
                      </section>
                    </main>
                  );
                }
            });
        }
    }

    return (
        displayAccessories()
    );
}

export default graphql(getAccessoriesQuery)(AccessoryDetails);