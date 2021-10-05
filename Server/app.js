const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const {MONGOURI} = require("./keys.js");
// const bodyParser = require("body-parser");

app.use(cors());

mongoose.connect(MONGOURI);
mongoose.connection.on("connected", function(err){
  if(err){
    console.log(err);
  }else{
    console.log("connected to the database");
  }
})

require("./models/user.js");
require("./models/post.js");

app.use(express.json());
app.use(require("./routes/auth.js"));
app.use(require("./routes/post.js"));
app.use(require("./routes/user.js"));
// app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res)=>{
  res.send("HELLO MATE");
})

app.listen(5000, function(){
  console.log("Server on port 5000");
})
