const Habit = require('../models/Habit')
const User = require('../models/User')

module.exports = {
  async createHabit(req, res) {
    const { title, 
            description, 
            points, 
            frequency, 
            isCompleteForDay } = req.body
    const { filename } = req.file
    const { user_id } = req.headers

    const user = await User.findById(user_id)

    if (!user) {
      return res.status(400).json({ message: `User does not exist` })
    }

    const habit = await Habit.create({
      title,
      description,
      points,
      frequency,
      isCompleteForDay,
      user: user_id,
      thumbnail: filename
    })

    return res.json(habit)
  }
}