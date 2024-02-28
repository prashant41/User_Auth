const express=require('express');
//const jwt=require('jsonwebtoken');
const path=require('path');
const collection=require('./config');
const bcrypt=require('bcryptjs')
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname+"/public"))

app.get("/",(req,res)=>{
    res.send("Home page");
})
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname+'/login.html'));
})
app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname+'/signup.html'));
})

app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.username});
        if(!check){
            res.send("User name Cannot FOund");
        }
        const isPasswordMatch= await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.sendFile(path.join(__dirname, "/home.html"));
        }else{
            res.send("Wrong Password")
        }
    }catch{
        res.send("Wrong Details")
    }
})




app.post("/signup", async (req, res) => {
    const userData = {
      name: req.body.username,
      password: req.body.password
    };
  
    try {
      const existingUser=await collection.findOne({name:userData.name}) ;
      if(existingUser) {
        res.send("User already Exists!! Please choose Different Name");
      }
      else{
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(userData.password,saltRounds);
        userData.password=hashedPassword;
        const newUser = await collection.insertMany(userData);
        console.log("User created:", newUser);
        res.send("User created successfully");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).send("Error creating user");
    }
  });

app.listen(8080,()=>{
    console.log("Running at 8080!!")
})