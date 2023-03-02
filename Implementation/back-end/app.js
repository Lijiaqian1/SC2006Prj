const express= require('express');
const mongoose= require('mongoose');
const morgan= require('morgan');
const app= express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");


//the password for the database. just msg Viral b4 using this so he can allow ur ip address to use the db.
//hO55WK6wE1a90YS3

//Password for my own DB: sqFXGejkNSXPj7Mu
//const dbURI = 'mongodb+srv://keenlim:sqFXGejkNSXPj7Mu@cluster0.zb9ywz9.mongodb.net/?retryWrites=true&w=majority';

//connecting to database
const dbURI= 'mongodb+srv://ccradmin:hO55WK6wE1a90YS3@comparecarrentals.uvrqqxu.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI,{
    useNewUrlParser: true
})
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err)=> console.log(err));

    //Require the mongoDB schema
    require("./models/accounts");
    const User = mongoose.model("Account");


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

app.post("/register", async(req,res)=>{
    const {name,email,cemail,pwd,cpwd} = req.body;

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
                        //cemail,
                        pwd:encryptedPassword,
                        //cpwd,
                    }
                );
                res.send({status:"ok"});
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


//post register authenticate
/*app.post('/register', (req, res)=> {
    //console.log(req.body);
    var personInfo = req.body;
    if(personInfo.email== personInfo.cemail){
        if(personInfo.pwd == personInfo.cpwd){
            Account.findOne({email:personInfo.email}, function(err, data){
                if(!data){
                    var newuser= new Account({
                        name: personInfo.name, 
                        email: personInfo.email,
                        password: personInfo.pwd
                    });
    
                    newuser.save(function(err, Person){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("successfuly added");
                            console.log(Person);
                            res.send("Successfully registered!");
                        }
                    });
                }
                else{
                    //email exists since not null
                    res.json({status: "Error",
                    error: "Email exists already"});
                }
            });
        }
        else{
            res.json({status: "Error",
            error: "Password not matching"});
        }
    }
    else{
        res.json({status: "Error",
        error: "Email not matching"});
    }
    

});*/

app.post('/login', (req, res)=> {
    console.log(req.body);
    //someone do this
    //also use jwt for session of users also add to register page after successfully logging in.
});

app.use((req, res) => {
    res.status(404).send('<h1>Page Not Found!</h1>');
  });

//Check if node server have started - PORT number 5000
app.listen(5000, ()=>{
    console.log("Server Started");
})

