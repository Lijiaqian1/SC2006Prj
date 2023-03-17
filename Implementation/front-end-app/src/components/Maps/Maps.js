import React from "react"
import { useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import '../Maps/Maps.css'

export default class Maps extends React.Component {
    render(){
        const {} = useLoadScript(googleMapsApiKey: "AIzaSyD-p0kwbAhzpsFvTp5UXJrH0YUlpTsnQzc" )
        return(
            <div>
                <div>
                <label class="form-label" for="specificSizeSelect"><b>Route Plan</b></label>
                </div>
                <div class="form-check">
                    <label class="form-label" for="specificSizeSelect"><b>Enter Locations</b></label>
                    <button type="submit" class="btn btn-primary">clear</button>
                </div>           
                <div class="col-auto" className = "text mt-4 text-center" >
                    <button type="submit" class="btn btn-primary">+</button>
                </div>
                <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.709334497477!2d103.68309621453858!3d1.3509339990147111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da0fa0ce327a9b%3A0x9706832ebc3bb44a!2sNTU%20Hall%20of%20Residence%208%20(Hall%208)!5e0!3m2!1sen!2ssg!4v1679062252751!5m2!1sen!2ssg" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        )
    }
}
