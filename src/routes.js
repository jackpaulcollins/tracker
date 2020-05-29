const express = require('express')
const multer = require('multer')


const UserController = require('./controllers/UserController')
const HabitController = require('./controllers/HabitController')
const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/status', (req, res) => {
  res.send({ status: 200 })
})

//Habit
routes.post('/habit', upload.single("thumbnail"), HabitController.createHabit)

//User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

module.exports = routes