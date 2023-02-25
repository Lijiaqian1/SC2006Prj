import React from 'react';
import './Home.css'
import NavigationBar from '../NavigationBar/NavigationBar';
import {NavLink} from 'react-router-dom';
class Home extends React.Component{
    render(){
        return(
            <div className="d-grid gap-5">
              <div>
                <img src = "./CCRentals.png" alt="CCRentals"  className = "img-fluid mx-auto d-block margin-top"/>
              </div>
              
                <NavLink to="/search" className="d-grid gap-2 col-3 mx-auto mt-5">
                  <button className="btn btn-success p-3 rounded-pill" type="button">Start Searching!</button>
                </NavLink>

            </div>
        )
    }
}

export default Home;
