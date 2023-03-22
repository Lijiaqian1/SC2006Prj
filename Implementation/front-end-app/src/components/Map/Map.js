import React from 'react';
import { useMemo } from 'react';
import {GoogleMap, useLoadScript, MarkerF} from '@react-google-maps/api';
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

        const center = useMemo(()=> ({lat:1.3526,lng:103.8352}),[]);
        return (
                <GoogleMap
                 zoom={10}
                 center={center} mapContainerClassName="map-container">

                    <MarkerF position={center} />
                 </GoogleMap>
        )
    }
}

export default Map;