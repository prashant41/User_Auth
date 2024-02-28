const mongoose=require('mongoose')
const connect=mongoose.connect("mongodb+srv://poojaryprashant35:rFmsQm1UOT67nZS4@cluster0.twqjzgi.mongodb.net/authenticate")


//Create Connection
connect.then(()=>{
    console.log("Database Connected Successfull")
})

//Design Schema
const loginSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//
const Collection =new mongoose.model('users',loginSchema);
module.exports=Collection;
