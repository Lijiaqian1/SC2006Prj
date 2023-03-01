const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/cc_rental');
const Schema= mongoose.Schema;
const accountSchema=require('./models/accounts');
const carSchema=require('./models/cars');



var Account=require('./models/accounts');
 
  

  var Car = require('./models/cars');


async function saveData() {
  try {
    
    const account = new Account({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      mobileNumber: '1234567890',
      password: 'password',
      
    });

    await account.save();
    console.log('Account document saved successfully.');

    const car = new Car({
      carID: '000001',
      typeofcar: 'SUV',
      typeofFuel: 'Diesel',
      price: 200,
      location: 'Jurong West',
      gpscoordinate: '12345',
      color: 'black',
      available: true,
      ratings: [{
        email: 'johndoe@gmail.com',
        reviews: 'Great car',
        ratings: 5,
      }],
      avgRating: 0,
    });


    await car.save();
    console.log('Car document saved successfully.');


    

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

saveData();