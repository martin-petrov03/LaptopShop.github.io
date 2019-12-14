import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import Cookie from 'js-cookie';
import './index.css';
import { AuthContext } from '../../contexts/AuthContext';
import Dropdown from './Dropdown';

const Navbar = () => {
  const context = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);  

  const handleClick = () => {    
    setIsOpen(!isOpen);
  }

  const logout = () => {
    const { logout } = context;
    logout();
    Cookie.set('token', '');
    Cookie.set('username', '');
    Cookie.set('userId', '');
  }

  return (
    <nav className="nav">
      <Link to="/" className="site-logo">LaptopShop</Link>
      <IoIosMenu className="menu-icon" onClick={handleClick} />
      <div className="drop-down-content">
      {
        isOpen ?(
          <Dropdown isOpen={isOpen} logout={logout} />
        )
        :false
      }
      </div>

      <ul>
        {
          context.isAuthenticated ?(
            <Fragment>              
              <li><Link to="/">Laptops</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
              <li><Link to="/product/add">Add Product</Link></li>
              <li><Link to="/product/add">Add Accessories</Link></li>
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