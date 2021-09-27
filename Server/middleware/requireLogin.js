const jwt = require('jsonwebtoken');
const {JWT_SECRET}= require("../keys.js");
const mongoose = require('mongoose');
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  if(!authorization){
    res.status(401).json({error:"you must be logged in!"});
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload)=>{
    if(err){
      console.log(err);
      res.status(401).json({error:"Must be Logged in to access this page"});
    }else{
      const {_id} = payload;
      User.findById(_id, function(err, foundUser){
        if(err){
          console.log(err);
        }else{
          req.user = foundUser;
        }
      })
    }
    next();
  })
}
