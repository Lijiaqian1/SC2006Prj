import React from 'react';
import './RegisterForm.css';

class RegisterForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            cemail:"",
            pwd:"",
            cpwd:"",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const{name,email,cemail,pwd,cpwd} = this.state;
        console.log(name,email,cemail,pwd,cpwd);
        fetch("http://localhost:5000/register",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                name,
                email,
                cemail,
                pwd,
                cpwd,
            }),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log(data,"userRegister");
        });
    }

    render(){
        return(
        <div className="register mt-4">
            <div className = "container">
                <div className="row justify-content-center">
                    <h1 className="heading">Register</h1>
                </div>
            </div>
        <form className="row g-3 gx-5 gy-5 mx-5" onSubmit = {this.handleSubmit}>

            <div className="col-md-12">
                <label for="name" className="form-label text-white">Name</label>
                <input type="text" class="form-control" id="name" name="name"
                onChange={(e)=>this.setState({name:e.target.value})} />
            </div>
    
            <div className="col-md-6">
                <label for="email" className="form-label text-white">Email</label>
                <input type="email" class="form-control" id="email" name="email"
                onChange={(e)=>this.setState({email:e.target.value})}/>
            </div>


            <div className="col-md-6">
                <label for="cemail" class="form-label text-white">Confirm Email</label>
                <input type="email" class="form-control" id="cemail" name="cemail"
                onChange={(e)=>this.setState({cemail:e.target.value})}/>
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
                onChange={(e)=>this.setState({pwd:e.target.value})}/>
            </div>


            <div className="col-md-6">
                <label for="cpwd" class="form-label text-white">Confirm Password</label>
                <input type="password" class="form-control" id="cpwd" name="cpwd"
                onChange={(e)=>this.setState({cpwd:e.target.value})}/>
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

