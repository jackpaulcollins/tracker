import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8000'
})

export const getCurrentDate = () => {

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = String(today.getFullYear());
  
  today = yyyy+mm+dd
  
  return today
  }

 export const checkIsHabitDoneForDay = (daysComplete) => {
    const today = getCurrentDate()
    const isComplete = daysComplete.includes(today)
    return isComplete
  }
  
