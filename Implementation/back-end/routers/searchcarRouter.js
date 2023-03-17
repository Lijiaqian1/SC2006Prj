const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Car = mongoose.model('Car');

router.post('/cars', async (req, res) => {
  //var userGpsCoordinate = req.body.gpsCoordinate; 
  var selectedTypeOfCar = req.body.typeofcar; 
  var selectedTypeOfFuel = req.body.typeofFuel; 
  //const distance = 20000; 

  var filter = {};
  if (selectedTypeOfCar) {
    filter.typeofcar = selectedTypeOfCar;
  }
  if (selectedTypeOfFuel) {
    filter.typeofFuel = selectedTypeOfFuel;
  }

  
    const cars = Car.find({
      available: true,
      /*gpscoordinate: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: userGpsCoordinate.split(",").map(parseFloat)
          },
          $maxDistance: distance
        }
      },*/
      ...filter 
    },function(error,result){
        console.log(error);
        res.json(result); res.end;
    }).sort({ price: 1 }); 
});

module.exports = searchcarRouter;
/*
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AudiCar = mongoose.model('carlitecars');
const BmwCar = mongoose.model('getgocars');
const MercedesCar = mongoose.model('tribecars');

router.post('/cars', async (req, res) => {
  var selectedTypeOfCar = req.body.typeofcar; 
  var selectedTypeOfFuel = req.body.typeofFuel; 

  var filter = {};
  if (selectedTypeOfCar) {
    filter.typeofcar = selectedTypeOfCar;
  }
  if (selectedTypeOfFuel) {
    filter.typeofFuel = selectedTypeOfFuel;
  }

  const cars = [];

  const carlitecars = await carlitecars.find({
    available: true,
    ...filter 
  }).sort({ price: 1 }).exec();

  const getgocars = await getgocars.find({
    available: true,
    ...filter 
  }).sort({ price: 1 }).exec();

  const tribecars = await tribecars.find({
    available: true,
    ...filter 
  }).sort({ price: 1 }).exec();

  cars.push(...audiCars, ...bmwCars, ...mercedesCars);

  res.json(cars);
});

module.exports = searchcarRouter;
*/
