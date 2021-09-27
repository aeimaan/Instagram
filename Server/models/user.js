const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email:String,
  password:String
})

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);


module.exports = mongoose.model('User', userSchema);
