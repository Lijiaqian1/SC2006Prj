import React from 'react';
import './NavigationBar.css';
import {NavLink} from 'react-router-dom';

function NavigationBar(){
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
                        <NavLink to="/help" className="nav-link" id="nav-desc">Help</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login"><button type="button" class="btn btn-primary" id="orange-btn">Login</button></NavLink>
                        
                    </li>
                </ul>
            </div>
            </div>
        </nav>

        </>
       

    )

};

export default NavigationBar;

