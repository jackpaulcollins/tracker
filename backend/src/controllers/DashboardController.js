const Habit = require('../models/Habit')
const User = require('../models/User')
const { filterUserHabitArray } = require('../utils/Utils')


module.exports = {
  async getHabitById(req, res) {
    
    const { habitId } = req.params
    const { user_id } = req.headers

    try {
      if (user_id) {
        const habit = await Habit.findById(habitId)
        return res.json(habit)
      } else {
        return res.status(404).json({ message: `Cannot find that habit!` })
      }
    } catch (error) {
      return res.status(404).json({ message: `Cannot find that habit!` })
    }
  },
  
  async getAllHabitsForUser(req, res) {
  
    const { habitType } = req.params
    const { user_id } = req.headers
    const query = habitType || null
 
    try {
      if (user_id) {
        const habits = await Habit.find({user: user_id})
        
        //checks for query param to filter negative vs positive habits. If present it filters based on query.
        if (query) {
          const habits = await Habit.find({user: user_id, habitType: query})
          return res.json(habits)
        }
        return res.json(habits)
      }     
    } catch (error) {
        return res.status(404).json({ message: `Unable to get your habits!` })
    }
  }
}

