const User = require('../models/User')
const Habit = require('../models/Habit')
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

    const { user_id } = req.headers

    if (habitType === 'negative') {
      points = (points * -1)
    }

      const habit = await Habit.create({
        title, 
        description,
        daysComplete,
        habitType,
        points,
        user: user_id
      })
      return res.json({
        habit
      })
  },

  async deleteHabit(req, res) {
    const { user_id } = req.headers
    const { habitId } = req.params
    const habit = await Habit.findById(habitId)
    if (user_id) {
      try {
          if (habit) {
            habit.deleteOne()
            return res.json({ message: 'Succesfully Deleted Habit'})
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
      habitType,
    } = req.body

    if (user_id) {

      try {
       await Habit.findOneAndUpdate({_id: habitId}, 
        {
          title,
          description,
          points,
          habitType
        }, function(err, doc) {
          if (err) return res.send(500, {error: err});
          return res.send(doc);
         })
      } catch (error) {
          return res.status(400).json({ message: 'Unable to update habit!'})
      }
    } else {
        return res.status(400).json({ message: 'Unable to update habit!'})
    }
  },
  async markCompleteForDay(req, res){

    const { habitId } = req.params
    const habit = await Habit.findById(habitId)

    try {
      const today = getCurrentDate()
      if (habit.daysComplete.includes(today)) {
        habit.daysComplete = habit.daysComplete.filter(e => e !== today); 
        habit.save()
      } else {
        habit.daysComplete.push(today)
        habit.save()
      }
      
      return res.status(200).json({ message: 'Habit Markes as Complete!'})
     } catch (error) {
        return res.status(400).json({ message: 'Unable to mark habit as complete!'})
     }
   },

   async getDailyPoints(req, res) {
    const { user_id } = req.headers
    const habits = await Habit.find({user: user_id})
    const today = getCurrentDate()
    let dailyPoints = 0
  
    for (i = 0; i < habits.length; i++) {
      if ( habits[i].daysComplete.includes(today)) {
        dailyPoints += habits[i].points
      }
    }

     return res.json({ points: dailyPoints })
   }
}