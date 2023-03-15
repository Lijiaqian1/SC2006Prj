import React from 'react';
import '../Login/Login.css';
import {NavLink,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'react';
import { useContext } from 'react';
import {RecoverContext} from 'react';

const Login = () => {

    const [email,setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [otp, setOtp] = useState('');


    const Navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('OTP',JSON.stringify(otp), [otp]);
        localStorage.setItem('Email', JSON.stringify(email),[email]);
    })

    const navigateToOtp = async() => {
        if(email){
            const OTP = Math.floor(Math.random() * 9000 + 1000);
            //console.log(OTP);
            setOtp(OTP);

            const info = {email,OTP};
            console.log(info);

            let result = await fetch("http://localhost:5000/sendEmail", {
                method: "POST", 
                body: JSON.stringify(info),
                headers:{
                    'Content-Type' : 'application/json'
                }
            });
            
            console.log(result.statusText);

            if(result.statusText==="OK"){
                //localStorage.setItem("OTP", JSON.stringify(otp));
                Navigate('/enterotp');
            }
            return;
        }

        return alert("Please enter your email");
    }

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            Navigate('/');
        }
        
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        const logincredentials = {email,pwd};
        console.log(email,pwd);

        let result = await fetch("http://localhost:5000/login",{
            method: 'POST',
            body: JSON.stringify(logincredentials),
            headers:{
                'Content-Type' : 'application/json'
            }
        });

        result = await result.json();
        console.warn(result);

        if(result.error==="User Not Found" || result.error==="Invalid password"){
            alert("Incorrect email or password! Please try again!");
        }

        else if(result.error==="Fill in all data"){
            alert("Please fill in all data!");
        }

        else if(result.error==="error"){
            alert("Error");
        }

        else{
            localStorage.setItem("user",JSON.stringify(result));
            Navigate('/');
        }


    }

        return(
        <div className="body">
             <div className="login">
                <h1 className="text-center">Sign In</h1>

                <form className = "needs-validation" novalidate onSubmit={handleSubmit}>
                    <div className="form-group was-validated">
                        <label className = "form-label" for="email">Email address</label>
                        <input className = "form-control" type="email" id = "email" required
                        value = {email} onChange={(e)=>setEmail(e.target.value)}></input>
                        <div className="invalid-feedback">
                            Please enter your email address
                        </div>
                    </div>

                    <div className="form-group was-validated">
                        <label className = "form-label" for="password">Password</label>
                        <input className = "form-control"  type="password" id = "password" required
                        value = {pwd} onChange={(e)=>setPwd(e.target.value)}></input>
                        <div className="invalid-feedback">
                            Please enter your password
                        </div>
                    </div>
                    

                    <div className = "text" onClick={navigateToOtp}>
                        Forgotten your password?
                    </div>

                    
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
export default Login;