const express= require('express');
//const mongoose= require('mongoose');
//var Account= require('./models/accounts');
const searchcarRouter=require('./router/searchcarRouter');
const reviewRouter=require('./router/reviewRouter');
const registerRouter=require('./router/registerRouter');
const morgan= require('morgan');
const app= express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//const bodyParser=require('body-parser')
//app.use(bodyParser.json())
app.use(express.json());


app.use('/',express.static('./'));
app.use(searchcarRouter);
app.use(reviewRouter);


//hO55WK6wE1a90YS3

//connecting to database
//const dbURI= 'mongodb+srv://ccradmin:hO55WK6wE1a90YS3@comparecarrentals.uvrqqxu.mongodb.net/?retryWrites=true&w=majority';
//mongoose.connect(dbURI)
//    .then((result) => {
//        app.listen (3000);
//        console.log("connected to DB");
//    })
//    .catch((err)=> console.log(err));


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

app.use(registerRouter);

app.post('/login', (req, res)=> {
    console.log(req.body);

});

app.use((req, res) => {
    res.status(404).send('<h1>Page Not Found!</h1>');
  });

  app.listen (3000);
