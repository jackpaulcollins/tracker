const User = require('../models/User')
const { uuid } = require('uuidv4');
const { checkIfHabitExistsForUser } = require('../utils/Utils')
const { getCurrentDate } = require('../utils/Utils')

module.exports = {
  async createHabit(req, res) {

    const { 
      title, 
      description,
      daysComplete,
      habitType 
    } = req.body

    let { points } = req.body

    //convert negative habitTypes points to negative int

    if (habitType === 'negative') {
      points = (points * -1)
    }

    const { user_id } = req.headers

    try {
      
      const user = await User.findById(user_id)

      if (user) {
        user.habits.push({
          title, 
          description, 
          points, 
          daysComplete,
          habitType,
          id: uuid()
        })
        await user.save()
        return res.json(user)
      } else {
        return res.status(400).json({ message: `Error Creating Habit!` })
      }
    } catch (error) {
        return res.status(400).json({ message: `Error Creating Habit!` })
    }  
  },

  async deleteHabit(req, res) {
    const { user_id } = req.headers
    const { habitId } = req.params
    const user = await User.findById(user_id)
    if (user) {
      try {
        let habits = user.habits
        const checkIfHabitExists = checkIfHabitExistsForUser(habitId, habits)
        if (checkIfHabitExists) {
          const habitsToKeep = habits.filter((habit) => {
            return habit.id !== habitId
            })
          user.habits = habitsToKeep
          await user.save()
          return res.json(user)
        } else {
          return res.status(400).json({ message: `Can't find that Habit!` })
        }
      } catch (error) {
          return res.status(400).json({ message: `Error Deleting Habit!` })
      }
    }
  },

  async updateHabit(req, res) {
    const { user_id } = req.headers
    const { habitId  } = req.params
    const {
      title,
      description,
      points,
      daysComplete,
      habitType,
    } = req.body
    
    const user = await User.findById(user_id)

    if (user) {

      try {
        const habitIndex = user.habits.findIndex(habit => habit.id == habitId)
        user.habits[habitIndex] = {
          title,
          description,
          points,
          daysComplete,
          habitType,
          id: habitId
        }
        user.markModified('habits')
        await user.save()
        return res.status(200).json(user.habits)
      } catch (error) {
          return res.status(400).json({ message: 'Unable to update habit!'})
      }
    } else {
        return res.status(400).json({ message: 'Unable to update habit!'})
    }
  },

  async addDayToAllHabits() {

    const users = await User.find()
    for (i=0; i < users.length; i++) {
      let userId = users[i].id
      let user
      user = await User.findById(userId)
      for (j=0; j < user.habits.length; j++) {

        if (user.habits[j]) {
          user.habits[j].daysComplete.push({
            date: getCurrentDate(),
            isComplete: false
          })
        }

        user.markModified('habits')
        await user.save()
       
      }
    }
  }
}