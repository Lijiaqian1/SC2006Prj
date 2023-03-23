const { spawn } = require('child_process');
const express2 = require('express');
const router = express2.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');

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

    // Connect to the MongoDB database
    const MongoClient = require('mongodb').MongoClient;
    const uri = 'mongodb+srv://Lim:Lim123@cluster0.4ejvdiv.mongodb.net/CC_Rental?retryWrites=true&w=majority';
    MongoClient.connect(uri, function(err, client) {
        if (err) {
            console.log(err);
            res.status(500).send("Error connecting to MongoDB");
        } else {
            const db = client.db('CC_Rental');
            const collection = db.collection('cars');

            

            // Find cars with the specified search ID
            collection.find({ search_id: id }).toArray()
                    .then(function(cars) {
                        console.log(cars.length)
                        if (cars.length === 0) {
                            console.log("Web scraping in progress....")
   
                        // If no cars are found with the same ID, start web scraping
                        const scraperProcess = spawn('python', ['../back-end/webscraper/scrape.py', locationp, datep, timep, durationp]);

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
                            // Now the car with searchid wanted is in the database
                            collection.find({ searchid: id }).toArray()
                            .then(function(cars) {
                                console.log(cars);
                                res.status(200).send(cars.sort((a, b) => a.price - b.price));
                            })
                            .catch(function(err) {
                                console.log(err);
                                res.status(500).send("Error finding cars");
                            });
                        });
                        } else {
                            console.log(cars);
                            res.status(200).send(cars.sort((a, b) => a.price - b.price));
                        }
                    }).catch(function(err) {
                        console.log(err);
                        res.status(500).send("Error finding cars");
                    });

        }
    });
});

module.exports = router;
