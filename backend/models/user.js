// username
// password
// email
// created_at
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 6,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Remove leading and trailing whitespaces
    lowercase: true, // Convert email to lowercase
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format validation
      'Please provide a valid email address',
    ],
  },
  created_at: {
    type: Date,
    default: Date.now,
  }

});

userSchema.pre(
  "save",
  async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
