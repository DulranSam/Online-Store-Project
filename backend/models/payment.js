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
   email:{
    type:String,
    required:true,
    default:""
   },
   tempAddress:{
    shippingAd:{
        ad:{
            type: String,
            unique:false,
            default: "",
            trim: true,
        },
        city:{
            type: String,
            unique:false,
            default: "",
            trim: true,
        },
        state:{
            type: String,
            unique:false,
            default: "",
            trim: true,
        },
        zip:{
            type:Number,
            unique:false,
            default: "",
            trim: true,
        }
    },
    billingAd:{
        ad:{
            type: String,
            unique:false,
            default: "",
            trim: true,
        },
        city:{
            type: String,
            unique:false,
            default: "",
            trim: true,
        },
        state:{
            type: String,
            unique:false,
            default: "",
            trim: true,
        },
        zip:{
            type:Number,
            unique:false,
            default: "",
            trim: true,
        }
    }
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