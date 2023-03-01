const mongoose= require('mongoose');

const carSchema = new mongoose.Schema({
    carID: String,
    typeofcar: String,
    typeofFuel: String,
    price: Number,
    location: String,
    gpscoordinate: String,
    color: String,
    available: Boolean,
    avgRating: {
        type: Number,
        integer: true
      },
    ratings: [{
        email: String,
        reviews: String,
        ratings: {
          type: Number,
          integer: true
        }
    }]
});
 

  

  Car = mongoose.model('Car', carSchema);
  module.exports= Car; 