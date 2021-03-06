const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const {ObjectId} = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email:String,
  password:String,
  pic: {
    type:String,
    default:"https://res.cloudinary.com/cloudeimaan/image/upload/v1637787274/nopfp_nxuu4f.jpg"
  },
  followers:[{type:ObjectId, ref:"User"}],
  following:[{type:ObjectId, ref:"User"}]
})

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);


module.exports = mongoose.model('User', userSchema);
