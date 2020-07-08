import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import api from '../../services/api'
import Habit from '../../Components/Habit'
import DailyPointsCounter from '../../Components/DailyPointsCounter'

export default function Dashboard() {

  const [ habits, setHabits ] = useState('')
  const [ needsReload, setNeedsReload] = useState(false)


  const fetchUserHabits = async () => {
    const user_id = localStorage.getItem('user')
    const data = await api.get('/dashboard', {headers: {user_id }})
    return data
  }

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
      <Link to="/habits">Create a New Habit!</Link>
      <Link to="/dashboard/positive">See Positive Habits</Link>
      <Link to="/dashboard/negative">See Negative Habits</Link>
      <DailyPointsCounter/>
       {habits && habits.map(habit => {
          return (
            
                <Habit key={habit.id} 
                       id={habit.id}
                       title={habit.title}
                       description={habit.description}
                       points={habit.points}
                       habitType={habit.habitType}
                       reloadHabits={updateReload}/>
              
          )
        })}
        
    </Container>
  )
}