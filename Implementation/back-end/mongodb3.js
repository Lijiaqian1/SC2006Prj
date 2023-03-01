const mongoose = require('mongoose');
//const bodyParser=require('body-parser');
//const dbURI='mongodb://127.0.0.1/testdb';
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/cc_rental');
const Schema= mongoose.Schema;

const accountSchema= new Schema({
    name: {
        type: String, 
        required: true,
    }, 

    email: {
        type: String, 
        required: true,
    }, 

    password: {
        type: String, 
        required: true,
    }, 

}, 
{timestamps: true});

Account= mongoose.model('Account', accountSchema);

module.exports= Account; 
  
  
  const carSchema = new mongoose.Schema({
    //carID,carCondition,company
    typeofcar: String,
    typeofFuel: String,
    price: String,
    location: String,
    gpscoordinate: String,
    color: String,
    available: Boolean,
    ratings: [{
      userID: Number,
      reviews: String,
      ratings: String,
    }],
  });
 

  

  Car = mongoose.model('Car', carSchema);
  module.exports= Car; 

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
      typeofcar: 'SUV',
      typeofFuel: 'Diesel',
      price: '200',
      location: 'Jurong West',
      gpscoordinate: '12345',
      color: 'black',
      available: true,
      ratings: [{
        email: 'johndoe@gmail.com',
        reviews: 'Great car',
        ratings: '5',
      }],
    });


    await car.save();
    console.log('Car document saved successfully.');


    

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

saveData();