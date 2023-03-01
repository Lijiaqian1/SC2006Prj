const express= require('express');
const mongoose= require('mongoose');
var Account= require('./models/accounts');
const morgan= require('morgan');
const app= express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//the password for the database. just msg Viral b4 using this so he can allow ur ip address to use the db.
//hO55WK6wE1a90YS3

//connecting to database
const dbURI= 'mongodb+srv://ccradmin:hO55WK6wE1a90YS3@comparecarrentals.uvrqqxu.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => {
        app.listen (3000);
        console.log("connected to DB");
    })
    .catch((err)=> console.log(err));


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

//post register authenticate
app.post('/register', (req, res)=> {
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
    

});

app.post('/login', (req, res)=> {
    console.log(req.body);
    //someone do this
    //also use jwt for session of users also add to register page after successfully logging in.
});

app.use((req, res) => {
    res.status(404).send('<h1>Page Not Found!</h1>');
  });

