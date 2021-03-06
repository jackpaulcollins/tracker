const User = require('../models/User')
const bcrypt = require('bcrypt')
const { uuid } = require('uuidv4');

module.exports = {
  async createUser(req, res) {
    try {
        const { firstName, lastName, password, email } = req.body

        const existentUser = await User.findOne({ email })

        if(!existentUser) {
          const hashedPassword = await bcrypt.hash(password, 10)

          const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
          })
          return res.json({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          })
        }

        return res.status(400).json({
          message: `User already exists! Do you want to login instead?`
        })
        
    } catch (error) {
        throw Error(`Error while registering new user: ${error}`)
    }
  },

  async getUserById(req,res){
    const { userId } = req.params

    try {
      const user = await User.findById(userId)
      return res.json(user)
    } catch (error) {
      
        return res.status(400).json({
          message: `User ID does not exist. Do you want to sign up?`
        })
    }
  },

  async updateDailyPointsGoal(req, res) {
    
    const { user_id, goal } = req.params

    try {
      const user = await User.findById(user_id)

      user.dailyPointsGoal = goal

      user.save()

      return res.status(200).json({
        message: `Goal updated!`
      })

    } catch(e) {

      return res.status(400).json({
        message: `Cannot update goal!`
      })
    }
  },
  async getDailyPointsGoal(req, res) {
    
    const { user_id, goal } = req.params

    try {
      const user = await User.findById(user_id)

      const goal = user.dailyPointsGoal

      return res.status(200).json({
        goal: goal
      })

    } catch(e) {

      return res.status(400).json({
        message: `Cannot get daily goal!`
      })
    }
  }
}