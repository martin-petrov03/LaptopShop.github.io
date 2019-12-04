const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');

require('./database/database')();
const port = 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/laptops', productsRoutes);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// General error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
  next();
})

module.exports = app.listen(port, () => { 
  console.log(`REST API listening on port: ${port}`) 
});