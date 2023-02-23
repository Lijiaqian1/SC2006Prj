import React from 'react'
import './Enter OTP.css'
import NavigationBar2 from '../NavigationBar/NavigationBar2'


export default class EnterOTP extends React.Component{
    render(){
        return(
            <div>
                <NavigationBar2 />
                <div className = "container">
                    <div className="row justify-content-center">
                       <h1 className="header" >Enter OTP</h1>
                    </div>
                </div>
                <form className="row g-3 gx-5 gy-5 mx-5">
                   <div class = "col-sm-10">
                      <input type="numeric" class="form-control" id="inputOTP" style = {{width: 500}} />
                   </div>
                   <div className="col-12 position-relative">
                      <div className="col-sm-10">
                        <a className="link" href="#">Resend OTP</a>
                      </div>
                      <button type="submit" className="btn position-absolute w-25 p-3 rounded-pill" id="btncol">Verify</button>
                   </div>
                </form>
            </div>
        )
    }
}
