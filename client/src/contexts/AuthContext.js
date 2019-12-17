import React, { Component, createContext } from 'react';
import Cookie from 'js-cookie';

export const AuthContext = createContext({});

class AuthContextProvider extends Component {
    state = {
        isAuthenticated: Cookie.get('token') && Cookie.get('token').length,        
        username: Cookie.get('username'),
        token: Cookie.get('token'),
        userId: Cookie.get('userId')
    }   

    logout = () => {
        this.setState({ isAuthenticated: false, username: '', userId: '', token: '' });
    }

    login = () => {        
        this.setState({ isAuthenticated: true });
    }    

    render() {
        return (
            <AuthContext.Provider value={{ ...this.state, logout: this.logout, login: this.login }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;