const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        default:"",
        trim:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
        default:"",
        trim:true,
    },quantity:{
        type:Number,
        required:true,
        default:"",
        trim:true,
    },extra:{
        type:String,
        default:"", 
        trim:true,
    },
    photo: {
        type: String,
        unique:false,
        default: "",
        trim: true,
      },defAddress:{
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
      orders:{
        type: Number,
        unique:false,
        default: "",
        trim: true,
      }
},{timestamps:true});

const storeModel = mongoose.model("items",storeSchema);
module.exports = storeModel;