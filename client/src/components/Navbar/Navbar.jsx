import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { IoIosMenu } from "react-icons/io";
import './index.css';
import AuthContext from '../../contexts/AuthContext';
import Dropdown from './Dropdown';

class Navbar extends Component {
  static contextType = AuthContext;

  state = {
    isOpen: false
  }

  handleClick = () => {
    const isOpen = this.state.isOpen;
    this.setState({ isOpen: !isOpen });
  }

  logout = () => {
    const { logout } = this.context;
    logout();
    Cookies.set('token', '');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('likedProductsIds');    
  }

  render() {
    return (
      <nav className="nav">
        <Link to="/" className="site-logo">LaptopShop</Link>
        <IoIosMenu className="menu-icon" onClick={this.handleClick} />
        {
          this.state.isOpen ?(
            <Dropdown isOpen={this.state.isOpen} logout={this.logout} />
          )
          :false
        }

        <ul>
          {
            true ?(
              <Fragment>              
                <li><Link to="/laptops">Laptops</Link></li>
                <li><Link to="/accessories">Accessories</Link></li>
                <li><Link to="/product/add">Add Product</Link></li>
                <li><Link to="/product/add">Add Accessories</Link></li>
                <li><Link to="" onClick={this.logout}>Logout</Link></li>
              </Fragment>
            )
            :(
              <Fragment>
                <li><Link to="/laptops">Laptops</Link></li>
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
}

export default Navbar;