const mongoose = require("mongoose");

// User schema, users are defined by their email and nickname, emain is used as a main unique identifier by the app

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    maxlength: 10,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    maxlength: 255,
  },
  surname: {
    type: String,
  },
  subtitle: {
    type: String,
    required: false,
  }
});

// Vytvoření modelu
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
