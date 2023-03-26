const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://Lim:Lim123@cluster0.4ejvdiv.mongodb.net/CC_Rental?retryWrites=true&w=majority';

router.post('/retrieve', (req, res) => {
    const email = req.body.email;
    MongoClient.connect(uri, function(err, client) {
      if (err) {
        console.log(err);
        res.status(500).send("Error connecting to MongoDB");
      } else {
        const db = client.db('CC_Rental');
        const collection = db.collection('savedinfo');
        collection.findOne({ email: email })
          .then(function(savedInfo) {
            if (!savedInfo) {
              res.status(404).send("No saved info found for email: " + email);
            } else {
              const pickupLocation = savedInfo.pickupLocation;
              const duration = savedInfo.duration;
              console.log(pickupLocation, duration);
              res.status(200).send({ pickupLocation: pickupLocation, duration: duration });
            }
          })
          .catch(function(err) {
            console.log(err);
            res.status(500).send("Error retrieving saved info");
          })
          .finally(function() {
            client.close();
          });
      }
    });
});
  

module.exports = router;
