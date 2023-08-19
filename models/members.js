const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const administrators = new Schema({
   email:{
    require:true,
     type:String,
   },
   password:{
    require:true,
     type:String,
   },
   companyName:String,
 firstName:String,
 lastName:String,
 dob:Date,
 profilePicture:String,
 country:String,
 profileBio:String,
 specializations:Array,
 degree:String,
 license:String,
 active:Boolean,
 payoutAccount:String,
 calendlyId:String,
 languages:Array,
 sponsoredHours:Number,
 paymentInfo:String,
 matChups:Array
});

const administrator = mongoose.model('administrators', administrators);

module.exports = administrator;