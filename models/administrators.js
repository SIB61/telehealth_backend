const { Double } = require('mongodb');
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
   phone:String,
   subscription:Number,
   members:Array,
   paymentInfo:String
});

const administrator = mongoose.model('administrators', administrators);

module.exports = administrator;