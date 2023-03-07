const mongoose= require('./db.js');

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

module.exports=mongoose.model('Account', accountSchema);

