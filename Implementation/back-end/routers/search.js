const { spawn } = require('child_process');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/cars");
const Car = mongoose.model('cars');
const crypto = require('crypto');

router.get('/', (req, res)=> {
    res.status(200).send('<h1>scrape get!</h1>');
});

router.post('/', (req, res) => {
    // Extract the parameters from the request body
    locationp = req.body.location;
    datep = req.body.pickupdate;
    timep = req.body.pickuptime;
    durationp = req.body.duration;
    input_str = `${locationp}${datep}${timep}${durationp}`;

    const id = crypto.createHash('sha256').update(input_str).digest('hex');
    Car.find({ searchid: id }, (err, cars) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error finding cars");
        } else if (cars.length === 0) {
            // If no cars are found with the same ID, start web scraping
            const scraperProcess = spawn('python', ['../webscraper/scrape.py', locationp, datep, timep, durationp]);
        
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
                Car.find({ searchid: id }, (err, cars) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error finding cars");
                    } else {
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
