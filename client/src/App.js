import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Laptops from './components/Laptops/Laptops';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
// import Error from './pages/Error';
import AddLaptop from './components/AddLaptop/AddLaptop';
import AddAccessories from './components/AddAccessories/AddAccessories';
import Navbar from "./components/Navbar/Navbar";
import Accessories from './components/Accessories/Accessories';

//apollo setup
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
})

function App() {
  return (    
    <ApolloProvider client={client}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Laptops} />
        <Route exact path="/accessories" component={Accessories} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/laptops/add" component={AddLaptop} />
        <Route exact path="/accessories/add" component={AddAccessories} />
        {/* <Route component={Error} /> */}
      </Switch>
    </ApolloProvider>    
  );
}

export default App;