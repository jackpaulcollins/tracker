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
routes.put('/habits/mark_complete/:habitId', HabitController.markCompleteForDay)
routes.get('/habits/dailyPoints', HabitController.getDailyPoints)

//User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)
routes.put('/user/update_goal/:user_id/:goal', UserController.updateDailyPointsGoal)
routes.get('/user/:user_id/goal', UserController.getDailyPointsGoal)


module.exports = routes