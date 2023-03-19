const express= require('express');
const mongoose= require('./db');
const morgan= require('morgan');
const app= express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
const cors = require("cors");
app.use(cors()); //Uses cors as a middleware
const bcrypt = require("bcryptjs");

const nodemailer = require('nodemailer');

const jwt = require("jsonwebtoken");
const jwtKey = 'CCRental';

//Import jsonwebtoken
//const jwt = require("jsonwebtoken");
//const JWT_SECRET = "adkfdksfds2302948djfadfs12490?[]dfsadff1235t61d"


//the password for the database. just msg Viral b4 using this so he can allow ur ip address to use the db.
//hO55WK6wE1a90YS3

//Password for my own DB: sqFXGejkNSXPj7Mu
//const dbURI = 'mongodb+srv://keenlim:sqFXGejkNSXPj7Mu@cluster0.zb9ywz9.mongodb.net/?retryWrites=true&w=majority';

//connecting to database
//const dbURI= 'mongodb+srv://ccradmin:hO55WK6wE1a90YS3@comparecarrentals.uvrqqxu.mongodb.net/?retryWrites=true&w=majority';
/*mongoose.connect(dbURI,{
    useNewUrlParser: true
})
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err)=> console.log(err));*/

//Require the mongoDB schema
require("./models/accounts");
const User = mongoose.model("Account");

//Function to send email 
function sendEmail(recipient_email, OTP){
    console.log(recipient_email);
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'keenlim12@gmail.com',
                pass:'rwkzvnxeygjsbeol'
            }
        })

        const mail_configs = {
            from: 'keenlim12@gmail.com',
            to: recipient_email,
            subject:'Reset password verification for CCRental',
            html: `<!DOCTYPE html>
            <html lang="en" >
            <head>
              <meta charset="UTF-8">
              <title>CodePen - OTP Email Template</title>
              
            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">CCRental</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing CCRentals. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br />CCRental</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>CCRental Inc</p>
                  <p>Singapore</p>
                </div>
              </div>
            </div>
            <!-- partial -->
              
            </body>
            </html>`,
        }

        transporter.sendMail(mail_configs, function(error, info){
            if(error){
                console.log(error);
                return reject({message:`An error has occured`});
            }

            return resolve({message:"Email sent succcessfuly"});
        })
    })
}

app.post('/sendEmail',(req,res) => {
    const {email,OTP} = req.body;
    console.log(email,OTP);
    sendEmail(email,OTP)
        .then(response => {
            return res.send(response.message)
        })
        .catch(error => res.status(500).send(error.message))
})

app.post('/sendRecoverEmail',(req,res) => {
    const {email,otp} = req.body;
    console.log(email,otp);
    console.log(otp);

    const lengthOfString = email.length;
    let newEmail = email.substring(1,lengthOfString-1);
    sendEmail(newEmail,otp)
        .then(response => {
            return res.send(response.message)
        })
        .catch(error => res.status(500).send(error.message))
})

//root or the index page
app.get('/', (req, res) => {
    res.send('<h1>home page</h1>');
});

app.get('/register', (req, res) =>{
    res.render('register');
});


app.get('/login', (req, res) =>{
    res.render('login');
});

app.post("/updatePassword", async(req,res)=>{
    const {email,pwd,cpwd} = req.body;

    const lengthOfString = email.length;
    let newEmail = email.substring(1,lengthOfString-1);

    const encryptedPassword = await bcrypt.hash(pwd,10);
    //console.log(encryptedPassword);
    console.log(newEmail);

    try{
        if(pwd===cpwd){
            //console.log(cpwd);
            let result = await User.updateOne(
                {email: newEmail},
                {
                    $set:{pwd:encryptedPassword}
                }
            )

            console.log(result);
            return res.send({status:"succesfully changed"});
        }

        else{
            return res.send({error:"Password do not match"});
        }

    }catch(error){
        res.send({status:"error", error});
    }

});

app.post("/register", async(req,res)=>{
    const {name,email,cemail,pwd,cpwd} = req.body;
    //console.log(email);

    const encryptedPassword = await bcrypt.hash(pwd,10);
    try{
        if(email===cemail){
            if(pwd===cpwd){
                const oldUser = await User.findOne({email});

                if(oldUser){
                    return res.send({error:"User Exists"});
                }
                await User.create(
                    {
                        name,
                        email,
                        pwd:encryptedPassword,
                    }
                );
                res.send(req.body);
            }
            else{
                return res.send({error:"Password do not match"});
            }
        }
        else{
            return res.send({error:"Email do not match"});
        }
       
    }
    catch(error){
        res.send({status:"error", error});
    }
});


app.post('/login', async(req, res)=> {
    console.log(req.body);
    const {email,pwd} = req.body;

    if(email && pwd){
        //Find if user exist
        const user = await User.findOne({email});

        if(!user){
            return res.send({error:"User Not Found"});
        }

        if(await bcrypt.compare(pwd , user.pwd)){

            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                    pwd: user.pwd
                },
                jwtKey,
                {expiresIn: "24h"}
            );

            if(res.status(201)){
                return res.send({
                    message: "Login Successful",
                    email: user.email,
                    token,
                });
            }
            
            else{
                return res.json({error:"error"});
            }
        }

        res.json({status:"error",error:"Invalid password"});
    }
    
    else{
        res.send({error:"Fill in all data"});
    }

});

app.post("/userData",async(req,res)=>{
    const {token} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        //console.log(user);
        const useremail = user.email;
        User.findOne({email:useremail}).then((data)=>{
            res.send({status:"ok",data: data});
        }).catch((error)=>{
            res.send({status:"error",data: error});
        });
    }catch(error){

    }
});



app.use((req, res) => {
    res.status(404).send('<h1>Page Not Found!</h1>');
  });

//Check if node server have started - PORT number 5000
app.listen(5000, ()=>{
    console.log("Server Started");
})
