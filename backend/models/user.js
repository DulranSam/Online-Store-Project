const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      default: "",
      trim: true,
    },
    password: {
      type: String,
      required: true,
      default: "",
      trim: true,
    },
    confirmpass:{
      type: String,
      required: true,
      default: "",
      trim: true,
    },
    mail: {
      type: String,
      required: true,
      default: "",
      trim: true,
    },
    bio: {
      type: String,
      unique: true,
      default: "",
      trim: true,
    },
    photo: {
      type: String,
      default: "",
      trim: true,
    },
    roles: {
      activity: {
        type: Boolean,
        default: true,
      },
      status: {
        type: String,
        default: "Online",
      },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
