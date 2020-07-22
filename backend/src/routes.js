const express = require('express')
const multer = require('multer')


const UserController = require('./controllers/UserController')
const HabitController = require('./controllers/HabitController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/status', (req, res) => {
  res.send({ status: 200 })
})

//Login
routes.post('/login', LoginController.store )

//Dashboard
routes.get('/dashboard/:habitType', DashboardController.getAllHabitsForUser)
routes.get('/dashboard', DashboardController.getAllHabitsForUser)
routes.get('/habit/:habitId', DashboardController.getHabitById)

//Habit
routes.post('/habit', upload.single("thumbnail"), HabitController.createHabit)
routes.delete('/habit/:habitId', HabitController.deleteHabit)
routes.post('/habit/:habitId', HabitController.updateHabit)
// Temp route to test update days on habits
routes.get('/users', HabitController.addDayToAllHabits)

//User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)


module.exports = routes