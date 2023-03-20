const { spawn } = require('child_process');
const express = require('express');
const router = express.Router();

router.get('/'), (req, res)=> {
    res.status(200).send('<h1>scrape get!</h1>');
}
// Define your scraper endpoint
router.post('/', (req, res) => {
    // Extract the parameters from the request body
    locationp= req.body.location;
    datep= req.body.pickupdate;
    timep= req.body.pickuptime;
    durationp= req.body.duration;

    // Call the Python script using child_process.spawn()
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
        res.status(200).send("Scraping completed successfully");
    });
});

module.exports = router;