const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
  async store(req,res) {
    try {
        const {email, password} = req.body

        if(!email || !password) {
          res.status(200).json({ message: 'Required field missing!' })
        }

        const user = await User.findOne({email})

        if(!user) {
          res.status(200).json({ message: 'User not found! Do you want to register?' })
        }

        if(user && await bcrypt.compare(password, user.password)) {
          const userResponse = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
          return res.json(userResponse)
        } else {
          res.status(200).json({ message: 'Email or Password does not match!' })
        }

    } catch (error){
        return res.status(400).json({ message: `Error while Authenticating a User ${error}` })
    }
  }
}