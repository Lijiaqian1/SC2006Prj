import React from 'react';
import {NavLink} from 'react-router-dom';

const ForgetPassword = () => {

        return(
            <div className="body">
                <div className="reset">
                    <h1 className="text-center mb-5">Forget Password?</h1>
                    <form className="mt-2 needs-validation" novalidate>
                        <div class="form-group was-validated mt-5">
                            <label className = "form-label" for="email">Email Address</label>
                            <input className = "form-control"  type="email" id = "email" required></input>
                        </div>
                        <div className="mt-5">
                            <input className = "btn btn-primary w-100" type="submit" value="Forget Password"></input>
                        </div>
                    </form>
                </div>

            </div>
        )
    
}

export default ForgetPassword;