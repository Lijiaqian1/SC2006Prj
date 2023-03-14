const mongoose= require('mongoose');


const accountSchema= new mongoose.Schema(
    {
        name:String,
        email:{type:String, unique:true},
        pwd: String,
    }, 
    {
        collection: "Account",
    }
);

module.exports=mongoose.model('Account', accountSchema);

