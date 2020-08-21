import React, {useState, useEffect } from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { api } from '../../services/services'

export default function HabitView(props) {

  const habitId = props.match.params.habitId

  const [ habit, setHabit ] = useState('')

  const fetchUserHabit = async () => {
    const user_id = localStorage.getItem('user')
    const data = await api.get(`/habit/${habitId}`, {headers: {user_id }})
    return data
  }

  useEffect(() => {
    fetchUserHabit()
    .then(response => {
      const habit = response.data
      setHabit(habit)
    })
  }, []);


  const cardColor = habit.habitType === 'positive' ? 'success' : 'danger'

  const deleteHabit = async (id) => {
    const user_id = localStorage.getItem('user')
    const data = await api.delete(`/habit/${id}`, {headers: {user_id }})
    setHabit('')
    return data
  }

  const habitToDisplay = habit ? <Card color={cardColor}>
                                    <CardBody>
                                      <CardTitle><h5>{habit.title}</h5></CardTitle>
                                      <CardText>{habit.description}</CardText>
                                      <CardText>points: {habit.points}</CardText>
                                      <Button onClick={() => deleteHabit(habit.id)}>Delete</Button>
                                      <Link to={`/update/${habit.id}`}>
                                        <Button>Update</Button>
                                      </Link>
                                    </CardBody>
                                  </Card> 
                                  
                                  : 'Habit Succesfully Deleted'

  return(
    <div style={{display: "flex", justifyContent: "space-around", margin: "2rem"}}>
      <Link to={'/dashboard'}>Back to Dashboard</Link>
      {habitToDisplay}
    </div>
  )
}
