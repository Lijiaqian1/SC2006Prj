const mongoose= require('mongoose');

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