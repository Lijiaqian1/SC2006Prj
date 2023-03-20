import React from 'react';

import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import './Map.css';

const Map = () => {
    const{isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyDmxoahopqb0E8q4PF8KqOft6Q0uRNQJEU"});

    if(!isLoaded){
        return <div>Loading</div>
    }
    return(
        <div>
            <Map />
        </div>
    )

    function Map(){
        return <GoogleMap
                 zoom={10}
                 center={{lat:44,lng:-80}} mapContainerClassName="map-container"></GoogleMap>
    }
}

export default Map;