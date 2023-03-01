import React from 'react';
import './RegisterForm.css';

class RegisterForm extends React.Component{
    render(){
        return(
        <div className="register mt-4">
            <div className = "container">
                <div className="row justify-content-center">
                    <h1 className="heading">Register</h1>
                </div>
            </div>
        <form className="row g-3 gx-5 gy-5 mx-5">

            <div className="col-md-12">
                <label for="name" className="form-label text-white">Name</label>
                <input type="text" class="form-control" id="name" name="name" required/>
            </div>
    
            <div className="col-md-6">
                <label for="email" className="form-label text-white">Email</label>
                <input type="email" class="form-control" id="email" name="email"/>
            </div>


            <div className="col-md-6">
                <label for="cemail" class="form-label text-white">Confirm Email</label>
                <input type="email" class="form-control" id="cemail" name="cemail"/>
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
                <input type="password" class="form-control" id="pwd" name="pwd"/>
            </div>


            <div className="col-md-6">
                <label for="cpwd" class="form-label text-white">Confirm Password</label>
                <input type="password" class="form-control" id="cpwd" name="cpwd"/>
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
}

export default RegisterForm;

