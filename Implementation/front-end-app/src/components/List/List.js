import React from 'react';
import {useState,useRef} from 'react';
import Card from 'react-bootstrap/Card';
import '../ListofRoutes/ListofRoutes.css';

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


const List = () => {
    /*const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDmxoahopqb0E8q4PF8KqOft6Q0uRNQJEU",
        libraries: ["places"]
    });*/

    const {
      ready,
      value,
      setValue,
      suggestions: {status,data},
      clearSuggestions,
  } = usePlacesAutocomplete();

  const [duration,setDuration] = useState(null);

  const [todos, setTodos ] = useState(null);


  //HANDLE CALCULATE DOSEN"T WORK
  const handleCalculate = async(e) => {
    e.preventDefault();

    console.log("Calculating");
    let totalTime = 0;
  
    console.log(todos.length);
    let length = todos.length;

    if(length < 2){
      alert("Add more routes before calculating the distance!")
    }

    else{

      for(let i = 0; i<length-1; i++){

        let startinglocation = todos[i];
        let endinglocation = todos[i+1];

        const directionsService = new window.google.maps.DirectionsService();
        const directionRequest = {
          origin: startinglocation,
          destination: endinglocation,
          travelMode: 'DRIVING'
        };
    
        directionsService.route(directionRequest, (result,status) => {
          if(status==='OK'){
            const legs = result.routes[0].legs;
            const totalDuration = legs.reduce((total,leg) => total + leg.duration.value,0);
            console.log("Duration in seconds");
            console.log(totalDuration);
            let durationMinutes = Math.round(totalDuration/60);
            console.log("Duration in minutes");
            console.log(durationMinutes);
            console.log("totalDuration");
            totalTime = totalTime + durationMinutes;
            console.log(totalTime);
            setDuration(totalTime);
          }
          else{
            console.log("ERROR");
          }
        });

        
      }

  }

    
  }


  const handleSelect = async(address) => {
    setValue(address,false);
    clearSuggestions();
  }


    

    const handleAddTodo = async(e) => {
        e.preventDefault(); 
        console.log("ADD");

        const newTodo = value;
        setTodos([...todos,newTodo]);

        //setValue('');
        
    };

    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index,1);
        setTodos(newTodos);
    }

    return (
      <div>
      <div className="card routeHeader">
        <div className="card-body">
            <h3>Route Plan</h3>
        </div>
    </div>
      <form onSubmit={handleAddTodo}>
        <div className="input-group mb-4 mx-2" style={{width: '30rem'}}>
            <Combobox onSelect = {handleSelect}>
              <ComboboxInput value={value} onChange={e=>setValue(e.target.value)} disabled={!ready}
              className="combobox-input" placeholder="Search an address"></ComboboxInput>
              
              <ComboboxPopover>
                  <ComboboxList>
                      {status==="OK" && data.map(({place_id,description}) => <ComboboxOption key={place_id} value={description}/>)}
                  </ComboboxList>
              </ComboboxPopover>
              
          </Combobox>
            {/*<input type="text" className="form-control autocompleteText" placeholder="Enter Route" aria-label="Enter Route" name="todo"/>*/}
            <button className="btn btn-info" type="submit">Add</button>
        </div>
      </form>
      <ul style={{listStyle:"none"}}>
        {todos.map((todo, index) => (
          <li key={index}>
            <div className="card mb-4 sizeofCard" style={{width:'24rem'}}>
                <div className="card-body position-relative">
                    <div className="indexName d-inline">
                        {index + 1}
                    </div>
                    <p className="d-inline todo-label position-absolute top-50 start-50 translate-middle">{todo}</p>
                    
                    
                    <button className="deletebutton position-absolute top-50 end-0 translate-middle-y mx-2"onClick={() => handleDeleteTodo(index)}>Delete</button>
                </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="position-relative">
      <button type="submit" className="btn btn-primary calculateButton" onClick = {handleCalculate}>Calculate Duration!</button>
      </div>


    </div>
      );
}



    
    

export default List;