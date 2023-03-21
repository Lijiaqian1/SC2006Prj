import React from 'react';
import {useState} from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Results/Results.css';
import ResultComponent from '../ResultComponent/ResultComponent';
import ResultList from '../ResultList/ResultList';
import {format} from 'date-fns';
import {NavLink,useNavigate} from 'react-router-dom';


const Results = () => {

    const Navigate = useNavigate();

    /*Need to connect with backend to get dynamic result*/
    const Cars = {
      model: 'BMW',
      location: 'Nanyang Avenue 24, 639811',
      price: 'SGD 45',
      seats: '4',
      rent_company: 'CarLite',
    }

    const [selectedDate,setSelectedDate] = useState(null);
    const [location, setLocation] = useState('');
    const [estimateTime, setEstimateTime] = useState('');
    const [typeofcar, setTypeofcar] = useState('All');
    
    const CarArray = [Cars,Cars];
 

    
    /*Fetch function*/
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

      let result = await fetch("http://localhost:5000/scrape", {
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

      Navigate('/results');
    }

    return(
      <div>

      <form className="vw-100 background-darkblue text-emphasis-dark px-5 py-2" onSubmit={handleSubmit}>
      <div className="row mb-3">

      <div className="col-4">
        <label for="Location">Pickup Location</label>
        <input type="text" className="form-control" id="specificSizeInputName" placeholder="Jurong West Street 61"
        value = {location} onChange={(e)=>setLocation(e.target.value)}/>
      </div>

    
      <div className="datepicker col-4 d-inline">
                <label for="specificSizeInputGroupUsername">Pickup Date and Time</label>
                <Datepicker wrapperClassName='datepicker'
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  dateFormat = "MM/dd/yyyy  EE hh:mm a"
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
            <input type="text" class="form-control" placeholder="Estimated Duration (In hours)" aria-label="Recipient's username" aria-describedby="button-addon2"
              value = {estimateTime} onChange={(e)=>setEstimateTime(e.target.value)}/>
            <button class="btn btn-dark" type="button" id="button-addon2">Calculate</button>
          </div>

      </div>


      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-auto">
          <button type="submit" className="btn btn-primary px-5">Submit</button>
        </div>
      </div>

    </form>

    <ResultList CarArray = {CarArray}/>

  </div>
)


}

export default Results; 
