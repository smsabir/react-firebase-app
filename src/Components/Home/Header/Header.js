import React, { useContext } from 'react';
import './Header.css';
import logo from '../../../images/logo.gif';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../../App';
import { handleSignOut, initializeLoginFramework } from '../../Login/LoginManager';
const Header = () => {
    let history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const signOut = () => {
        handleSignOut()
        .then(res => {
            handleResponse(res, false);
        });
    }

    const handleResponse = (res, redirect) => {
        setLoggedInUser(res);
        redirect ? history.replace(from) : history.replace();
    }
    
    return (
        <div className="header-part">
                <img src={logo} className="logo" alt=""/>
            <div className="menu">
                <Link to="/home">Home</Link>
                <Link to="/destination">Destination</Link>
                <Link to="#">Blog</Link>
                <Link to="#">Contact</Link>
                {
                  loggedInUser.email? <Link onClick={signOut} id="button">{loggedInUser.displayName || loggedInUser.name || "New User"} &nbsp; <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </Link> : <Link to="/login" id="button">Login</Link>
                }
            </div>
            
        </div>
    );
};

export default Header;