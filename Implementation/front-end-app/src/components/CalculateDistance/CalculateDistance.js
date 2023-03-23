import React from 'react';
import {GoogleMap, useLoadScript} from '@react-google-maps/api';
import './CalculateDistance.css';
import Map from '../Map/Map';
import ListofRoutes from '../ListofRoutes/ListofRoutes';


const CalculateDistance = () => {

    return(

        <div className="flex-container">
            <div className="flex-child-left"><ListofRoutes /></div>
            <div className="flex-child-right"><Map /></div>
        </div> 

        
        
        
    )





}
 
    


export default CalculateDistance;