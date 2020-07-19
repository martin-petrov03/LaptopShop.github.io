import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainLaptops from './components/Laptops/MainLaptops';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AddLaptop from './components/AddLaptop/AddLaptop';
import AddAccessories from './components/AddAccessories/AddAccessories';
import Navbar from "./components/Navbar/Navbar";
import MainAccessories from './components/Accessories/MainAccessories';
import AccessoryDetails from './components/Accessories/AccessoryDetails';
import LaptopDetails from './components/Laptops/LaptopDetails';
import MainCheckouts from './components/Checkouts/MainCheckouts';
import CheckoutDetails from './components/Checkouts/CheckoutDetails';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Fragment>    
      <Navbar />
      <Switch>
        <Route exact path="/" component={MainLaptops} />
        <Route exact path="/accessories" component={MainAccessories} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/laptops/add" component={AddLaptop} />
        <Route exact path="/accessories/add" component={AddAccessories} />
        <Route exact path="/accessories/:id" component={AccessoryDetails} />
        <Route exact path="/laptops/:id" component={LaptopDetails} />
        <Route exact path="/checkouts/all" component={MainCheckouts} />
        <Route exact path="/checkouts/:id" component={CheckoutDetails} />
        <Route exact path="/shopping-cart" component={ShoppingCart} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
}

export default App;