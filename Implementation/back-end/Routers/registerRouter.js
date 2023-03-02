const express= require('express');
const router=express.Router();
var Account= require('./models/accounts');

router.post('/register',function(req,res){
    var personInfo = req.body;
    if(personInfo.pwd == personInfo.cpwd){
        Account.findOne({email:personInfo.email}, function(err, data){
            if(!data){
                var newuser= new Account({
                    name: personInfo.name, 
                    email: personInfo.email,
                    password: personInfo.pwd
                });

                newuser.save(function(err, Person){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("successfuly added");
                        console.log(Person);
                        res.send("Successfully registered!");
                    }
                });
            }
            else{
                //email exists since not null
                res.json({status: "Error",
                error: "Email exists already"});
            }
        });
    }
    else{
        res.json({status: "Error",
        error: "Password not matching"});
    }
    
})

module.exports=router;