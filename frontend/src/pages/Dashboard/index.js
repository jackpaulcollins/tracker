import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import api from '../../services/api'
import Habit from '../../Components/Habit'
import DailyPointsCounter from '../../Components/DailyPointsCounter'

export default function Dashboard() {

  const [ habits, setHabits ] = useState('')

  const fetchUserHabits = async () => {
    const user_id = localStorage.getItem('user')
    const data = await api.get('/dashboard', {headers: {user_id }})
    return data
  }

  useEffect(() => {
    fetchUserHabits().then(response => {
      const habits = response.data
      setHabits(habits)
    })
  }, []);

  console.log(habits)

  


  return(
    <Container>
      <DailyPointsCounter/>
       {habits && habits.map(habit => {
          return (
            
                <Habit key={habit.id} 
                       title={habit.title}
                       description={habit.description}
                       points={habit.points}
                       habitType={habit.habitType}/>
              
          )
        })}
    </Container>
  )
}