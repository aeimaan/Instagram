const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require('../middleware/requireLogin.js');





router.get('/allposts', (req, res)=>{
  Post.find()
  .populate("postedBy", "_id username" )
  .then(posts=>{
    res.send(posts);
  })
})

router.get('/myposts', requireLogin, (req, res)=>{
  Post.find({postedBy:req.user._id})
  .populate("postedBy _id").then(posts=>{
    res.send(posts);
  })
})

router.post('/createpost', requireLogin, (req, res)=>{
  console.log("heres the stuff:::");
  const {title, body, pic} = req.body;
  console.log(title, body, pic);
  if(!title || !body){
    res.status(422).json({error:"Please fill all fields"});
  }
  // console.log(req.user);
  const post = new Post({
    title: title,
    body: body,
    photo: pic,
    postedBy: req.user
  })
  post.save(function(err, savedPost){
    if(err){
      console.log(err);
    }else{
      res.json({post: savedPost});
    }
  })
})


module.exports = router;
