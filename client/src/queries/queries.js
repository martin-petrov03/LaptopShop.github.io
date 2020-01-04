import { gql } from 'apollo-boost';


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