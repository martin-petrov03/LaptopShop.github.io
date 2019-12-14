import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './dropdown.css';
import { AuthContext } from '../../contexts/AuthContext';

const Dropdown = (props) => {
    const context = useContext(AuthContext);
    
    if(!props.isOpen) {
        return false;
    }

    return (  
        <header className="drop-down">
            {
                context.isAuthenticated ?(
                    <div className="links">      
                        <li><Link to="/">Laptops</Link></li>
                        <li><Link to="/accessories">Accessories</Link></li>
                        <li><Link to="/laptops/add">Add Laptop</Link></li>
                        <li><Link to="/product/add">Add Accessories</Link></li>
                        <li><Link to="" onClick={props.logout}>Logout</Link></li>
                    </div>
                )
                :(
                    <div className="links">
                        <li><Link to="/">Laptops</Link></li>
                        <li><Link to="/accessories">Accessories</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </div>
                )
            }
        </header>
    );    
}

export default Dropdown;