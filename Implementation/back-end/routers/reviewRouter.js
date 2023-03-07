const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Car = mongoose.model('Car');

router.post('/cars/reviews', async (req, res) => {
  const userEmail = req.body.userEmail;
  const carId = req.body.carId;
  const rating = parseInt(req.body.rating);
  const review = req.body.review;
  
  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not Found' });
    }


    car.ratings.push({ userEmail,review,rating});

    const sumRatings = car.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    car.avgRating = sumRatings / car.ratings.length;


    await car.save();

    res.status(200).json({ message: 'Review successfully', car: updatedCar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = reviewRouter;
