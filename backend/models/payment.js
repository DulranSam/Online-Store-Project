const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
    cardno:{
        type:Number,
        required:true,
        default:""
    },
    cardholder:{
        type:String,
        required:true,
        default:""
    },
   cardaddressdef:{
    type:String,
    required:true,
    default:""
   },
   email:{
    type:String,
    required:true,
    default:""
   },
   address1:{
    type:String,
    required:true,
    default:""
   },
   postalcode:{
    type:Number,
    required:true,
    default:""
   },
   phonenumber:{
    type:Number,
    required:true,
    default:""
   },

},{timestamps:true});

const paymentModel = mongoose.model("payments",paymentSchema);
module.exports = paymentModel;