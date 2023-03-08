const express= require('express');
const mongoose= require('./db');
const morgan= require('morgan');
const app= express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

//Import jsonwebtoken
const jwt = require("jsonwebtoken");
const JWT_SECRET = "adkfdksfds2302948djfadfs12490?[]dfsadff1235t61d"


//the password for the database. just msg Viral b4 using this so he can allow ur ip address to use the db.
//hO55WK6wE1a90YS3

//Password for my own DB: sqFXGejkNSXPj7Mu
const dbURI = 'mongodb+srv://keenlim:sqFXGejkNSXPj7Mu@cluster0.zb9ywz9.mongodb.net/?retryWrites=true&w=majority';

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


app.post('/login', async(req, res)=> {
    console.log(req.body);
    const {email,pwd} = req.body;

    //Find if user exist
    const user = await User.findOne({email});

    if(!user){
        return res.send({error:"User Not Found"});
    }

    if(await bcrypt.compare(pwd , user.pwd)){
        //Create a token with the JWT_SECRET
        const token = jwt.sign({email:user.email},JWT_SECRET);

        if(res.status(201)){
            return res.json({status:"ok",data:token});
        }else{
            return res.json({error:"error"});
        }
    }

    res.json({status:"error",error:"Invalid password"});
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
})

app.use((req, res) => {
    res.status(404).send('<h1>Page Not Found!</h1>');
  });

//Check if node server have started - PORT number 5000
app.listen(5000, ()=>{
    console.log("Server Started");
})
