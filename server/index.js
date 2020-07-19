const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const authRoutes = require('./routes/auth');
const laptopsRoutes = require('./routes/laptops');
const checkoutsRoutes = require('./routes/checkouts');
const accessoriesRoutes = require('./routes/accessories');

require('./database/database')();
const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/laptops', laptopsRoutes);
app.use('/checkouts', checkoutsRoutes);
app.use('/accessories', accessoriesRoutes);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

module.exports = app.listen(port, () => { 
  console.log(`REST API listening on port: ${port}`) 
});