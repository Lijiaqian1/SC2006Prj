import React from 'react';
import './Home.css'
import NavigationBar2 from '../NavigationBar/NavigationBar2';
class Home extends React.Component{
    render(){
        return(
            <div>
              <header>
              <NavigationBar1/>
              </header>
              <img src = "./CCRentals.png" alt="CCRentals"  className = "image-logo"/><br></br>
              <footer>
               <a to="/"><button type="button" class="btn btn-primary position-absolute w-25 p-3 top-50 start-50 translate-middle mt-5 " id="orange-btn">Compare</button></a>
               </footer>
            </div>
        )
    }
}

export default Home;
