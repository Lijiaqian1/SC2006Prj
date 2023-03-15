import React from 'react';
import {NavLink} from 'react-router-dom';
import {useState,useEffect} from 'react';
import '../RecoverPassword/RecoverPassword.css'
import { useNavigate } from 'react-router-dom';

const RecoverPassword = () => {
    const Navigate = useNavigate();

    const [pwd,setPwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=>{
        const emailStore = localStorage.getItem('Email');
        if(emailStore){
            setEmail(emailStore);
        }
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const information = {email,pwd,cpwd};
        console.log(information);

        let result = await fetch("http://localhost:5000/updatePassword", {
            method: "POST",
            body: JSON.stringify(information),
            headers:{
                'Content-Type' :'application/json'
            }
        });

        result = await result.json();
        console.log(result);

        if(result.error === "Password do not match"){
            alert("Password do not match, Try again");
        }

        else if(result.status==="error"){
            alert("Error!");
        }

        else if(result.status==="succesfully changed"){
            alert("Successfully changed");
            localStorage.clear();
            Navigate('/login');
        }

        
    }



    return(
        <div className="body">
             <div className="reset">
                <h1 className="text-center">Reset Password</h1>

                <form className="mt-2 needs-validation" novalidate onSubmit={handleSubmit}>
                    <div class="form-group mt-4">
                        <label className = "form-label" for="password">New Password</label>
                        <input className = "form-control"  type="password" id = "password" required
                        value={pwd} onChange={(e)=>setPwd(e.target.value)}></input>
                    </div>

                    <div class="form-group mt-2">
                        <label className = "form-label" for="password">Confirm Password</label>
                        <input className = "form-control"  type="password" id = "cpwd" required
                        value={cpwd} onChange={(e)=>setCpwd(e.target.value)}></input>
                    </div>

                    <div className="mt-5">
                        <input className = "btn btn-primary w-100" type="submit" value="SIGN IN"></input>
                    </div>



                </form>
            </div>

        </div>
           

        )
    
}
export default RecoverPassword;