import React from 'react';
import './Home.css'
import NavigationBar from '../NavigationBar/NavigationBar.js';
import {NavLink,useNavigate} from 'react-router-dom';
const Home = () => {
        const auth = localStorage.getItem('user');
        const Navigate = useNavigate();

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
