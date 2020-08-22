const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const cron = require('node-cron')
const path = require('path')
const { addDayToAllHabits } = require('./controllers/HabitController')
const { getCurrentDate } = require('./utils/Utils')

const PORT = process.env.PORT || 8000

if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}

app.use(cors())
app.use(express.json())

try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  console.log('Mongo DB connected')
} catch(error) {
  console.log(error)
}

app.use('/files', express.static(path.resolve(__dirname, "..", "files")))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

// cron job that runs every day at midnight to add date to habits array

// cron.schedule('0 0 0 * * *', () => {
//   const date = getCurrentDate()
//   console.log('cron addDayToAllHabits job run for ', date)
//   addDayToAllHabits()
// });
