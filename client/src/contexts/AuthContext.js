import React, { Component, createContext } from 'react';

export const AuthContext = createContext({});

class AuthContextProvider extends Component {
    state = {
        isAuthenticated: false,
        isAdmin: false
    }

    logout = () => {
        this.setState({ isAuthenticated: false });
    }

    login = (isAdmin) => {
        if(isAdmin) {
            this.setState({ isAdmin: true });
        }
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