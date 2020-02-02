import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import './index.css';
import { AuthContext } from '../../contexts/AuthContext';
import Dropdown from './Dropdown';

const Navbar = () => {
  const context = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);  
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    update();
  });

  const update = () => {
    setWidth(window.innerWidth);
    if(width <= 1200) {
      setIsOpen(true);      
    }
  };  

  window.addEventListener("resize", update);  

  const logout = () => {
    const { logout } = context;
    logout();
    Cookie.set('token', '');
    Cookie.set('username', '');
    Cookie.set('userId', '');
    Cookie.set('isAdmin', '');
    Cookie.set('checkouts', {});
  }

  const isAdmin = () => {  
    if(Cookie.get('isAdmin')) {
      return <li><Link to="/checkouts/all">Checkouts</Link></li>;
    }
  }

  return (
    <nav className="nav">
      <Link to="/" className="site-logo">LaptopShop</Link>      
      <div className="drop-down-content">
      {
        isOpen 
        ?(          
          <Dropdown isAdmin={isAdmin} logout={logout} />
        )
        :null
      }
      </div>

      <ul>
        {
          context.isAuthenticated ?(
            <Fragment>
              <li><Link to="/">Laptops</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
              <li><Link to="/laptops/add">Add Laptop</Link></li>
              <li><Link to="/accessories/add">Add Accessories</Link></li>
              {isAdmin()}
              <li><Link to="/shopping-cart">Shopping Cart</Link></li>
              <li><Link to="" onClick={logout}>Logout</Link></li>
            </Fragment>
          )
          :(
            <Fragment>
              <li><Link to="/">Laptops</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </Fragment>
          )
        }
      </ul>
    </nav>
  );
}

export default Navbar;