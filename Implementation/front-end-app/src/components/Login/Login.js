import React from 'react';
import '../Login/Login.css';
import {NavLink} from 'react-router-dom';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:"",
            pwd:"",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const {email,pwd} = this.state;
        console.log(email,pwd);

        fetch("http://localhost:5000/login",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                email,
                pwd,
            }),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data,"userRegister");
            if(data.status=="ok"){
                alert("Login successful");
                window.localStorage.setItem("token",data.data);
                window.location.href="./userData";
            }
        });
    }
    render(){
        return(
        <div className="body">
             <div className="login">
                <h1 className="text-center">Sign In</h1>

                <form className = "needs-validation" novalidate onSubmit={this.handleSubmit}>
                    <div className="form-group was-validated">
                        <label className = "form-label" for="email">Email address</label>
                        <input className = "form-control" type="email" id = "email" required
                        onChange={(e)=>this.setState({email:e.target.value})}></input>
                        <div className="invalid-feedback">
                            Please enter your email address
                        </div>
                    </div>

                    <div class="form-group was-validated">
                        <label className = "form-label" for="password">Password</label>
                        <input className = "form-control"  type="password" id = "password" required
                        onChange={(e)=>this.setState({pwd:e.target.value})}></input>
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