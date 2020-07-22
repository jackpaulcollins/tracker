import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import api from '../../services/api'
import Habit from '../../Components/Habit'
import {
  Card, CardText, CardTitle, CardBody,
} from 'reactstrap'
import getCurrentDate from '../../services/getCurrentDate'

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
      sumDailyPoints(habits, dailyPoints)
    })
  }, [needsReload]);

  const sumDailyPoints = (habits, currentPoints) => {
    //goes through all of the users habits and checks if complete for day
    const today = getCurrentDate()
    let i
    for (i = 0; i < habits.length; i++){
      let currentHabit = habits[i]
      //new loop to go through the current habits daysComplete array
      let j
      for (j = 0; j < currentHabit.daysComplete.length; j++) {
        if (today == currentHabit.daysComplete[j].date && currentHabit.daysComplete[j].isComplete ) {
          const points = parseInt(currentHabit.points)
          setDailyPoints(currentPoints += points)
        }
      }
    }
  }


  return(
    <Container>
      <Link to="/habits">Create a New Habit!</Link>
      <Link to="/dashboard/positive">See Positive Habits</Link>
      <Link to="/dashboard/negative">See Negative Habits</Link>
      
      <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
        <Card>
          <CardBody>
            <CardTitle>Daily Points for {today}</CardTitle>
            <CardText><strong>{dailyPoints}</strong></CardText>
          </CardBody>
        </Card>
     </div>

       {habits && habits.map((habit) => {
          return (
            
              <Link to={{pathname: `habit/${habit.id}`}}> 
              <Habit   key={habit.id} 
                       id={habit.id}
                       title={habit.title}
                       description={habit.description}
                       points={habit.points}
                       habitType={habit.habitType}
                       reloadHabits={updateReload}/>
              </Link> 
              
          )
        })}
        
    </Container>
  )
}