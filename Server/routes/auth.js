const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../keys.js");
const requireLogin = require('../middleware/requireLogin.js');
// const bodyParser = require("body-parser");
// router.use(bodyParser.urlencoded({extended: true}));


// Sessions code
router.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}))

// Passport setup code
router.use(passport.initialize());
router.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


//protected token access
// router.get('/protected', requireLogin ,(req, res)=>{
//   res.send("protected page");
// })


router.post('/signup', (req, res)=>{
  const {username,password,email} = req.body;
  if(!email || !password || !username){
    return (res.status(422).json({error:"please enter all the fields!"}));
  }
  User.findOne({email:email}, (err, savedUser)=>{
    if(err){
      console.log(err);
    }else if(savedUser){
      return (res.status(422).json({error:"email already in use"}));
    }else{
      User.register({username: req.body.username, email:req.body.email}, req.body.password, function(err, savedUser){
        if(!err){
          passport.authenticate("local")(req, res, function(){
          res.json({message: "Signed Up: "+ savedUser.username});
          })
        }else{
          console.log(err);
          res.send("nah")
        }
      })
    }
  })
})

router.post('/signin', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return  res.json({error:info});
    }
    if (!user && info) {
      return  res.json({error:info});
    }

    console.log("LOGGED IN: "+user.username);
    User.findOne({username:user.username}, function(err,foundUser){
      console.log("id:  ", foundUser._id);
      if(err){
        console.log(err);
        res.json({error:"bruh"});
      }else{
        const token = jwt.sign({_id: foundUser._id}, JWT_SECRET);
        console.log("token:  " , token);
        const {_id, email, username, following, followers} = foundUser;
        res.json({token:token, user:{_id, email, username, following, followers}});
      }
    })
  })(req, res);
});

module.exports = router;
