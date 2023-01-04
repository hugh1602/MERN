const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usermodel = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", required: true, unique: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:
        "https://thumbs.dreamstime.com/m/cute-monster-avatar-smiling-face-yellow-color-52010608.jpg",
    },
  },
  {
    timestamps: true,
  }
);

usermodel.methods.matchpassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

usermodel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("user", usermodel);
module.exports = User;
