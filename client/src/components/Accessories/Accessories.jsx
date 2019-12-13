import React from 'react';
import { graphql } from 'react-apollo';
import Accessory from './Accessory';
import './index.css';
import { getAccessoriesQuery } from '../../queries/queries';

const Accessories = (props) => {
    return (
        <main className="accessories-container">            
            {                                  
                <Accessory data={props.data} />
            }       
        </main>
    );    
}

export default graphql(getAccessoriesQuery)(Accessories);