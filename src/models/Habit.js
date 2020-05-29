const mongoose = require('mongoose')

const HabitSchema = new mongoose.Schema({
  title: String,
  description: String,
  points: Number,
  frequency: Object,
  isCompleteForDay: Boolean,
  thumbnail: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model('Habit', HabitSchema)