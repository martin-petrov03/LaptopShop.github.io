import { gql } from 'apollo-boost';

const getLaptopsQuery = gql`
    {
        laptops{
            id
            model
            url
            description
            price
            author{
                id
                username
                email
            }        
        }        
    }
`;

const getAccessoriesQuery = gql`
    {
        accessories {
            id
            title
            url
            description
            price
            author{
                id
                username
                email
            }
        }
    }
`;

const getCheckoutsQuery = gql`
    {
        checkouts {
            id,
            productName,
            url,
            price,
            quantity,
            author {
                id,
                username
                email      
            }
        }
    }
`;

export {
    getLaptopsQuery,
    getAccessoriesQuery,
    getCheckoutsQuery
};