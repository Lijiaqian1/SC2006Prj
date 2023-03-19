import React from 'react'
import {NavLink} from 'react-router-dom';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const EnterOTP = () =>{
    const Navigate = useNavigate();

    const [otp,setOtp] = useState('');
    const [inputOTP, setInputOTP] = useState('');
    const [timerCount, setTimer] = React.useState(60);
    const[disable,setDisable] = React.useState(true);
    const [email,setEmail] = useState('');

    useEffect(()=>{
        const otpValue = localStorage.getItem('OTP');
        const emailStore = localStorage.getItem('Email');
        if(otpValue){
            setOtp(otpValue);
        }
        if(emailStore){
            setEmail(emailStore);
        }
    });


    function verifyOTP(){
        if(inputOTP === otp){
            alert('Correct OTP');
            Navigate('/recoverpassword');
        }
    };

    const resendOTP=async()=>{
        if(disable){
            return;
        }

        if(email){
            const info = {email,otp};
            console.log(info);
            console.log(otp);

            let result = await fetch("http://localhost:5000/sendRecoverEmail", {
                method: "POST", 
                body: JSON.stringify(info),
                headers:{
                    'Content-Type' : 'application/json'
                }
            });

            if(result.statusText==="OK"){
                setDisable(true);
                alert("A new OTP has been sent to your email");
                setTimer(60);
            }
            
        }
       

    }

    React.useEffect(() => {
        let interval = setInterval(() => {
          setTimer((lastTimerCount) => {
            lastTimerCount <= 1 && clearInterval(interval);
            if (lastTimerCount <= 1) setDisable(false);
            if (lastTimerCount <= 0) return lastTimerCount;
            return lastTimerCount - 1;
          });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
      }, [disable]);


    return(
        <div className="body">
            <div className="reset w-25">
                <h1 className="text-center mb-5">Enter OTP</h1>
                <form className= "mt-2" onSubmit={verifyOTP}>
                    <div className="form-group mt-5">
                        <label className = "form-label" for="otp">Enter One-time-password</label>
                        <input className = "form-control"  type="text" id = "otp" required
                        value = {inputOTP} onChange={(e) => setInputOTP(e.target.value)}></input>
                    </div>
                    <div className="mt-5">
                        <input className = "btn btn-primary w-100" type="submit" value="Verify"></input>
                    </div>


                    <div className = "text text-center mt-3" onClick={resendOTP}>
                        {disable? `Resend OTP in ${timerCount}s` : <button className="btn btn-outline-info">Resend OTP</button>}
                    </div>

                </form>
            </div>

        </div>
    )
    
}

export default EnterOTP;
