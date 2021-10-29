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

router.put('/follow', requireLogin, (req, res)=>{
  User.findByIdAndUpdate(req.body.followId, {
    $push: {followers: req.user._id}
  }, {new:true}, function(err, result){
    if(err){
      console.log(err);
      return res.status(422).json({error:err})
    }else{
      User.findByIdAndUpdate(req.user._id, {
        $push:{following: req.body.followId}
      }, {new:true}).select("-password").then(result =>{
        res.json(result)
      }).catch(err =>{
        console.log(err);
        return res.status(422).json({error:err})
      })
    }
  })
})

router.put('/unfollow', requireLogin, (req, res)=>{
  User.findByIdAndUpdate(req.body.unfollowId, {
    $pull: {followers: req.user._id}
  }, {new:true}, function(err, result){
    if(err){
      console.log(err);
      return res.status(422).json({error:err})
    }else{
      User.findByIdAndUpdate(req.user._id, {
        $pull:{following: req.body.unfollowId}
      }, {new:true}).select("-password").then(result =>{
        res.json(result)
      }).catch(err =>{
        console.log(err);
        return res.status(422).json({error:err})
      })
    }
  })
})




module.exports = router;
