import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Laptops from './components/Laptops/Laptops';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AddLaptop from './components/AddLaptop/AddLaptop';
import AddAccessories from './components/AddAccessories/AddAccessories';
import Navbar from "./components/Navbar/Navbar";
import Accessories from './components/Accessories/Accessories';
import AccessoryDetails from './components/Accessories/AccessoryDetails';
import LaptopDetails from './components/Laptops/LaptopDetails';
import Checkouts from './components/Checkouts/Checkouts';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Fragment>    
      <Navbar />
      <Switch>
        <Route exact path="/" component={Laptops} />
        <Route exact path="/accessories" component={Accessories} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/laptops/add" component={AddLaptop} />
        <Route exact path="/accessories/add" component={AddAccessories} />
        <Route exact path="/accessories/:id" component={AccessoryDetails} />
        <Route exact path="/laptops/:id" component={LaptopDetails} />
        <Route exact path="/checkouts/all" component={Checkouts} />
        <Route exact path="/shopping-cart" component={ShoppingCart} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
}

export default App;