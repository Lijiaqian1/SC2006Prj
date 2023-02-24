import React from 'react';
import {NavLink} from 'react-router-dom';
import '../RecoverPassword/RecoverPassword.css'

class RecoverPassword extends React.Component{
    render(){
        return(
        <div className="body">
             <div className="reset">
                <h1 className="text-center">Reset Password</h1>

                <form mt-2>
                    <div class="form-group mt-4">
                        <label className = "form-label" for="password">New Password</label>
                        <input className = "form-control"  type="password" id = "password" required></input>
                    </div>

                    <div class="form-group mt-2">
                        <label className = "form-label" for="password">Confirm Password</label>
                        <input className = "form-control"  type="password" id = "password" required></input>
                    </div>

                    <div className="mt-5">
                        <input className = "btn btn-primary w-100" type="submit" value="SIGN IN"></input>
                    </div>



                </form>
            </div>

        </div>
           

        )
    }
}
export default RecoverPassword;