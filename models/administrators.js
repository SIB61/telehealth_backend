import mongoose from "mongoose";
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

export const administrator = mongoose.model('administrators', administrators);

