import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dropdown.css';
import AuthContext from '../../contexts/AuthContext';

class Dropdown extends Component {
  static contextType = AuthContext;  

  render() {
    if(!this.props.isOpen) {
        return false;
    }
    return (  
        <header>
            {
                this.context.isAuthenticated ?(
                    <div class="links">      
                        <li><Link to="/laptops">Laptops</Link></li>
                        <li><Link to="/accessories">Accessories</Link></li>
                        <li><Link to="/product/add">Add Product</Link></li>
                        <li><Link to="/product/add">Add Accessories</Link></li>
                        <li><Link to="" onClick={this.props.logout}>Logout</Link></li>
                    </div>
                )
                :(
                    <div className="links">
                        <li><Link to="/laptops">Laptops</Link></li>
                        <li><Link to="/accessories">Accessories</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </div>
                )
            }
        </header>
    );        
  }  
}

export default Dropdown;