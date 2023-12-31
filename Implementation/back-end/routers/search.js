const { spawn } = require('child_process');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Car = require("../models/cars");
const crypto = require('crypto');
const pythonpath= "C:/Python310/python.exe";

router.get('/search', (req, res)=> {
    res.status(200).send('<h1>scrape get!</h1>');
});

router.post('/search', (req, res) => {
    // Extract the parameters from the request body
    locationp = req.body.location;
    datep = req.body.pickupdate;
    timep = req.body.pickuptime;
    durationp = req.body.duration;
    input_str = `${locationp}${datep}${timep}${durationp}`;

    const id = crypto.createHash('sha256').update(input_str).digest('hex');
    Car.find({ search_id: id }, (err, cars) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error finding cars");
        } else if (cars.length === 0) {
            console.log("Webscraping in progress...")
            // If no cars are found with the same ID, start web scraping
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
                
                // Now the car with searchid wanted is in database
                Car.find({ search_id: id }, (err, cars) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error finding cars");
                    } else {
                        console.log(cars);
                        res.status(200).send(cars.sort((a, b) => a.price - b.price));
                    }
                });
            });
        } else {
            
            res.status(200).send(cars.sort((a, b) => a.price - b.price));
        }
    });
});

module.exports = router;
