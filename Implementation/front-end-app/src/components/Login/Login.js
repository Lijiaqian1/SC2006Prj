import React from 'react';
import '../Login/Login.css';
import {NavLink} from 'react-router-dom';

class Login extends React.Component{
    render(){
        return(
        <div className="body">
             <div className="login">
                <h1 className="text-center">Sign In</h1>

                <form className = "needs-validation" novalidate>
                    <div className="form-group was-validated">
                        <label className = "form-label" for="email">Email address</label>
                        <input className = "form-control" type="email" id = "email" required></input>
                        <div className="invalid-feedback">
                            Please enter your email address
                        </div>
                    </div>

                    <div class="form-group was-validated">
                        <label className = "form-label" for="password">Password</label>
                        <input className = "form-control"  type="password" id = "password" required></input>
                        <div className="invalid-feedback">
                            Please enter your password
                        </div>
                    </div>
                    
                    <NavLink to="/forgetpassword">
                        <div className = "text">
                            Forgotten your password?
                        </div>
                    </NavLink>

                    
                    <input className = "btn btn-primary w-100" type="submit" value="SIGN IN"></input>
                    <NavLink to="/register">
                        <div className = "text mt-4 text-center">
                            Don't have an account? Register
                        </div>
                    </NavLink>

                </form>
            </div>

        </div>
           

        )
    }
}
export default Login;