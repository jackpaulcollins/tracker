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
  
  async getAllHabitsForUser(req, res) {
  
    //optional filter to check if user filtering by habit type
    const {habitType} = req.params
    const { user_id } = req.headers
    const query = habitType
    // ToDo move the optional query to return habits based on type

  
    try {
      //finds habits based on the logged in user
      //checks if user is querying based on habitType and returns matching habits
      //if they are
      if (query) {
        const habits = await Habit.find({user: user_id, habitType: query})
        if (habits) {
          return res.json(habits)
        }
      } else {
        const habits = await Habit.find({user: user_id})
        if (habits) {
          return res.json(habits)
        }
      }
  
    } catch (error) {
      return res.status(400).json({ message: `You don't have any habits yet!` })
    }
  }
}

