const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const accountSchema= new Schema(
    {
        name:String,
        email:{type:String, unique:true},
        //cemail: String,
        pwd: String,
        //cpwd: String,

    }, 
    {
        collection: "Account",
    }
);

mongoose.model('Account', accountSchema);

