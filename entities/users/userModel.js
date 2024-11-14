const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String, 
      required: [true, 'Name is missing'],
      unique: [true, 'Name is already taken'],
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is missing'],
      trim: true
    },
    colls: {
      type: Array,
      id: {type: String}
    }
  }
);

module.exports = mongoose.model('User', UserSchema);