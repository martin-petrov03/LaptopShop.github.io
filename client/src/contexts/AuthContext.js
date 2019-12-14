import React, { Component, createContext } from 'react';
import Cookie from 'js-cookie';

export const AuthContext = createContext({});

class AuthContextProvider extends Component {
    state = {
        isAuthenticated: false,
        isAdmin: false,
        username: '',
        token: '',
        userId: ''
    }

    setData = () => {
        const username = Cookie.get('username');
        const userId = Cookie.get('userId');
        const token = Cookie.get('token');

        this.setState({ username, userId, token });
    }

    logout = () => {
        this.setState({ isAuthenticated: false, username: '', userId: '', token: '' });
    }

    login = () => {
        if(Cookie.get('isAdmin')) {
            this.setState({ isAdmin: true });
        }
        this.setState({ isAuthenticated: true });
    }

    render() {
        return (
            <AuthContext.Provider value={{ ...this.state, logout: this.logout, login: this.login, setData: this.setData }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthContextProvider;