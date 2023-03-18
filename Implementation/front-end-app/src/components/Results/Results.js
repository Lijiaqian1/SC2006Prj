import React from 'react';
import {useState} from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Results/Results.css';
import ResultComponent from '../ResultComponent/ResultComponent';
import { Outlet } from 'react-router-dom';

const Results = () => {

  const Cars = {
    imageSrc: '',
    name: 'Mini Cooper',
    location: 'Nanyang Avenue 24, 639811',
    price: 'SGD 45',
    noOfSeats: '4',
    transmission: 'Automatic',
  }


  const CarArray = [Cars];

    const [selectedDate,setSelectedDate] = useState(null);
    const [location, setLocation] = useState('');
    const [estimateTime, setEstimateTime] = useState('');
    const [typeofcar, setTypeofcar] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(location, estimateTime, typeofcar, selectedDate);
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

    <ResultComponent carsdata = {Cars}/>

    </div>

)


}

export default Results; 