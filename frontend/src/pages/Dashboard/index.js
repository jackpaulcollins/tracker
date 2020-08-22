import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import { api } from '../../services/services'
import Habit from '../../Components/Habit'
import {
  Card, CardText, CardTitle, CardBody,
} from 'reactstrap'
import {getCurrentDate} from '../../services/services'
import DailyPointsCounter from '../../Components/DailyPointsCounter'


export default function Dashboard() {

  const [ habits, setHabits ] = useState('')
  const [ needsReload, setNeedsReload] = useState(false)
  const [ dailyPoints, setDailyPoints ] = useState(0)


  const fetchUserHabits = async () => {
    const user_id = localStorage.getItem('user')
    const data = await api.get('/dashboard', {headers: {user_id }})
    return data
  }

  let today = getCurrentDate()

  const updateReload = () => {
    setNeedsReload(true)
    setNeedsReload(false)
  }

  useEffect(() => {
    fetchUserHabits().then(response => {
      const habits = response.data
      setHabits(habits)
    })
  }, [needsReload]);



  return(
    <Container>
      <div className="links">
        <Link to="/habits">Create a New Habit!</Link>
        <Link to="/dashboard/positive">Positive Habits</Link>
        <Link to="/dashboard/negative">Negative Habits</Link>
      </div>
      <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
        <DailyPointsCounter/>
     </div>
     <div className="habit-field">
       {habits && habits.map((habit) => {
          return (
            
            
              <Link  to={{pathname: `habit/${habit.id}`}}
                     className="habit-clickable"> 
                <Habit  key={habit.id} 
                        habit={habit}
                        id={habit.id}
                        title={habit.title}
                        description={habit.description}
                        points={habit.points}
                        habitType={habit.habitType}
                        reloadHabits={updateReload}
                        />
              </Link> 
          )
        })}
       </div>
        
    </Container>
  )
}



  //state is always passed as last time method ran. However, values
  //not being "subtracted" because method always expects to "add" them.
  //Seperating methods to add or subtract points depending on if habit done for day
// const sumDailyPoints = (habits, currentPoints) => {

//   console.log(currentPoints)
//   //goes through all of the users habits and checks if complete for day
//   const today = getCurrentDate()
//   let i
//   for (i = 0; i < habits.length; i++){
//     let currentHabit = habits[i]
    
//     //new loop to go through the current habits daysComplete array
//     let j
//     //current problem, when updating a habit it isn't maintaining the days complete array
//     if (currentHabit.daysComplete){
//       for (j = 0; j < currentHabit.daysComplete.length; j++) {
//         if (today == currentHabit.daysComplete[j].date && currentHabit.daysComplete[j].isComplete ) {
//           const points = parseInt(currentHabit.points)
//           console.log(currentHabit)
//           //this needs to know if a user is de-selecting a habit
//           if (currentHabit.habitType == 'positive' && currentHabit.daysComplete[j].isComplete){
//             console.log(currentHabit.daysComplete[j].isComplete)
//             // debugger
//             const pointsToAdd = (points * -1)
//             currentPoints += pointsToAdd
//             setDailyPoints(currentPoints)
//           } else if (currentHabit.habitType == 'negative' && currentHabit.daysComplete[j].isComplete) {
//             const pointsToAdd = (points * -1)
//             setDailyPoints(currentPoints += pointsToAdd)
//           } else {
//             setDailyPoints(currentPoints += points)
//           }
          
//         }
//       }
//     }
//   }
// }