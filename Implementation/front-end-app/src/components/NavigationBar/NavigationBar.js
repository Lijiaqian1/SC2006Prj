import React from 'react';
import './NavigationBar.css';

function NavigationBar(){
    return(
        <>
             <nav className="navbar navbar-expand-lg " id="navBar">
            <div className="container-fluid">
            <a to = "/" className="navbar-brand">
                <img src='./CCRentals.png' alt='CCRentals' width ="200"height="35"></img>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse nav justify-content-end" id="navbarSupportedContent">
                <ul className="nav justify-content-end d-flex">
                    <li className="nav-item">
                        <a to="/" className="nav-link" id="nav-desc" aria-current="page">Reviews</a>
                    </li>
                    <li className="nav-item">
                        <a to ="/"className="nav-link" id="nav-desc">About Us</a>
                    </li>
                    <li className="nav-item">
                        <a to="/" className="nav-link" id="nav-desc">Help</a>
                    </li>
                    <li className="nav-item">
                        <a to="/"><button type="button" class="btn btn-primary" id="orange-btn">Login</button></a>
                        
                    </li>
                </ul>
            </div>
            </div>
        </nav>

        </>
       

    )

};

export default NavigationBar;

