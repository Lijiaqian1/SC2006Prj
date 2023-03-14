import React from 'react';
import './Home.css'
import NavigationBar from '../NavigationBar/NavigationBar';
import {NavLink} from 'react-router-dom';
const Home = () => {
        const auth = localStorage.getItem('user');

        return(
            <div className="d-grid gap-5">
              <div>
                <img src = "./CCRentals.png" alt="CCRentals"  className = "img-fluid mx-auto d-block margin-top"/>
              </div>
              
                {auth? <NavLink to="/search" className="d-grid gap-2 col-3 mx-auto mt-5">
                  <button className="btn btn-success p-3 rounded-pill" type="button">Start Searching!</button> 
                </NavLink>:
                <NavLink to="/login" className="d-grid gap-2 col-3 mx-auto mt-5">
                <button className="btn btn-success p-3 rounded-pill" type="button">Login!</button> 
              </NavLink>}

            </div>
        )
    
}

export default Home;
