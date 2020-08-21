import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import { api } from '../services/services'
import Habit from '../Components/Habit'


export default function FilteredHabits(props) {

  const [ habits, setHabits ] = useState('')

  const fetchUserHabits = async () => {
    const user_id = localStorage.getItem('user')
    const data = await api.get(`/dashboard/${props.filter}`, {headers: {user_id }})
    return data
  }

  useEffect(() => {
    fetchUserHabits()
    .then(response => {
      const habits = response.data
      setHabits(habits)
    })
  }, []);

  const link = props.filter === 'positive' ? 'negative' : 'positive'


  return(
   <Container>
     <Link to='/dashboard'>Back to dashboard</Link>
     <Link to={`/dashboard/${link}`}>See {link} habits</Link>
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