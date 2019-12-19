import { gql } from 'apollo-boost';

const getLaptopsQuery = gql`
    {
        laptops{
            id
            model
            url
            description
            price
            
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
        }
    }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name id
                }
            }
        }
    }
`;

export {
    getLaptopsQuery,
    getAccessoriesQuery,
    addBookMutation,
    getBookQuery
};