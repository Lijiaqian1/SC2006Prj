import React from 'react';

class NavigationBar extends React.Component{
    render(){
        return(
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Reviews</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Help</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled">Login</a>
                </li>
            </ul>        
        )
    }
}

export default NavigationBar;