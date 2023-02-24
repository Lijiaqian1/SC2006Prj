import React from 'react'
import {NavLink} from 'react-router-dom';

class EnterOTP extends React.Component{
    render(){
        return(
            <div className="body">
                        <div className="reset w-25">
                            <h1 className="text-center mb-5">Enter OTP</h1>
                            <form mt-2>
                                <div class="form-group mt-5">
                                    <label className = "form-label" for="otp">Enter One-time-password</label>
                                    <input className = "form-control"  type="password" id = "otp" required></input>
                                </div>
                                <div className="mt-5">
                                    <input className = "btn btn-primary w-100" type="submit" value="Verify"></input>
                                </div>

                                <NavLink to="/">
                                    <div className = "text text-center mt-3">
                                        Resend OTP
                                    </div>
                                </NavLink>
                            </form>
                        </div>

                    </div>
        )
    }
}

export default EnterOTP;
