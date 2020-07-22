const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  habits: Array
})

module.exports = mongoose.model('User', UserSchema)