import React from 'react';
import './NavigationBar.css';
import {NavLink, useNavigate} from 'react-router-dom';

const NavigationBar = () => {
    const auth = localStorage.getItem('user');
    const Navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        Navigate('/');
    }
    return(
        <>
             <nav className="navbar navbar-expand-lg " id="navBar">
            <div className="container-fluid">
            <NavLink to = "/" className="navbar-brand">
                <img src='./CCRentals.png' alt='CCRentals' width ="200"height="35"></img>
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse nav justify-content-end" id="navbarSupportedContent">
                <ul className="nav justify-content-end d-flex">
                    <li className="nav-item">
                        <NavLink to="/search" className="nav-link" id="nav-desc" aria-current="page">Search</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to ="/about"className="nav-link" id="nav-desc">About Us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/help" className="nav-link" id="nav-desc">FAQ</NavLink>
                    </li>
                    <li className="nav-item">
                        {auth? <NavLink onClick={logout} to="/"><button type="button" className="btn btn-primary" id="orange-btn">Logout</button></NavLink>: 
                        <NavLink to="/login"><button type="button" className="btn btn-primary" id="orange-btn">Login</button></NavLink>}
                    </li>
                </ul>
            </div>
            </div>
        </nav>

        </>
       

    )

};

export default NavigationBar;

