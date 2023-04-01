import React from 'react';
import { useMemo, useState } from 'react';
import {GoogleMap, useLoadScript, MarkerF} from '@react-google-maps/api';
import {Loader} from "@googlemaps/js-api-loader";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
import "@reach/combobox/styles.css";
import './Map.css';

const Map = () => {

    const{isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDmxoahopqb0E8q4PF8KqOft6Q0uRNQJEU",
        libraries: ['places']
    });

    if(!isLoaded){
        return <div>Loading</div>
    }

    console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
    return(
        <div>
            <Maps />
        </div>
    )
    }

    function Maps(){

        const center = useMemo(() => ({ lat: 1.3521, lng: 103.8198 }), []);
        const [selected, setSelected] = useState(null);
      
        return (
          <>
            <div className="places-container">
              <PlacesAutocomplete setSelected={setSelected} />
            </div>
      
            <GoogleMap
              zoom={10}
              center={center}
              mapContainerClassName="map-container"
            >
              {selected && <MarkerF position={selected} />}
            </GoogleMap>
          </>
        );
      }
      
      const PlacesAutocomplete = ({ setSelected }) => {
        const {
            ready,
            value,
            setValue,
            suggestions: {status,data},
            clearSuggestions,
        } = usePlacesAutocomplete();

        const handleSelect = async(address) => {
            setValue(address,false);
            clearSuggestions();

            //Converting address string to lng and lat
            const results = await getGeocode({address});
            console.log(results);

            const {lat,lng} = getLatLng(results[0]);
            setSelected({lat,lng});


        }

        return(
            <Combobox onSelect={handleSelect}>
                <ComboboxInput value={value} onChange={e=>setValue(e.target.value)} disabled={!ready}
                className="combobox-input" placeholder="Search an address" />
                <ComboboxPopover>
                    <ComboboxList>
                        {status==="OK" && data.map(({place_id,description}) => <ComboboxOption key={place_id} value={description}/>)}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>

        )
       
        
      
    }

export default Map;