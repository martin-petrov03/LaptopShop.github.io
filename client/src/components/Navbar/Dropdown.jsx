import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './dropdown.css';
import { AuthContext } from '../../contexts/AuthContext';

const Dropdown = (props) => {
    const context = useContext(AuthContext);

    return (
        <header id="drop-down">
            <div role="navigation">
                <div id="menuToggle">    
                    <input type="checkbox" />
                    
                    <span></span>
                    <span></span>
                    <span></span>
                        
                    <ul id="menu">
                    {
                        context.isAuthenticated ?(
                            <Fragment>
                                <li><Link to="/">Laptops</Link></li>
                                <li><Link to="/accessories">Accessories</Link></li>
                                {props.isAdmin()}
                                <li><Link to="/shopping-cart">Shopping Cart</Link></li>
                                <li><Link to="" onClick={props.logout}>Logout</Link></li>
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
                </div>
            </div>        
        </header>
    );    
}

export default Dropdown;