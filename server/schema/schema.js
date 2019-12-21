const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLList, GraphQLInt } = graphql;
const Laptop = require('../models/Laptop');
const Accessory = require('../models/Accessory');
const User = require('../models/User');
const Checkout = require('../models/Checkout');

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
                return User.findById(parent.author);
            }
        }
    })
});

const CheckoutType = new GraphQLObjectType({
    name: 'Checkout',
    fields: () => ({
        id: { type: GraphQLID },
        productName: { type: GraphQLString },
        url: { type: GraphQLString },
        price: { type: GraphQLFloat },
        quantity: { type: GraphQLInt },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return User.findById(parent.author);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        username: { type: GraphQLString }        
    })
});

const AccessoryType = new GraphQLObjectType({
    name: 'Accessory',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        author: {
            type: AuthorType,
            resolve(parent, args) {                
                return User.findById(parent.author);
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
        accessory: {
            type: AccessoryType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Accessory.findById(args.id);
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
        },
        accessories: {
            type: new GraphQLList(AccessoryType),
            resolve(parent, args) {
                return Accessory.find();
            }
        },
        checkouts: {
            type: new GraphQLList(CheckoutType),
            resolve(parent, args) {
                return Checkout.find();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery    
});