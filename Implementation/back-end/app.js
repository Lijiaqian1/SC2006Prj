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
const { spawn } = require('child_process');

const searchRouter = require('./routers/search');
app.use('/', searchRouter);

const saveRouter = require('./routers/saveinfo');
app.use('/', saveRouter);

const retrieveRouter = require('./routers/retriever');
app.use('/', retrieveRouter);

//Comment out if needed
const pythonpath= "C:/Python310/python.exe";

const nodemailer = require('nodemailer');

const jwt = require("jsonwebtoken");
const jwtKey = 'CCRental';

//Require the mongoDB schema
require("./models/accounts");
const User = mongoose.model("Account");


//Function to send email. Parameters are Email : String, OTP : String.
//Uses the nodemailer module to send email to the users
//Require the user of a GMAIL account
//Return message "Successfully sent" to the frontend to indicate that email is sent successfully
//Return message "An error has occured" to the frontend to indicate that there is an error
function sendEmail(recipient_email, OTP){
    console.log(recipient_email);
    console.log("Sending email");
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'keenlim12@gmail.com',
                pass:'oneqgqgjarjiecmv'
            }
        })

        const mail_configs = {
            from: 'ccrental35@gmail.com',
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

/*app.post(sendEmail) will use the sendEmail function to send an email to the users.
Parameters will contains of the request body from frontend where request body will 
contain the recipient email and OTP*/
app.post('/sendEmail',async(req,res) => {
    const {email,OTP} = req.body;
    console.log(email,OTP);
    const oldUser = await User.findOne({email});
    // If user already exists, return an error message
    console.log(oldUser);
    if(oldUser===null){
        console.log("User does not exists");
        return res.send({error:"User Not Found"});

    }
    else{
        sendEmail(email,OTP)
        .then(response => {
            return res.send({status:"Successfully sent"})
        })
        .catch(error => res.status(500).send(error.message))

    }
 
})

/*app.post(Sendrecoveremail) will send the email to the user if frontend request for a recoveremail */

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

/*app.post(updatepassword) will help to update the corresponding passowrd in the mongoDB
Require the use of bcrypt module to encrypt the password in order to set the encrypted
password in MongoDB*/

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


//Function isAlphanumeric will check if the string consists of both alphabets and numbers
function isAlphanumeric(str){
        return /^[a-zA-Z0-9]+$/.test(str);
}

//Function checkPassword will make sure that the password is at least a length of 8 and is alphanumeric
function checkPassword(pwd){
        if(pwd.length < 8){
            return "Length less than 8";
        }

        else if(!isAlphanumeric(pwd)){
            return "no alphanumric"
        }

        return "success"
}


/*app.post(register) will help to check if the email exist in the MongoDB
If email does not exist in MongoDB, it will create a new input field in the MongoDB accounts database */

app.post("/register", async(req,res)=>{
    const {name,email,cemail,pwd,cpwd} = req.body;
    //console.log(email);

    if(checkPassword(pwd)!="success"){
        return res.send({error:"Password do not meet requirement"});
    }
    
    // Hashing the password using bcrypt with salt rounds of 10
    const encryptedPassword = await bcrypt.hash(pwd,10);
    try{
        if(email===cemail){
            if(pwd===cpwd){
                const oldUser = await User.findOne({email});
                // If user already exists, return an error message
                if(oldUser){
                    return res.send({error:"User Exists"});
                }
                // If user doesn't exist, create a new user with entered name, email and encrypted password
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

/*app.post(login) will find the email and check with the corresponding password
If both email and password matches, users will successfully login into the account. */

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

/*Scrape functions*/

app.get('/scrape', (req, res)=> {
    res.send('<h1>scrape</h1>');
});

app.post('/scrape', (req, res) => {
    console.log(req.body);
    // Extract the parameters from the request body
    locationp= req.body.location;
    datep= req.body.pickupdate;
    timep= req.body.pickuptime;
    durationp= req.body.duration;

    //const scraperProcess = spawn('python3', ['./webscraper/scrape.py', locationp, datep, timep, durationp]);
    // Call the Python script using child_process.spawn()
    const scraperProcess = spawn(pythonpath, ['./webscraper/scrape.py', locationp, datep, timep, durationp]);

    // Listen for output from the Python script
    scraperProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    // Listen for errors from the Python script
    
    scraperProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });

    // Listen for the Python script to exit
    scraperProcess.on('exit', (code) => {
        console.log(`Python script exited with code ${code}`);
        res.status(200).send("Scraping completed successfully");
    });

});



app.use((req, res) => {
    res.status(404).send('<h1>Page Not Found!</h1>');
  });

//Check if node server have started - PORT number 5000
app.listen(5000, ()=>{
    console.log("Server Started");
})
