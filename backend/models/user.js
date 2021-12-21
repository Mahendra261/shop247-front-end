const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: number = 0,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interest: { type: String },
  role: { type: String },
  address: {
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
