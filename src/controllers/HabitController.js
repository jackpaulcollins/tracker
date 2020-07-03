const Habit = require('../models/Habit')
const User = require('../models/User')

module.exports = {
  async createHabit(req, res) {
    const { title, 
            description, 
            points, 
            frequency, 
            isCompleteForDay,
            habitType } = req.body

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
      habitType
    })

    return res.json(habit)
  },

  async getHabitById(req, res) {

    const { habitId } = req.params

    try {
      const habit = await Habit.findById(habitId)

      if (habit) {
        return res.json(habit)
      }

    } catch (error) {
      return res.status(400).json({ message: `Habit does not exist` })
    }
  },

  async getAllHabits(req, res) {

    //optional filter to check if user filtering by habit type
    const {habitType} = req.params
    const query = { habitType } || {}

    try {

      const habits = await Habit.find(query)

      if (habits) {
        return res.json(habits)
      }

    } catch (error) {
      return res.status(400).json({ message: `You don't have any habits yet!` })
    }
  },

  async delete(req,res) {

    const { habitId } = req.params;

    try {
        await Habit.findByIdAndDelete(habitId)
        return res.status(204).send()

    } catch (error) {
        return res.status(400).json({ message: `You don't have any habits with that id!` })
    }
  }
}