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
  const {username,email,password} = req.body;
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
          res.send("SAVED: " + savedUser.username);
          })
        }else{
          console.log(err);
          res.send("nah")
        }
      })

      // const user = new User({
      //   email,
      //   name,
      //   password
      // })
      // user.save((err, savedUser)=>{
      //   if(err){
      //     console.log(err);
      //   }else{
      //     res.send("SAVED: "+ savedUser.name);
      //   }
      // })
    }
  })
})

router.post('/signin', (req, res)=>{
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  req.login(user, function(err){
    if(err){
      console.log(err);
      res.send("not logged in");
    }else{
      passport.authenticate("local")(req, res, function(){
        console.log("LOGGED IN: "+user.username);
        User.findOne({username:user.username}, function(err,foundUser){
          if(err){
            console.log(err);
          }else{
            const token = jwt.sign({_id: foundUser._id}, JWT_SECRET);
            res.json({token});
          }
        })
      })
    }
  })
})

module.exports = router;
