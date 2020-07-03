const Habit = require('../models/Habit')


module.exports = {
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
  }
}

