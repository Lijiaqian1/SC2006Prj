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

    const handleBookmarks = async(e) => {
        e.preventDefault();
        const email = JSON.parse(localStorage.getItem('Email'));
        console.log(email);
    
        let result = await fetch("http://localhost:5000/retrieve", {
            method: 'POST',
            body: JSON.stringify({
                email: email,
            }),
            headers:{
                'Content-Type' : 'application/json'
              }
        });

        result = await result.json();

        if(result){
            console.log(JSON.stringify(result));
            localStorage.setItem('bookmarkPlaces', JSON.stringify(result));
            Navigate('bookmarks');
        }
        //console.log(result);
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
                        {auth? <NavLink to="/search" className="nav-link" id="nav-desc" aria-current="page">Search</NavLink> : <NavLink></NavLink>}
                    </li>
                    <li className="nav-item">
                        <NavLink to ="/about"className="nav-link" id="nav-desc">About Us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/help" className="nav-link" id="nav-desc">FAQ</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/bookmarks" onClick = {handleBookmarks} className="nav-link" id="nav-desc">Bookmarks</NavLink>
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

