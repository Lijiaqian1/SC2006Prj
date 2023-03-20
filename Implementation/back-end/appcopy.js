const express= require('express');
const mongoose= require('./db');
const morgan= require('morgan');
const path = require('path');
const app= express();
app.use(express.json());
app.use(morgan('dev'));
const cors = require("cors");
app.use(cors()); //Uses cors as a middleware
const bcrypt = require("bcryptjs");
const scraper= require('./routers/searchRouter');
const { spawn } = require('child_process');
//app.use('scrape', scraper);
app.use(express.json());
app.get('/', (req, res)=> {
    res.send('<h1>home page</h1>');
});
app.get('/scrape', (req, res)=> {
    res.send('<h1>hscrape</h1>');
});

app.post('/scrape', (req, res) => {
    // Extract the parameters from the request body
    console.log("Starting python file");
    locationp= req.body.location;
    datep= req.body.pickupdate;
    timep= req.body.pickuptime;
    durationp= req.body.duration;

    // Call the Python script using child_process.spawn()
    const scraperProcess = spawn('python3', ['./webscraper/scrape.py', locationp, datep, timep, durationp]);

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
