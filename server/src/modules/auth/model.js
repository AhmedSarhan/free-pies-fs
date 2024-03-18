const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Wishlist = require("../wishlists/model");
const Cart = require("../cart/model");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter a username first"],
    minLength: [3, "Name can not be shorter than 3 characters"],
    maxLength: [50, "Name can not be longer than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter an email first"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please Enter a password first"],
  },
  type: {
    type: String,
    enum: [process.env.ADMIN_USER, process.env.CLIENT_USER],
    default: process.env.CLIENT_USER,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});


UserSchema.post("save", async function (doc) {
  console.log("User has been saved", doc);
  const newWishlist = new Wishlist({
    user: doc._id,
    products: []
  });
  const cart = new Cart({
    user: doc._id,
    products: [],
    total: 0
  });
  await cart.save();
  await newWishlist.save();
});
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.method.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      type: this.type,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

const User = mongoose.model("User", UserSchema);


module.exports = User;