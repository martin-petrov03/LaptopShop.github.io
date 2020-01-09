# Laptop Shop

### Description

Laptop Shop it's a single page application (SPA) that lets you buy laptops and accessories. You can choose from wide range of products. When you are login you can also add your own products. 

### Tech

Laptop Shop uses a number of open source projects to work:
* [MongoDB](https://www.mongodb.com) - Free and open-source cross-platform document-oriented database
* [Mongoose](http://mongoosejs.com/index.html) - Elegant MongoDB object modeling for NodeJS
* [NodeJS](https://nodejs.org/en/) - Evented I/O for the backend
* [ExpressJS](https://expressjs.com) - Fast, unopinionated, minimalist web framework for NodeJS
* [JSONWebToken](https://jwt.io) - Used for authorization
* [ReactJS](https://reactjs.org) - A JavaScript library for building user interfaces

The aim of this project is to show how to build a full stack application with MERN stack. In this project I've used:

* JWT authentication
* Unit testing
* Rest API
* GraphQL
* React Hooks
* Context API

### Installation

Laptop Shop requires 
* [MongoDB](https://www.mongodb.com/download-center#community) v4.0.9+
* [NodeJS](https://nodejs.org/en/) v12.10.0+

Install MongoDB and start the database (port: 27017)

```sh
$ cd server
$ mongodb
```

Install the dependencies and start the server (port: 3001)

```sh
$ cd server
$ npm install
$ node index
```

Install the dependencies and start the client (port: 3000)

```sh
$ cd..
$ cd client
$ npm install
$ npm start
```

### Features

- Anonymous users
    - View all laptops and details about each one
    - View all accessories and details about each one    
    - Login/Register

- Authenticated users
    - Add your own laptop
    - Add your own accessory
    - Delete products, which you have created
    - Add products in shopping cart
    - Manage products in the shopping cart
    - Finish checkout

- Admin users    
    - Delete each product
    - View all checkouts
    - Complete checkout    

### Authors

* [Martin Petrov](https://github.com/martin-petrov03)

### License
----

MIT
