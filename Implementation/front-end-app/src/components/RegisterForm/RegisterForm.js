import React from 'react';
import './RegisterForm.css';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () =>{

    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [cemail, setCemail] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd,setCpwd] = useState('');

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            Navigate('/');
        }
        
    })

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accounts = {name,email,cemail,pwd,cpwd};
        console.log(name,email,cemail,pwd,cpwd);

        let result = await fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify(accounts),
            headers:{
                'Content-Type' : 'application/json'
            }
        })

        result = await result.json();
        console.warn(result);
        //Need to show alert for error 
        if(result.error === "User Exists"){
            alert("User Exists, Try again with another email");
        }

        else if(result.error === "Password do not match"){
            alert("Password do not match, Try again");
        }

        else if(result.error==="Email do not match"){
            alert("Email do not match, Try again");
        }

        else if(result.status==="error"){
            alert("Error!");
        }

        else{
            localStorage.setItem("user",JSON.stringify(result))
            Navigate('/');
        }
    }
        return(
        <div className="register mt-4">
            <div className = "container">
                <div className="row justify-content-center">
                    <h1 className="heading">Register</h1>
                </div>
            </div>
        <form className="row g-3 gx-5 gy-5 mx-5 needs-validation" novalidate onSubmit = {handleSubmit}>

            <div className="col-md-12 form-group was-validated">
                <label for="name" className="form-label text-white">Name</label>
                <input type="text" class="form-control" id="name" name="name" required
                value = {name} onChange={(e)=>setName(e.target.value)} />
                <div class="valid-feedback text-white">Looks good!</div>
            </div>
    
            <div className="col-md-6 form-group was-validated">
                <label for="email" className="form-label text-white">Email</label>
                <input type="email" class="form-control" id="email" name="email" required
                value = {email} onChange={(e)=>setEmail(e.target.value)}/>
                <div className="invalid-feedback">
                    Please enter your email address
                </div>
            </div>


            <div className="col-md-6 form-group was-validated">
                <label for="cemail" class="form-label text-white">Confirm Email</label>
                <input type="email" class="form-control" id="cemail" name="cemail" required
                 value = {cemail} onChange={(e)=>setCemail(e.target.value)}/>
                <div className="invalid-feedback">
                    Please confirm your email address
                </div>
            </div>


            {/*<div className="col-md-6">
                <label for="inputDOB4" class="form-label text-white">Date of Birth</label>
                <input type="dateofbirth" class="form-control" id="inputDOB"/>
            </div>

            <div className="col-md-6">
                <label for="inputPhoneNo4" class="form-label text-white">Phone Number</label>
                <input type="phonenumber" class="form-control" id="inputPhoneNo"/>
            </div>*/}


            <div className="col-md-6 form-group was-validated">
                <label for="pwd" class="form-label text-white">Password</label>
                <input type="password" class="form-control" id="pwd" name="pwd" required
                 value = {pwd} onChange={(e)=>setPwd(e.target.value)}/>
                <div className="invalid-feedback">
                    Please enter your password
                </div>
            </div>


            <div className="col-md-6 form-group was-validated">
                <label for="cpwd" class="form-label text-white">Confirm Password</label>
                <input type="password" class="form-control" id="cpwd" name="cpwd" required
                 value = {cpwd} onChange={(e)=>setCpwd(e.target.value)}/>
                <div className="invalid-feedback">
                    Please confirm your password
                </div>
            </div>


            <div className="col-12 position-relative">
                <button type="submit" className="btn btn-primary position-absolute w-25 p-3 top-50 start-50 translate-middle mt-3 rounded-pill">Sign Up</button>
            </div>
            
            <div className="col-12 position-relative">
                <h6 className="text-white position-absolute top-50 start-50 translate-middle mt-3 mb-5">By signing up, you agree to the Terms of Use and Privacy Policy</h6>
            </div>
            </form>

        </div>
           

                            

        )
    }


export default RegisterForm;

