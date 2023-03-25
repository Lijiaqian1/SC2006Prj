const express = require('express');
const router = express.Router();
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://Lim:Lim123@cluster0.4ejvdiv.mongodb.net/CC_Rental?retryWrites=true&w=majority';
const dbName = CC_Rental;

router.post('/save', (req, res) => {
  // Extract user's info from request body
  const { email, pickupLocation, duration } = req.body;

  client.connect((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error connecting to database');
    } else {
      console.log('Connected to MongoDB');
      const db = client.db(dbName);
      const savedInfoCollection = db.collection('savedinfo');
      const newDocument = {
        email,
        pickupLocation,
        duration
      };
      savedInfoCollection.insertOne(newDocument, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving data to database');
        } else {
          console.log('Saved info successfully');
          res.status(200).send('Data saved successfully');
        }
        client.close();
      });
    }
  });
});

module.exports = saveRouter;
