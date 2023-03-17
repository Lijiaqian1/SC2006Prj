import React from 'react';
import '../Search/Search.css'

const Search = () => {

        const myStyle={
            backgroundImage:`url(${process.env.PUBLIC_URL+ "/SearchPage.png"})`
        };

        return(
            <div className = "body" style={myStyle} backgroundRepeat = "no-repeat">
                <div className = "b" style = {{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,128,0.3)'}}>
    
                  <form class="row gx-3 gy-2 align-items-center">
                    <div class="col-sm-3">
                      <label class="form-label" for="specificSizeInputName"><b>Pick-up Location</b></label>
                      <input type="text" class="form-control" id="specificSizeInputName" placeholder="Pick-up Location"></input>
                    </div>
                    <div class="col-sm-3">
                      <label class="form-label" for="specificSizeInputGroupUsername"><b>Pick-up Time</b></label>
                      <div class="input-group">
                      <input type="text" class="form-control" id="specificSizeInputGroupUsername" placeholder="Date"></input>
                        <input type="text" class="form-control" id="specificSizeInputGroupUsername" placeholder="Time"></input>
                      </div>
                    </div>
                    <div class="col-sm-3">
                        <label class="form-label" for="specificSizeSelect"><b>Type of Car</b></label>
                        <select class="form-select" id="specificSizeSelect">
                           <option selected>Type</option>
                           <option value="1">One</option>
                           <option value="2">Two</option>
                           <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="col-auto">
                        <div class="form-check">
                           <label class="form-label" for="specificSizeSelect"><b>Estimated Duration</b></label>
                           <input style = {{width: 100}} type="text" class="form-control" id="specificSizeInputGroupUsername" placeholder="Time"></input>
                           <button type="submit" class="btn btn-primary">Calculate</button>
                        </div>
                    </div>
                    <div class="col-auto" className = "text mt-4 text-center" >
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
                  </form>
                </div>
            </div>
        )
    
}

export default Search; 
