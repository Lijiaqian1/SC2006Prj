import React from 'react';
import {NavLink} from 'react-router-dom';

class ForgetPassword extends React.Component{
    render(){
        return(
                <div className="body">
                        <div className="reset">
                            <h1 className="text-center mb-5">Forget Password?</h1>
                            <form mt-2>
                                <div class="form-group mt-5">
                                    <label className = "form-label" for="otp">Email Address</label>
                                    <input className = "form-control"  type="password" id = "otp" required></input>
                                </div>
                                <div className="mt-5">
                                    <input className = "btn btn-primary w-100" type="submit" value="Forget Password"></input>
                                </div>


                            </form>
                        </div>

                    </div>
        )
    }
}

export default ForgetPassword;