import React from 'react';
import './NavigationBar.css';


class NavigationBar extends React.Component{
    render(){
        return(
            <nav class="navbar navbar-expand-lg " id="navBar">
                <div class="container-fluid">
                <a class="navbar-brand" href="/Home">
                    <img src='./CCRentals.png' alt='CCRentals' width ="200"height="35"></img>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse nav justify-content-end" id="navbarSupportedContent">
                    <ul class="nav justify-content-end d-flex">
                        <li class="nav-item">
                            <a class="nav-link" id="nav-desc" aria-current="page" href="/reviews">Reviews</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="nav-desc" href="/aboutUs">About Us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="nav-desc" href="/help">Help</a>
                        </li>
                        <li class="nav-item">
                            <a href="/login"><button type="button" class="btn btn-primary" id="orange-btn">Login</button></a>
                            
                        </li>
                    </ul>
                </div>
                </div>
            </nav>

    

                
        )
    }
}

export default NavigationBar;