const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Error text"],
  },
  email: {
    type: String,
    required:  [true, "Error email"]
  },
  password: {
    type: String,
    required: [true, "Error password"]
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("user", UserSchema);