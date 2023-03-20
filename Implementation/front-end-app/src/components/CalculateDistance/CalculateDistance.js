import React from 'react';
import GoogleMapReact from 'google-map-react';
import './CalculateDistance.css';



const CalculateDistance = () => {

    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };



    return (
        <div className="google-map" style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact 
                bootstrapURLKeys = {{key: 'AIzaSyDmxoahopqb0E8q4PF8KqOft6Q0uRNQJEU'}}
                defaultCenter = {defaultProps.center}
                defaultZoom = {defaultProps.zoom}
            >

            </GoogleMapReact>
        </div>
    )
}

export default CalculateDistance;