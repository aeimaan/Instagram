const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require('../middleware/requireLogin.js');
const User = mongoose.model("User");

router.get('/user/:id', requireLogin, (req, res)=>{
  let id = req.params.id;
  User.findOne({_id:id})
  .select('-password')
  .then(foundUser=>{
      Post.find({postedBy: id})
      .populate("postedBy", "_id, username")
      .exec((err, foundPosts)=>{
        if(err){
          console.log(err);
          res.status(422).json({error: err})
        }else{
          res.json({foundUser, foundPosts})
        }
      })

  }).catch(err=>{
    console.log(err);
    res.status(404).json({error: "User not found"});
  })
})






module.exports = router;
