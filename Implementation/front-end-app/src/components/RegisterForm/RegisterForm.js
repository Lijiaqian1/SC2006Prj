import React from 'react';
import './RegisterForm.css';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () =>{

    /*constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            cemail:"",
            pwd:"",
            cpwd:"",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }*/

    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [cemail, setCemail] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd,setCpwd] = useState('');

    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const accounts = {name,email,cemail,pwd,cpwd};
        console.log(name,email,cemail,pwd,cpwd);
        fetch("http://localhost:5000/register",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify(accounts),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data,"userRegister");
            alert("Successfully registered");
            Navigate('/login');
        });
    }
        return(
        <div className="register mt-4">
            <div className = "container">
                <div className="row justify-content-center">
                    <h1 className="heading">Register</h1>
                </div>
            </div>
        <form className="row g-3 gx-5 gy-5 mx-5" onSubmit = {handleSubmit}>

            <div className="col-md-12">
                <label for="name" className="form-label text-white">Name</label>
                <input type="text" class="form-control" id="name" name="name"
                onChange={(e)=>setName(e.target.value)} />
            </div>
    
            <div className="col-md-6">
                <label for="email" className="form-label text-white">Email</label>
                <input type="email" class="form-control" id="email" name="email"
                onChange={(e)=>setEmail(e.target.value)}/>
            </div>


            <div className="col-md-6">
                <label for="cemail" class="form-label text-white">Confirm Email</label>
                <input type="email" class="form-control" id="cemail" name="cemail"
                onChange={(e)=>setCemail(e.target.value)}/>
            </div>


            {/*<div className="col-md-6">
                <label for="inputDOB4" class="form-label text-white">Date of Birth</label>
                <input type="dateofbirth" class="form-control" id="inputDOB"/>
            </div>

            <div className="col-md-6">
                <label for="inputPhoneNo4" class="form-label text-white">Phone Number</label>
                <input type="phonenumber" class="form-control" id="inputPhoneNo"/>
            </div>*/}


            <div className="col-md-6">
                <label for="pwd" class="form-label text-white">Password</label>
                <input type="password" class="form-control" id="pwd" name="pwd"
                onChange={(e)=>setPwd(e.target.value)}/>
            </div>


            <div className="col-md-6">
                <label for="cpwd" class="form-label text-white">Confirm Password</label>
                <input type="password" class="form-control" id="cpwd" name="cpwd"
                onChange={(e)=>setCpwd(e.target.value)}/>
            </div>


            <div className="col-12 position-relative">
                <button type="submit" className="btn btn-primary position-absolute w-25 p-3 top-50 start-50 translate-middle mt-5 rounded-pill">Sign Up</button>
            </div>
            
            <div className="col-12 position-relative">
                <h6 className="text-white position-absolute top-50 start-50 translate-middle mt-5">By signing up, you agree to the Terms of Use and Privacy Policy</h6>
            </div>
            </form>

        </div>
           

                            

        )
    }


export default RegisterForm;

