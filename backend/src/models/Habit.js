const mongoose = require('mongoose')

const HabitSchema = new mongoose.Schema({
  title: String,
  description: String,
  points: Number,
  daysComplete: Array,
  habitType: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  toJSON: {
    virtuals: true
  }
})


module.exports = mongoose.model('Habit', HabitSchema)