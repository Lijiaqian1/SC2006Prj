import React from 'react';
import {useState,useEffect} from 'react';
import '../Search/Search.css';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Results/Results.css';
import {format} from 'date-fns';
import {NavLink,useNavigate} from 'react-router-dom';

const Search = () => {

  const Navigate = useNavigate();
  const [selectedDate,setSelectedDate] = useState(null);
  const [location, setLocation] = useState('');
  const [estimateTime, setEstimateTime] = useState('');
  const [typeofcar, setTypeofcar] = useState('All');

  const [carsResults, setCarResults] = useState([]);
  const [doneResults, setDoneResults] = useState(null);

  useEffect(() => {
    localStorage.setItem('carsResults',JSON.stringify(carsResults));
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedDate,location,estimateTime,typeofcar);

    //Time formatting 
    //Correct date formatting
    let dateformatting = format(new Date(selectedDate), 'yyyy-MM-dd');
    //Time formatting
    let timeformatting = (selectedDate.toLocaleTimeString("en-GB")).substring(0,2);
    console.log(dateformatting);
    console.log(timeformatting);

    let intDuration = parseInt(estimateTime);
    console.log(intDuration);

    let result = await fetch("http://localhost:5000/search", {
      method: 'POST',
      body: JSON.stringify({
        location : location,
        pickupdate : dateformatting,
        pickuptime : timeformatting,
        duration : intDuration
      }),
      headers:{
        'Content-type' : 'application/json'
      }
    });

    result = await result.json();
    //console.log(result);

    if(result){
      setCarResults(result);
      console.log(carsResults);
      localStorage.setItem('carsResults',JSON.stringify(result));
      
      Navigate('/results');
    }

  }


       return(
        <div style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL + '/Background.png'})` ,
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
          backgroundSize: 'cover'
        }} className="position-relative">

          <form className="vw-100 position-absolute top-50 start-50 translate-middle background-darkblue text-emphasis-dark px-5 py-2"
          >
            <div className="row">

            <div className="col-4">
              <label for="Location">Pickup Location</label>
              <input type="text" className="form-control" id="specificSizeInputName" placeholder="Jurong West Street 61"
              value = {location} onChange={(e)=>setLocation(e.target.value)}/>
            </div>

            
            <div className="datepicker col-4 d-inline">
                <label for="specificSizeInputGroupUsername">Pickup Date and Time</label>
                <Datepicker wrapperClassName='datepicker'
                  showIcon
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  dateFormat = "yyyy-MM-dd  EE hh:mm a"
                  timeIntervals = {60}
                  minDate={new Date()}
                  showTimeSelect
                />
          </div>

            <div className="row">
              <div class="col-4">
                <label for="specificSizeSelect">Type of Car</label>
                <select class="form-select" id="specificSizeSelect"
                  value={typeofcar} onChange={(e)=>setTypeofcar(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Standard">Standard</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div className="input-group col mt-4">
            <input type="number" class="form-control" placeholder="Estimated Duration (In hours)" aria-label="Recipient's username" aria-describedby="button-addon2"
              value = {estimateTime} onChange={(e)=>setEstimateTime(e.target.value)}/>
              <NavLink to='/calculatedistance'>
              <button class="btn btn-dark" type="button" id="button-addon2">Calculate</button>
              </NavLink>
          </div>

            </div>
            

            </div>
            
            <div className="row mt-4 justify-content-center">
              <div className="col-auto">
                  <button onClick = {handleSubmit} type="submit" className="btn btn-primary px-5" >Submit</button>
              </div>
            </div>

          <div className = "row mt-4 justify-content-center">
            <div className="col-auto">
                <button type="submit" className="btn btn-primary px-5">Save Location</button>
            </div>
          </div>
          

          </form>

        </div>

        
      
       )
    
}

export default Search; 
