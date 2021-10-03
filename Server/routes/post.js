const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require('../middleware/requireLogin.js');





router.get('/allposts', requireLogin, (req, res)=>{
  // console.log("stufffff////////////");
  // console.log(req.user);
  Post.find()
  .populate("postedBy", "_id username" )
  .populate("comments.postedBy", "_id username")
  .then(posts=>{
    // console.log(posts);
    res.json({posts});
  })
})

router.get('/myposts', requireLogin, (req, res)=>{
  Post.find({postedBy:req.user._id})
  .populate("postedBy _id").then(posts=>{
    res.json({posts});
  })
})

router.post('/createpost', requireLogin, (req, res)=>{
  console.log("heres the stuff:::");
  const {title, body, pic} = req.body;
  // console.log("heres the user" + req.user);
  if(!title || !body){
    res.status(422).json({error:"Please fill all fields"});
  }
  console.log(req.user);
  const post = new Post({
    title: title,
    body: body,
    photo: pic,
    postedBy: req.user
  })
  console.log(post);
  post.save(function(err, savedPost){
    if(err){
      console.log(err);
    }else{
      res.json({post: savedPost});
    }
  })
})

router.delete('/deletepost/:postId', requireLogin, (req, res)=>{
  // console.log(req.params.postId);
  Post.findOne({_id:req.params.postId})
  .populate("postedBy", "_id")
  .exec((err, foundPost)=>{
    if(err || !foundPost){
      return res.status(422).json({error:err})
    }else{
      if(foundPost.postedBy._id.toString() === req.user._id.toString()){
        foundPost.remove().then(result=>{
          console.log("results",result);
          res.json(result)
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  })
})

router.delete('/deletecomment/:itemId/:commentId', requireLogin, async function(req, res){
  // let id = null;
  Post.findByIdAndUpdate( req.params.itemId , { "$pull": { "comments": { "_id": req.params.commentId } }},
  { new:true }).populate("postedBy", "_id username" ).populate("comments.postedBy", "_id username" )
  .exec((err, result)=>{
    if(err){
      return res.status(422).json({error:err});
    }else{
      console.log(result);
      res.json(result)
    }
  })

})

router.put('/like', requireLogin, (req, res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user._id}
  },{
    new:true
  }).populate("postedBy", "_id username" ).populate("comments.postedBy", "_id username" )
  .exec((err, result)=>{
    if(err){
      return res.status(422).json({error:err});
    }else{
      console.log(result);
      res.json(result)
    }
  })
})

router.put('/unlike', requireLogin, (req, res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.user._id}
  },{
    new:true
  }).populate("postedBy", "_id username" ).populate("comments.postedBy", "_id username" )
  .exec((err, result)=>{
    if(err){
      return res.status(422).json({error:err});
    }else{
      // console.log(result);
      res.json(result)
    }
  })
})

router.put('/comment', requireLogin, (req, res)=>{
  const comment = {
    text:req.body.text,
    postedBy: req.user._id
  }
  Post.findByIdAndUpdate(req.body.postId,{
    $push:{comments:{$each: [comment], $position:0}}
  },{
    new:true
  }).populate("comments.postedBy", "_id username" )
  .populate("postedBy", "_id username")
  .exec((err, result)=>{
    if(err){
      return res.status(422).json({error:err});
    }else{
      console.log(result);
      res.json(result)
    }
  })
})


module.exports = router;
