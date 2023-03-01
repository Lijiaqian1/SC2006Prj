const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Car = mongoose.model('Car');

router.post('/cars', async (req, res) => {
  var userGpsCoordinate = req.body.gpsCoordinate; 
  var selectedTypeOfCar = req.body.typeofcar; 
  var selectedTypeOfFuel = req.body.typeofFuel; 
  const distance = 20000; 

  var filter = {};
  if (selectedTypeOfCar) {
    filter.typeofcar = selectedTypeOfCar;
  }
  if (selectedTypeOfFuel) {
    filter.typeofFuel = selectedTypeOfFuel;
  }

  
    const cars = Car.find({
      available: true,
      gpscoordinate: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: userGpsCoordinate.split(",").map(parseFloat)
          },
          $maxDistance: distance
        }
      },
      ...filter 
    },function(error,result){
        console.log(error);
        res.json(result); res.end;
    }).sort({ price: 1 }); 
});

module.exports = searchcarRouter;
