const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: {
    trype: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: { trype: String, required: true, minlength: 6, maxlength: 100 },

}, {
    timestamps: true
});
