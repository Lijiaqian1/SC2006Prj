import React from 'react';
import {GoogleMap, useLoadScript} from '@react-google-maps/api';
import './CalculateDistance.css';
import Map from '../Map/Map';
import ListofRoutes from '../ListofRoutes/ListofRoutes';


const CalculateDistance = () => {

    return(
        <div>
            <ListofRoutes />
            <Map />
        </div>
        
        
        
    )





}
 
    


export default CalculateDistance;