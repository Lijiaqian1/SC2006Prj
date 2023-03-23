const mongoose= require('mongoose');

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  transmission: {
    type: String,
    required: false
  },
  seats: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  duration: {
    type: [{
      label: {
        type: String,
        default: 'Duration'
      },
      value: {
        type: String,
        required: true
      }
    }],
    required: false
  },
  price: {
    type: String,
    required: true
  },
  rent_company:{
    type: String,
    required: false
  },
  latitude:{
    type: String,
    required: false
  },
  longtitude:{
    type: String,
    required: false
  },
  search_id:{
    type: String,
    required: false
  },
});
 

  

  Car = mongoose.model('Car', carSchema);
  module.exports= Car; 
