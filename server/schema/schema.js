const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLList, GraphQLNonNull } = graphql;
const Laptop = require('../models/Laptop');
const User = require('../models/User');

const LaptopType = new GraphQLObjectType({
    name: 'Laptop',
    fields: () => ({
        id: { type: GraphQLID },
        model: { type: GraphQLString },
        url: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        author: {
            type: AuthorType,
            resolve(parent, args) {                
                return User.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        myLaptops: {
            type: new GraphQLList(LaptopType),
            resolve(parent, args) {
                return Laptop.findById( parent.id );
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        laptop: {
            type: LaptopType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {                
                return Laptop.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        laptops: {
            type: new GraphQLList(LaptopType),
            resolve(parent, args) {
                return Laptop.find();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery    
});